import React from 'react';

import cl from './ErrorFallback.module.scss';

import img from '../../assets/warning.svg';
import { useTranslation } from 'react-i18next';

const ErrorFallback = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  const { t } = useTranslation();

  return (
    <div className={cl.error}>
      <img src={img} alt="warning" />
      <h2>{t('errorFallback.title')}</h2>
      <p>{t('errorFallback.p1')}</p>
      <p>{t('errorFallback.p2')}</p>
      <button onClick={refreshPage}>{t('errorFallback.btn')}</button>
    </div>
  );
};

export default ErrorFallback;
