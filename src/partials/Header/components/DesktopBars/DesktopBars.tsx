import React from 'react';
import AuthBar from '../../../../components/AuthBar';

import Logo from '../../../../components/Logo';
import NavBar from '../../../../components/NavBar';
import { useAppSelector } from '../../../../hooks/redux';

import cl from './DesktopBars.module.scss';

const DesktopBars = () => {
  const { user } = useAppSelector((state) => state.AuthReducer);

  return (
    <div className={cl.container}>
      <Logo />
      {user ? <NavBar /> : <AuthBar />}
    </div>
  );
};

export default DesktopBars;
