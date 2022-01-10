import React from 'react';
import './EntityCard.css'


import { Link } from "react-router-dom";
import routes from "../../routes";

const EntityCard = ({ id, Image, name, description, tags }) => {
  return (
    <Link className='entity-card' to={routes.ENTITY_PAGE.getLinkTo(id)}>
      <div className="entity-card-image-container">
        <Image className='entity-card-image' />
      </div>

      <span className="entity-card-name">{name}</span>
      <p className="text-secondary mt-2">{description}</p>

      <span className="entity-card-type mt-3 mr-2">{tags.toString().replaceAll(',', ', ')}</span>
    </Link>
  );
};

export default EntityCard;