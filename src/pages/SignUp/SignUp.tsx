import React from 'react';

import Logo from '../../components/Logo';
import SignUpBg from '../../partials/SignUpBg';
import SignUpForm from '../../components/SignUpForm';

import cl from './SignUp.module.scss';

const SignUp = () => {
  return (
    <div className={cl.signup}>
      <Logo />
      <div className={cl.container}>
        <h2>Регистрация</h2>
        <SignUpForm />
      </div>
      <SignUpBg />
    </div>
  );
};

export default SignUp;
