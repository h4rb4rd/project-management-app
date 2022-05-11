import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { RouteNames } from '../AppRouter/types';

import cl from './AuthBar.module.scss';

const AuthBar = () => {
  const { t } = useTranslation();

  return (
    <div className={cl.bar}>
      <Link to={RouteNames.LOGIN}>{t('authBar.signIn')}</Link>
      <Link to={RouteNames.SIGN_UP}>{t('authBar.signUp')}</Link>
    </div>
  );
};

export default AuthBar;
