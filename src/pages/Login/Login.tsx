import React, { useEffect } from 'react';

import { LoginFormDataType } from '../../types';

import LoginForm from '../../components/LoginForm';
import Logo from '../../components/Logo';
import SignUpBg from '../../partials/SignUpBg';

import cl from './Login.module.scss';

const Login = () => {
  const submitData = (data: LoginFormDataType) => {
    console.log(data);
  };

  return (
    <div className={cl.login}>
      <Logo />
      <div className={cl.container}>
        <h2>Вход в Trello</h2>
        <LoginForm submitData={submitData} />
      </div>
      <SignUpBg />
    </div>
  );
};

export default Login;
