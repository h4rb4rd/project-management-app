import React from 'react';
import { useTranslation } from 'react-i18next';

import NavLink from '../NavLink';
import { RouteNames } from '../AppRouter/types';

import cl from './NavBar.module.scss';

interface NavBarProps {
  closeBurger?: () => void;
}
const NavBar = ({ closeBurger }: NavBarProps) => {
  const { t } = useTranslation();
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  return (
    <nav className={cl.links}>
      <NavLink text={t('navbar.main')} path={RouteNames.HOME} closeBurger={closeBurger} />
      <NavLink text={t('navbar.boards')} path={RouteNames.BOARDS} closeBurger={closeBurger} />
    </nav>
  );
};

export default NavBar;
