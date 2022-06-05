import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import Burger from './components/Burger';
import DesktopBars from './components/DesktopBars';
import { getValueWithExpiry } from '../../utils/storage';
import SearchBar from '../SearchBar';
import UserBar from '../UserBar';

import cl from './Header.module.scss';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const token = getValueWithExpiry('token');

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
        !token && isScrolled && cl.white,
        token && cl.blue,
        token && isScrolled && `${cl.blue} ${cl.shadow}`
      )}
    >
      <DesktopBars />
      <Burger />
      <SearchBar />
      <UserBar />
    </header>
  );
};

export default Header;
