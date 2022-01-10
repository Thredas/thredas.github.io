import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Router from "./components/router/router";
import AppHeader from "./components/AppHeader/AppHeader";
import Container from "./components/Container/Container";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Container width={860}>
        <AppHeader />
        <Router />
      </Container>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
