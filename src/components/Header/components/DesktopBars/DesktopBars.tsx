import React from 'react';
import AuthBar from '../../../AuthBar';

import Logo from '../../../Logo';
import NavBar from '../../../NavBar';

import cl from './DesktopBars.module.scss';

const DesktopBars = () => {
  return (
    <div className={cl.container}>
      <Logo />
      <NavBar />
      <AuthBar />
    </div>
  );
};

export default DesktopBars;
