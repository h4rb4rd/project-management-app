import React from 'react';

import cl from './SignUp.module.scss';

import Logo from '../../components/Logo';
import SignUpBg from '../../partials/SignUpBg';

const SignUp = () => {
  return (
    <div className={cl.signup}>
      <Logo />
      <h2>Регистрация</h2>
      <div className={cl.container}>Form</div>
      <SignUpBg />
    </div>
  );
};

export default SignUp;
