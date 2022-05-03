import React from 'react';

import { RouteNames } from '../AppRouter/types';
import NavLink from '../NavLink';

import cl from './NavBar.module.scss';

const NavBar = () => {
  return (
    <nav className={cl.links}>
      <NavLink text="Главная" path={RouteNames.HOME} />
      <NavLink text="Доски" path={RouteNames.BOARDS} />
    </nav>
  );
};

export default NavBar;
