import React from 'react';

import img from '../../assets/preloader.svg';

import cl from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={cl.preloader}>
      <img src={img} alt="preloader" />
    </div>
  );
};

export default Preloader;
