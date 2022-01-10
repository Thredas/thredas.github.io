import React from "react";
import MainPage from "./pages/MainPage/MainPage";
import EntityPage from "./pages/EntityPage/EntityPage";

const routes = {
  MAIN_PAGE: {
    path: '/',
    element: <MainPage />,
    pageName: 'Главная',
    isInHeader: true
  },
  ENTITY_PAGE: {
    path: '/entity/:entityId',
    element: <EntityPage />,
    pageName: 'Карточка работы',
    getLinkTo: (id) => `/entity/${id}`,
  },
};

export default routes;