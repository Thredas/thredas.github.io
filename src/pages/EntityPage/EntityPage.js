import React from 'react';
import './entity-page.css';

import BackButton from "../../components/BackButton/BackButton";

import { useParams } from 'react-router-dom';
import index from "../../projects";
import { HeaderText, SecondaryText } from "../../components/Text/Text";
import { Tabs, Tab } from "react-bootstrap";

const EntityPage = () => {
  const { entityId } = useParams();
  const entity = Object.values(index).find((el) => el.id === parseInt(entityId));

  return (
    <div className="entity-page">
      <BackButton text="To projects" />

      <HeaderText className="fs-3">
        {entity.name}
      </HeaderText>

      <SecondaryText>
        {entity.description}
      </SecondaryText>

      <Tabs variant="pills" defaultActiveKey="content" className="mt-3">
        <Tab eventKey="content" title="Content" className="content">
          <div className="content mt-3">
            {entity.content}
          </div>
        </Tab>

        <Tab eventKey="code" title="# Code">
          <div className="mt-3">
            {entity.code}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default EntityPage;