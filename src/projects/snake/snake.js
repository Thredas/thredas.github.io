import React, { useEffect, useMemo, useRef, useState } from 'react';
import './snake.css'

import {
  CaretDownFill,
  CaretLeftFill,
  CaretRightFill,
  CaretUpFill,
  PauseFill,
  Phone, PhoneFill, PlayFill
} from 'react-bootstrap-icons';
import { RegularText, SecondaryText } from "../../components/Text/Text";

const Snake = () => {
  const gameCycle = useRef(null);

  const FPS = 30;
  const SECOND = 1000;
  const FRAME_TIME = SECOND / FPS;

  const [direction, setDirection] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({x: 16, y: 16});
  const [applePosition, setApplePosition] = useState({x: 236, y: 128});
  const [tail, setTail] = useState([]);
  const [speed, setSpeed] = useState(100);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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

    const highestScore = parseInt(localStorage.getItem('highestScore'));
    setHighestScore(highestScore ? highestScore : null);

    return () => {
      window.removeEventListener('keydown', keyListener);
      clearTimeout(gameCycle.current);
    };
  }, []);

  const doCollisionWithApple = () => {
    const appleX = Math.random() * (fieldRef.current.clientWidth - 30 - 30) + 30;
    const appleY = Math.random() * (fieldRef.current.clientHeight - 30 - 30) + 30;

    setApplePosition({x: appleX, y: appleY});
    setScore((score) => score + 1);
    setSpeed((speed) => speed + 1);
  };

  const resetGame = () => {
    if (score > highestScore) {
      localStorage.setItem('highestScore', score.toString());
      setHighestScore(score);
    }

    setDirection(null);
    setScore(0);
    setSpeed(100);
    setTail([]);
  };

  // game cycle and frames update logic
  clearTimeout(gameCycle.current);
  gameCycle.current = direction && setTimeout(() => {
    let x = playerPosition.x;
    let y = playerPosition.y;

    // movement
    x = direction === 1 ? x + (speed / FPS) : direction === 180 ? x - (speed / FPS) : x;
    y = direction === 270 ? y - (speed / FPS) : direction === 90 ? y + (speed / FPS) : y;

    // boundaries collision
    if (y >= fieldRef.current.clientHeight - 15) y = 0;
    else if (y <= 0) y = fieldRef.current.clientHeight - 25;
    else if (x <= 0) x = fieldRef.current.clientWidth - 25;
    else if (x >= fieldRef.current.clientWidth - 15) x = 0;

    // apple collision and tail movement
    if (x - 10 < applePosition.x && applePosition.x < x + 30 &&
      y - 20 < applePosition.y && applePosition.y < y + 20) {
      doCollisionWithApple();
      setTail([{x, y}, ...tail]);
    } else if (tail.length > 0) {
      tail.pop();
      setTail([{x, y}, ...tail]);
    }

    // tail collision
    if (tail.length > 0) {
      const tailCollision = tail.find((tailPart, idx) => {
        return idx > 8 && x - 5 < tailPart.x && tailPart.x < x + 20 && y - 10 < tailPart.y && tailPart.y < y + 10
      });

      if (tailCollision) resetGame();
    }

    setPlayerPosition({x, y})
  }, FRAME_TIME);

  return (
    <div className={isMobile ? 'snake-field-mobile' : 'snake-field'} ref={fieldRef}>
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
        {!!highestScore && <span className="highest">HIGHEST: {highestScore}</span>}
      </div>

      {!direction && <div className="tutorial">
        {!isMobile && <div className="text-center">
          <SecondaryText>Controls</SecondaryText>
          <RegularText className="mb-4">Arrow keys</RegularText>

          <SecondaryText>Pause</SecondaryText>
          <RegularText>Any other key</RegularText>
        </div>}

        <SecondaryText className="text-center">
          Press any arrow key to start the game
        </SecondaryText>
        
        {isMobile && <div />}
      </div>}

      {!direction && <button className='mobile-switch' onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <PhoneFill className="fs-5" /> : <Phone className="fs-5" />}
        {!isMobile ? <span className="ms-2">Mobile mode</span> : null}
      </button>}

      {isMobile && <div className="mobile-buttons">
        <button
          className='mobile-button button-top'
          onClick={() => setDirection((direction) => direction !== 90 ? 270 : direction)}
        ><CaretUpFill className='fs-1' /></button>

        <div className="d-flex w-100 flex-1 flex-fill">
          <button
            className='mobile-button button-left'
            onClick={() => setDirection((direction) => direction !== 1 ? 180 : direction)}
          ><CaretLeftFill className='fs-1' /></button>

          <button
            className='mobile-button '
            onClick={() => setDirection(direction ? null : 1)}
          >{direction ? <PauseFill className='fs-1' /> : <PlayFill className='fs-1'/>}</button>

          <button
            className='mobile-button button-right'
            onClick={() => setDirection((direction) => direction !== 180 ? 1 : direction)}
          ><CaretRightFill className='fs-1' /></button>
        </div>

        <button
          className='mobile-button button-bottom'
          onClick={() => setDirection((direction) => direction !== 270 ? 90 : direction)}
        ><CaretDownFill className='fs-1' /></button>
      </div>}
    </div>
  );
};

export default Snake;