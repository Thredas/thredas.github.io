import React from 'react';
import './Logo.css';

import LogoImage from '../../images/logo.png'

const Logo = () => {
  return (
    <div className="logo">
      <img src={ LogoImage } alt="logo" />
    </div>
  );
};

export default Logo;