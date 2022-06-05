import React from 'react';
import { NavLink as NavLinkRouterDom } from 'react-router-dom';

import cl from './NavLink.module.scss';

interface NavLinkProps {
  text: string;
  path: string;
  closeBurger?: () => void;
}

const NavLink = ({ text, path, closeBurger }: NavLinkProps) => {
  const handleClose = () => {
    if (closeBurger) {
      closeBurger();
    }
  };

  return (
    <NavLinkRouterDom
      to={path}
      className={({ isActive }) => (isActive ? cl.active : '')}
      onClick={handleClose}
    >
      {text}
    </NavLinkRouterDom>
  );
};

export default NavLink;
