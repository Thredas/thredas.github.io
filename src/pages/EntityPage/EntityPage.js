import React from 'react';
import './entity-page.css';

import BackButton from "../../components/BackButton/BackButton";

import { useParams } from 'react-router-dom';
import index from "../../projects";
import {HeaderText, SecondaryText} from "../../components/Text/Text";

const EntityPage = () => {
  const { entityId } = useParams();
  const entity = Object.values(index).find((el) => el.id === parseInt(entityId));

  return (
    <div className="entity-page">
      <BackButton text="To projects" />

      <HeaderText className="fs-3">{entity.name}</HeaderText>
      <SecondaryText>{entity.description}</SecondaryText>

      <div className="content mt-4">
        {entity.content}
      </div>
    </div>
  );
};

export default EntityPage;