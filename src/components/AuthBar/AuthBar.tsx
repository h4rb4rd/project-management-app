import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { authSlice } from '../../store/reducers/AuthSlice';
import { RouteNames } from '../AppRouter/types';

import cl from './AuthBar.module.scss';

import ava from '../../assets/avatar.jpg';

const user = {
  name: 'Alex',
  email: 'alex@mail.ru',
  imgSrc: ava,
};

const AuthBar = () => {
  const navigate = useNavigate();

  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  const login = () => {
    dispatch(setUser(user));
    navigate(RouteNames.BOARDS);
  };

  return (
    <div className={cl.bar}>
      <button onClick={login}>Войти</button>
      <button className={cl.blue}>Регистрация</button>
    </div>
  );
};

export default AuthBar;
