import React from 'react';
import './SnakeCode.css';
import { Github } from "react-bootstrap-icons";
import {HeaderText} from "../../../components/Text/Text";

const SnakeCode = () => {
  return (
    <div className="code">
      <div className="d-flex align-items-center justify-content-between mt-4">
        <HeaderText>Imports</HeaderText>

        <a href='https://github.com/Thredas/thredas.github.io/blob/master/src/projects/snake/snake.js'
           className="github-link">
          <Github className="fs-5" />
          <span className='ms-2'>See code on GitHub</span>
        </a>
      </div>

      <code className="mt-3">
        {"import React, { useEffect, useMemo, useRef, useState } from 'react'; \n" +
        "import './snake.css'"}
      </code>


      <HeaderText>Game state and constants</HeaderText>
      <code className="mt-3">
        {"const gameCycle = useRef(null);\n" +
        "\n" +
        "const FPS = 30;\n" +
        "const SECOND = 1000;\n" +
        "const FRAME_TIME = SECOND / FPS;\n" +
        "\n" +
        "const [direction, setDirection] = useState(0);\n" +
        "const [playerPosition, setPlayerPosition] = useState({x: 16, y: 16});\n" +
        "const [applePosition, setApplePosition] = useState({x: 236, y: 128});\n" +
        "const [tail, setTail] = useState([]);\n" +
        "const [speed, setSpeed] = useState(100);\n" +
        "const [score, setScore] = useState(0);\n" +
        "const [highestScore, setHighestScore] = useState(null);\n" +
        "const [isMobile, setIsMobile] = useState(false);\n" +
        "\n" +
        "const fieldRef = useRef(null);"}
      </code>


      <HeaderText>Keys listener and game initialization</HeaderText>
      <code className="mt-3">
        {"const keyListener = (event) => {\n" +
        "  if (!event.repeat) {\n" +
        "    switch (event.key) {\n" +
        "      case 'ArrowRight':\n" +
        "        setDirection((direction) => direction !== 180 ? 1 : direction);\n" +
        "        break;\n" +
        "      case 'ArrowLeft':\n" +
        "        setDirection((direction) => direction !== 1 ? 180 : direction);\n" +
        "        break;\n" +
        "      case 'ArrowUp':\n" +
        "        setDirection((direction) => direction !== 90 ? 270 : direction);\n" +
        "        break;\n" +
        "      case 'ArrowDown':\n" +
        "        setDirection((direction) => direction !== 270 ? 90 : direction);\n" +
        "        break;\n" +
        "      default:\n" +
        "        setDirection(null);\n" +
        "    }\n" +
        "  }\n" +
        "};\n" +
        "\n" +
        "useEffect(() => {\n" +
        "  window.addEventListener('keydown', keyListener);\n" +
        "\n" +
        // "  const highestScore = parseInt(localStorage.getItem('highestScore'));\n" +
        "  setHighestScore(highestScore ? highestScore : null);\n" +
        "\n" +
        "  return () => {\n" +
        "    window.removeEventListener('keydown', keyListener);\n" +
        "    clearTimeout(gameCycle.current);\n" +
        "  };\n" +
        "}, []);"}
      </code>


      <HeaderText>Food collision and game reset logic</HeaderText>
      <code className="mt-3">
        {"const doCollisionWithApple = () => {\n" +
        "  const appleX = Math.random() * (fieldRef.current.clientWidth - 30 - 30) + 30;\n" +
        "  const appleY = Math.random() * (fieldRef.current.clientHeight - 30 - 30) + 30;\n" +
        "\n" +
        "  setApplePosition({x: appleX, y: appleY});\n" +
        "  setScore((score) => score + 1);\n" +
        "  setSpeed((speed) => speed + 1);\n" +
        "};\n" +
        "\n" +
        "const resetGame = () => {\n" +
        "  if (score > highestScore) {\n" +
        "    localStorage.setItem('highestScore', score.toString());\n" +
        "    setHighestScore(score);\n" +
        "  }\n" +
        "\n" +
        "  setDirection(null);\n" +
        "  setScore(0);\n" +
        "  setSpeed(100);\n" +
        "  setTail([]);\n" +
        "};"}
      </code>


      <HeaderText>Game loop</HeaderText>
      <code className="mt-3">
        {"clearTimeout(gameCycle.current);\n" +
        "gameCycle.current = direction && setTimeout(() => {\n" +
        "  let x = playerPosition.x;\n" +
        "  let y = playerPosition.y;\n" +
        "\n" +
        "  // movement\n" +
        "  if (direction === 1) x += (speed / FPS);\n" +
        "  else if (direction === 180) x -= (speed / FPS);\n" +
        "  else if (direction === 90) y += (speed / FPS);\n" +
        "  else if (direction === 270) y -= (speed / FPS);\n" +
        "\n" +
        "  // boundaries collision\n" +
        "  if (y >= fieldRef.current.clientHeight - 15) y = 0;\n" +
        "  else if (y <= 0) y = fieldRef.current.clientHeight - 25;\n" +
        "  else if (x <= 0) x = fieldRef.current.clientWidth - 25;\n" +
        "  else if (x >= fieldRef.current.clientWidth - 15) x = 0;\n" +
        "\n" +
        "  // apple collision and tail movement\n" +
        "  if (x - 10 < applePosition.x && applePosition.x < x + 30 &&\n" +
        "      y - 20 < applePosition.y && applePosition.y < y + 20) {\n" +
        "    doCollisionWithApple();\n" +
        "    setTail([{x, y}, ...tail]);\n\n" +
        "  } else if (tail.length > 0) {\n" +
        "    tail.pop();\n" +
        "    setTail([{x, y}, ...tail]);\n" +
        "  }\n" +
        "\n" +
        "  // tail collision\n" +
        "  if (tail.length > 0) {\n" +
        "    const tailCollision = tail.find((tailPart, idx) => {\n" +
        "      return (\n" +
        "        idx > 8 &&\n" +
        "        x - 5 < tailPart.x && tailPart.x < x + 20 &&\n" +
        "        y - 10 < tailPart.y && tailPart.y < y + 10\n" +
        "      )\n" +
        "    });\n" +
        "\n" +
        "    if (tailCollision) resetGame();\n" +
        "  }\n" +
        "\n" +
        "  setPlayerPosition({x, y})\n" +
        "}, FRAME_TIME);"}
      </code>

      <HeaderText>Render field and player</HeaderText>
      <code className="mt-3">
        {"return (\n" +
        "    <div className={isMobile ? 'snake-field-mobile' : 'snake-field'} ref={fieldRef}>\n" +
        "      <div\n" +
        "        className=\"player\"\n" +
        "        style={{\n" +
        "          transform:\n" +
        "            `translate(${playerPosition.x}px, \n" +
        "            ${playerPosition.y}px) \n" +
        "            rotate(${direction}deg)`\n" +
        "        }}\n" +
        "      >\n" +
        "        <div className=\"head\" />\n" +
        "      </div>\n" +
        "\n" +
        "      {useMemo(() => tail.map((tailPart, idx) =>\n" +
        "        <div\n" +
        "          key={idx}\n" +
        "          className=\"tail-part\"\n" +
        "          style={{ transform: `translate(${tailPart.x + 3}px , ${tailPart.y + 3}px)`}}\n" +
        "        />\n" +
        "      ), [tail])}\n" +
        "\n" +
        "\n" +
        "      <div\n" +
        "        className=\"apple\"\n" +
        "        style={{ left: applePosition.x, top: applePosition.y }}\n" +
        "      />\n" +
        "\n" +
        "      <div className=\"score\">\n" +
        "        <span>{score}</span>\n" +
        "        {!!highestScore && <span className=\"highest\">HIGHEST: {highestScore}</span>}\n" +
        "      </div> \n\n"+
        "     .... \n\n" +
        "    </div>\n" +
        ");"}
      </code>
    </div>
  );
};

export default SnakeCode;