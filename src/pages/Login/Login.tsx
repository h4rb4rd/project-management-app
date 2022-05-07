import React from 'react';

import LoginForm from '../../components/LoginForm';
import Logo from '../../components/Logo';
import SignUpBg from '../../partials/SignUpBg';

import cl from './Login.module.scss';

const Login = () => {
  return (
    <div className={cl.login}>
      <Logo />
      <div className={cl.container}>
        <h2>Вход в Trello</h2>
        <LoginForm />
      </div>
      <SignUpBg />
    </div>
  );
};

export default Login;
