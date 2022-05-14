import clsx from 'clsx';
import React, { useState } from 'react';
import AuthBar from '../../../../components/AuthBar';

import Logo from '../../../../components/Logo';
import NavBar from '../../../../components/NavBar';
import { useAppSelector } from '../../../../hooks/redux';

import cl from './Burger.module.scss';

const Burger = () => {
  const { user } = useAppSelector((state) => state.AuthReducer);
  const [isOpen, setIsOpen] = useState(false);

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
          {user ? <NavBar /> : <AuthBar />}
        </div>
      </div>
    </div>
  );
};

export default Burger;
