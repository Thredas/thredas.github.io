import React from 'react';

import { ReactComponent as SnakeImage } from '../images/snake.svg';
import Snake from "./snake/snake";

const projects = {
  SNAKE: {
    id: 1,
    name: 'Snake Game',
    image: SnakeImage,
    description: 'Simple game, where you need to collect as much food as possible.',
    tags: ['React', 'FC', 'Without Canvas'],
    content: <Snake />
  },
};

export default projects;