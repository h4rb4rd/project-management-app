import React from 'react';
import { useTranslation } from 'react-i18next';

import { RouteNames } from '../AppRouter/types';
import NavLink from '../NavLink';

import cl from './NavBar.module.scss';

const NavBar = () => {
  const { t } = useTranslation();

  return (
    <nav className={cl.links}>
      <NavLink text={t('navbar.main')} path={RouteNames.HOME} />
      <NavLink text={t('navbar.boards')} path={RouteNames.BOARDS} />
    </nav>
  );
};

export default NavBar;
