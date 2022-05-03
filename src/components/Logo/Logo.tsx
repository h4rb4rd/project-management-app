import React from 'react';
import { useNavigate } from 'react-router-dom';

import logoImage from '../../assets/logo.svg';
import { RouteNames } from '../AppRouter/types';

import cl from './Logo.module.scss';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <button className={cl.logo} onClick={() => navigate(RouteNames.HOME)}>
      <img src={logoImage} alt="logo" />
      <span>Trello</span>
    </button>
  );
};

export default Logo;
