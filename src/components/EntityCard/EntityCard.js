import React from 'react';
import './EntityCard.css'


import { Link } from "react-router-dom";
import routes from "../../routes";
import {HeaderText, SecondaryText} from "../Text/Text";

const EntityCard = ({ id, Image, name, description, tags }) => {
  return (
    <Link className='entity-card' to={routes.ENTITY_PAGE.getLinkTo(id)}>
      <div className="entity-card-image-container">
        <Image className='entity-card-image' />
      </div>

      <HeaderText className="entity-card-name">{name}</HeaderText>
      <SecondaryText className="text-secondary mt-2 mb-3">{description}</SecondaryText>

      <span className="entity-card-type mt-3 mr-2">{tags.toString().replaceAll(',', ', ')}</span>
    </Link>
  );
};

export default EntityCard;