import React from 'react';

import { ReactComponent as SnakeImage } from '../images/snake.svg';
import Snake from "./snake/snake";
import SnakeCode from "./snake/components/SnakeCode";

const projects = {
  SNAKE: {
    id: 1,
    name: 'Snake Game',
    image: SnakeImage,
    description: 'Simple game, where you need to collect as much food as possible.',
    tags: ['React', 'FC', 'Without Canvas'],
    content: <Snake />,
    code: <SnakeCode />,
    githubLink: 'https://github.com/Thredas/thredas.github.io/blob/master/src/projects/snake/snake.js'
  },
};

export default projects;