import './AppHeader.css'
import React from 'react';

import Logo from '../../components/Logo/Logo'

const AppHeader = () => {
  return (
      <div className="app-header d-flex">
        <div className="d-flex align-items-center">
            <Logo />
            <span className="ms-3 fs-5">Thredas' projects</span>
        </div>
      </div>
  );
};

export default AppHeader;