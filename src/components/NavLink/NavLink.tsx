import React from 'react';
import { NavLink as NavLinkRouterDom } from 'react-router-dom';

import cl from './NavLink.module.scss';

interface NavLinkProps {
  text: string;
  path: string;
}

const NavLink = ({ text, path }: NavLinkProps) => (
  <NavLinkRouterDom to={path} className={({ isActive }) => (isActive ? cl.active : '')}>
    {text}
  </NavLinkRouterDom>
);

export default NavLink;
