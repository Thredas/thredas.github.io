import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from '../../routes'

const Router = () => {
  return (
    <Routes>
      {Object.values(routes).map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
            exact
          />);
      })}
    </Routes>
  );
};

export default Router;