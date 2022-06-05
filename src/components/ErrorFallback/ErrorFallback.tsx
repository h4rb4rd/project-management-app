import React from 'react';
import { useTranslation } from 'react-i18next';

import img from '../../assets/warning.svg';

import cl from './ErrorFallback.module.scss';

interface ErrorFallbackProps {
  isRedirect?: boolean;
}
const ErrorFallback = ({ isRedirect = true }: ErrorFallbackProps) => {
  const refreshPage = () => {
    window.location.reload();
  };

  const redirectHome = () => {
    window.location.href = '/home';
  };

  const { t } = useTranslation();

  return (
    <div className={cl.error}>
      <img src={img} alt="warning" />
      <h2>{t('errorFallback.title')}</h2>
      <p>{t('errorFallback.p1')}</p>
      <p>{t('errorFallback.p2')}</p>
      <button onClick={isRedirect ? redirectHome : refreshPage}>{t('errorFallback.btn')}</button>
    </div>
  );
};

export default ErrorFallback;
