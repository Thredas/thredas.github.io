import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from '../../routes'
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

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

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;