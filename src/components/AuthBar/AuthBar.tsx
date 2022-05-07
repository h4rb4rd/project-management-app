import React from 'react';
import { Link } from 'react-router-dom';

import { RouteNames } from '../AppRouter/types';

import cl from './AuthBar.module.scss';

const AuthBar = () => {
  return (
    <div className={cl.bar}>
      <Link to={RouteNames.LOGIN}>Войти</Link>
      <Link to={RouteNames.SIGN_UP}>Регистрация</Link>
    </div>
  );
};

export default AuthBar;
