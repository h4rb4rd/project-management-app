import clsx from 'clsx';
import React, { useState } from 'react';
import AuthBar from '../../../AuthBar';

import Logo from '../../../Logo';
import NavBar from '../../../NavBar';

import cl from './Burger.module.scss';
import { getValueWithExpiry } from '../../../../utils/storage';

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = getValueWithExpiry('token');

  const toggleBurger = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={cl.container}>
      <button className={clsx(cl.button, isOpen && cl.open)} onClick={toggleBurger}>
        <span className={cl.burger} />
      </button>
      <div className={clsx(cl.menu, isOpen && cl.open)} onClick={() => setIsOpen(false)}>
        <div className={cl.content} onClick={(e) => e.stopPropagation()}>
          <Logo />
          <hr className={cl.selector} />
          <NavBar />
          <AuthBar />
        </div>
      </div>
    </div>
  );
};

export default Burger;
