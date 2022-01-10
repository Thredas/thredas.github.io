import React from 'react';
import './entity-page.css';

import BackButton from "../../components/BackButton/BackButton";

import { useParams } from 'react-router-dom';
import index from "../../projects";

const EntityPage = () => {
  const { entityId } = useParams();
  const entity = Object.values(index).find((el) => el.id === parseInt(entityId));

  return (
    <div className="entity-page">
      <BackButton text="To projects" />

      <h3>{entity.name}</h3>
      <p className='text-secondary'>{entity.description}</p>

      <div className="content mt-5">
        {entity.content}
      </div>
    </div>
  );
};

export default EntityPage;