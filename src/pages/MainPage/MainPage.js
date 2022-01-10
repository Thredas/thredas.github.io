import React from 'react';
import './MainPage.css';

import EntityCard from "../../components/EntityCard/EntityCard";
import index from "../../projects";

const MainPage = () => {
  return (
    <div className='main-page'>
      <div className="items-container">
        {Object.values(index).map((entity) => {
          return <EntityCard
            key={entity.id}
            id={entity.id}
            Image={entity.image}
            name={entity.name}
            tags={entity.tags}
            description={entity.description}
          />
        })}
      </div>
    </div>
  );
};

export default MainPage;