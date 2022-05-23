import React from 'react';
import AuthBar from '../../../AuthBar';

import Logo from '../../../Logo';
import NavBar from '../../../NavBar';

import cl from './DesktopBars.module.scss';
import { getValueWithExpiry } from '../../../../utils/storage';

const DesktopBars = () => {
  const token = getValueWithExpiry('token');

  return (
    <div className={cl.container}>
      <Logo />
      {token ? <NavBar /> : <AuthBar />}
    </div>
  );
};

export default DesktopBars;
