import React, { useState } from 'react';
import clsx from 'clsx';

import AuthBar from '../../../AuthBar';
import Logo from '../../../Logo';
import NavBar from '../../../NavBar';

import cl from './Burger.module.scss';

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBurger = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeBurger = () => {
    setIsOpen(false);
  };

  return (
    <div className={cl.container}>
      <button className={clsx(cl.button, isOpen && cl.open)} onClick={toggleBurger}>
        <span className={cl.burger} />
      </button>
      <div className={clsx(cl.menu, isOpen && cl.open)} onClick={closeBurger}>
        <div className={cl.content} onClick={(e) => e.stopPropagation()}>
          <Logo closeBurger={closeBurger} />
          <hr className={cl.selector} />
          <NavBar closeBurger={closeBurger} />
          <AuthBar closeBurger={closeBurger} />
        </div>
      </div>
    </div>
  );
};

export default Burger;
