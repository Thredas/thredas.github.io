import React from 'react';
import './BackButton.css'

import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { ArrowLeftShort } from 'react-bootstrap-icons';

const BackButton = ({ text }) => {
  const navigate = useNavigate();

  return (
    <Button
      className="back-button"
      size="sm"
      onClick={() => navigate(-1)}
    >
      <ArrowLeftShort />
      <span className="ms-1">{text}</span>
    </Button>
  );
};

export default BackButton;