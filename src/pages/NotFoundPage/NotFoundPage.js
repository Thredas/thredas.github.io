import React from 'react';
import './NotFoundPage.css';
import { HeaderText, RegularText, SecondaryText } from "../../components/Text/Text";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

const NotFoundPage = () => {
  return (
    <div className="d-flex h-75 flex-column align-items-center justify-content-center">
      <HeaderText className="fs-1">404</HeaderText>
      <RegularText className='fs-4 mb-3'>Requested page was not found</RegularText>
      <SecondaryText>Try to correct page address</SecondaryText>

      <Link className="button mt-5" to="/">
        <ArrowLeft className="fs-6 me-2" />
        Return to main page
      </Link>
    </div>
  );
};

export default NotFoundPage;