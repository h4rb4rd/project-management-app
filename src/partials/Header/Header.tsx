import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import AuthBar from '../../components/AuthBar';
import Logo from '../../components/Logo';
import NavBar from '../../components/NavBar';
import UserBar from '../../components/UserBar';
import { useAppSelector } from '../../hooks/redux';

import cl from './Header.module.scss';

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
      <Logo />
      {!user && <AuthBar />}
      {user && (
        <>
          <NavBar />
          <UserBar />
        </>
      )}
    </header>
  );
};

export default Header;
