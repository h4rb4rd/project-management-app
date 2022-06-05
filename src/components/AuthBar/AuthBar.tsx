import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { RouteNames } from '../AppRouter/types';

import cl from './AuthBar.module.scss';

interface AuthBarProps {
  closeBurger?: () => void;
}
const AuthBar = ({ closeBurger }: AuthBarProps) => {
  const { t } = useTranslation();
  const token = localStorage.getItem('token');

  if (token) {
    return null;
  }

  const handleClose = () => {
    if (closeBurger) {
      closeBurger();
    }
  };

  return (
    <div className={cl.bar}>
      <Link to={RouteNames.LOGIN} onClick={handleClose}>
        {t('authBar.signIn')}
      </Link>
      <Link to={RouteNames.SIGN_UP} onClick={handleClose}>
        {t('authBar.signUp')}
      </Link>
    </div>
  );
};

export default AuthBar;
