import React from 'react';
import { useTranslation } from 'react-i18next';

import NavLink from '../NavLink';
import { RouteNames } from '../AppRouter/types';

import cl from './NavBar.module.scss';

const NavBar = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  return (
    <nav className={cl.links}>
      <NavLink text={t('navbar.main')} path={RouteNames.HOME} />
      <NavLink text={t('navbar.boards')} path={RouteNames.BOARDS} />
    </nav>
  );
};

export default NavBar;
