import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import DesktopBars from './components/DesktopBars';

import cl from './Header.module.scss';
import Burger from './components/Burger';
import SearchBar from '../SearchBar';
import UserBar from '../UserBar';
import { getValueWithExpiry } from '../../utils/storage';

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
