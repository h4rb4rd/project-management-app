import React from 'react';
import { Link } from 'react-router-dom';

import img from '../../assets/warning.svg';

import cl from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={cl.error}>
      <img src={img} alt="warning" />
      <h2>Oops! 404 - PAGE NOT FOUND</h2>
      <p>The page you are looking for might have been removed</p>
      <p>had its name changed or temporarily unavailable.</p>
      <Link to="/">Go to homepage</Link>
    </div>
  );
};

export default NotFound;
