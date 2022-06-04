import React from 'react';

import img from '../../assets/preloader.svg';
import PageLayout from '../../layouts/PageLayout';

import cl from './Preloader.module.scss';

const Preloader = () => {
  return (
    <PageLayout isHeader={false}>
      <div className={cl.preloader}>
        <img src={img} alt="preloader" />
      </div>
    </PageLayout>
  );
};

export default Preloader;
