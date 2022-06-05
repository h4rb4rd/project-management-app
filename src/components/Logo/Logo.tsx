import React from 'react';
import { useNavigate } from 'react-router-dom';

import logoImage from '../../assets/logo.svg';
import { RouteNames } from '../AppRouter/types';

import cl from './Logo.module.scss';

interface LogoProps {
  closeBurger?: () => void;
}
const Logo = ({ closeBurger }: LogoProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (closeBurger) {
      closeBurger();
    }

    navigate(RouteNames.HOME);
  };

  return (
    <button className={cl.logo} onClick={handleClick}>
      <img src={logoImage} alt="logo" />
      <span>Trello</span>
    </button>
  );
};

export default Logo;
