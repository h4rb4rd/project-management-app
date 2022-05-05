import React from 'react';

import cl from './ErrorFallback.module.scss';

import img from '../../assets/warning.svg';

const ErrorFallback = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className={cl.error}>
      <img src={img} alt="warning" />
      <h2>Oops! Something went wrong</h2>
      <p>Brace yourself till we get the error fixed.</p>
      <p>You may also refresh the page or try again later.</p>
      <button onClick={refreshPage}>Refresh</button>
    </div>
  );
};

export default ErrorFallback;
