import React from 'react';
import './Text.css';

const HeaderText = ({ children, style, className }) => {
  return (
    <span className={className + ' header-text'} style={style}>
      {children}
    </span>
  );
};

const RegularText = ({ children, style, className }) => {
  return (
    <span className={className + ' regular-text'} style={style}>
      {children}
    </span>
  );
};

const SecondaryText = ({ children, style, className }) => {
  return (
    <span className={className + ' secondary-text'} style={style}>
      {children}
    </span>
  );
};


export { HeaderText, RegularText, SecondaryText };