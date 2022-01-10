import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './snake.css'

const Snake = () => {
  const moveSnake = useRef(null);
  const FRAMES = 24;
  const SECOND = 1000;
  const FRAME_TIME = SECOND / FRAMES;

  const [playerPosition, setPlayerPosition] = useState({x: 16, y: 16});
  const [direction, setDirection] = useState(0);
  const [speed, setSpeed] = useState(100);

  const [tail, setTail] = useState([]);

  const [applePosition, setApplePosition] = useState({x: 236, y: 128});

  const [score, setScore] = useState(0);

  const fieldRef = useRef(null);

  const keyListener = (event) => {
    if (!event.repeat) {
      switch (event.key) {
        case 'ArrowRight':
          setDirection((direction) => direction !== 180 ? 1 : direction);
          break;
        case 'ArrowLeft':
          setDirection((direction) => direction !== 1 ? 180 : direction);
          break;
        case 'ArrowUp':
          setDirection((direction) => direction !== 90 ? 270 : direction);
          break;
        case 'ArrowDown':
          setDirection((direction) => direction !== 270 ? 90 : direction);
          break;
        default:
          setDirection(null);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyListener);
    return () => window.removeEventListener('keydown', keyListener);
  }, []);

  const doCollisionWithApple = () => {
    const appleX = Math.random() * (fieldRef.current.clientWidth - 30 - 30) + 30;
    const appleY = Math.random() * (fieldRef.current.clientHeight - 30 - 30) + 30;

    setApplePosition({x: appleX, y: appleY});
    setScore((score) => score + 1);
    setSpeed((speed) => speed + 5);

    setTail([playerPosition, ...tail])
  };

  const resetGame = () => {
    setDirection(0);
    setScore(0);
    setSpeed(100);
    setTail([]);
  };

  useLayoutEffect(() => {
    let x = playerPosition.x;
    let y = playerPosition.y;

    clearInterval(moveSnake.current);
    moveSnake.current = direction && setInterval(() => {

      // boundaries collision
      if (y >= fieldRef.current.clientHeight - 30) y = 5;
      else if (y <= 5) y = fieldRef.current.clientHeight - 30;
      else if (x <= 5) x = fieldRef.current.clientWidth - 30;
      else if (x >= fieldRef.current.clientWidth - 30) x = 5;

      // apple collision and tail movement
      if (x - 10 < applePosition.x && applePosition.x < x + 30 &&
        y - 10 < applePosition.y && applePosition.y < y + 24) {
        doCollisionWithApple();
      } else if (tail.length > 0) {
        tail.pop();
        setTail([playerPosition, ...tail]);
      }

      if (tail.length > 0) {
        const tailCollision = tail.find((tailPart) => {
          console.log(x - 10 < tailPart.x && tailPart.x < x + 30);
          return x - 10 < tailPart.x && tailPart.x < x + 30 && y - 10 < tailPart.y && tail.y < y + 24
        });

        if (tailCollision) resetGame();
      }

      x = direction === 1 ? x + (speed / FRAMES) :
        direction === 180 ? x - (speed / FRAMES) : x;

      y = direction === 270 ? y - (speed / FRAMES) :
        direction === 90 ? y + (speed / FRAMES) : y;

      setPlayerPosition({x, y})
    }, FRAME_TIME);

    return () => clearInterval(moveSnake.current);
  }, [playerPosition, direction]);

  return (
    <div className="snake-field" ref={fieldRef}>
      <div
        className="player"
        style={{
          transform:
            `translate(${playerPosition.x}px, 
            ${playerPosition.y}px) 
            rotate(${direction}deg)`
        }}
      >
        <div className="head" />
      </div>

      {useMemo(() => tail.map((tailPart, idx) =>
        <div
          key={idx}
          className="tail-part"
          style={{ transform: `translate(${tailPart.x + 3}px , ${tailPart.y + 3}px)`}}
        />
      ), [tail])}


      <div
        className="apple"
        style={{ left: applePosition.x, top: applePosition.y }}
      />

      <div className="score">
        <span>{score}</span>
      </div>

      {!direction && <div className="tutorial">
        <div className="text-center">
          <b className="fs-5">Controls</b>
          <p className="mb-4">Arrow keys</p>

          <b className="fs-5">Pause</b>
          <p>Any other key</p>
        </div>

        <p className="text-center">
          Press any arrow key to start the game
        </p>
      </div>}
    </div>
  );
};

export default Snake;