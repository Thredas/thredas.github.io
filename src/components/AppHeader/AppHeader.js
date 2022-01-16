import './AppHeader.css'
import React from 'react';

import Logo from '../../components/Logo/Logo'
import { RegularText } from "../Text/Text";
import { Github } from "react-bootstrap-icons";

const AppHeader = () => {
  return (
      <div className="app-header d-flex">
        <div className="d-flex align-items-center justify-content-between flex-fill">
          <div className="d-flex align-items-center">
            <Logo />
            <RegularText className="ms-3" style={{ fontSize: 18 }}>
              Thredas' projects
            </RegularText>
          </div>

          <a className="header-link" href="https://github.com/thredas"><Github /></a>
        </div>
      </div>
  );
};

export default AppHeader;