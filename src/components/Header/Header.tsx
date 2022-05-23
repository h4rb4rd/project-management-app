import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import DesktopBars from './components/DesktopBars';
import { useAppSelector } from '../../hooks/redux';

import cl from './Header.module.scss';
import Burger from './components/Burger';
import UserBar from '../UserBar';

const Header = () => {
  const { user } = useAppSelector((state) => state.AuthReducer);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (typeof window == 'undefined') {
      return;
    } else {
      setIsScrolled(window.scrollY >= 70);
    }
  };

  return (
    <header
      className={clsx(
        cl.header,
        !user && isScrolled && cl.white,
        user && cl.blue,
        user && isScrolled && `${cl.blue} ${cl.shadow}`
      )}
    >
      <DesktopBars />
      <Burger />
      {user && <UserBar />}
    </header>
  );
};

export default Header;
