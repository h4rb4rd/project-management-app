import React, { useEffect, useState } from 'react';
import AuthBar from '../../components/AuthBar';

import Logo from '../../components/Logo';
import NavBar from '../../components/NavBar';
import UserBar from '../../components/UserBar';
import { useAppSelector } from '../../hooks/redux';

import cl from './Header.module.scss';

const Header = () => {
  const { user } = useAppSelector((state) => state.AuthReducer);
  const [isScrolled, setIsScrolled] = useState(false);
  const [classes, setClasses] = useState([cl.header]);

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

  useEffect(() => {
    if (!user) {
      if (isScrolled) {
        setClasses([cl.header, cl.white]);
      } else {
        setClasses([cl.header]);
      }
    } else {
      setClasses([cl.header, cl.blue]);
      if (isScrolled) {
        setClasses([cl.header, cl.blue, cl.shadow]);
      } else {
        setClasses([cl.header, cl.blue]);
      }
    }
  }, [user, isScrolled]);

  return (
    <header className={classes.join(' ')}>
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
