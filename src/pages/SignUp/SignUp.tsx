import React from 'react';

import cl from './SignUp.module.scss';

import Logo from '../../components/Logo';
import SignUpBg from '../../partials/SignUpBg';
import SignUpForm from '../../components/SignUpForm';
import { SignUpFormDataType } from '../../types';

const SignUp = () => {
  const submitData = (data: SignUpFormDataType) => {
    console.log(data);
  };
  return (
    <div className={cl.signup}>
      <Logo />
      <div className={cl.container}>
        <h2>Регистрация</h2>
        <SignUpForm submitData={submitData} />
      </div>
      <SignUpBg />
    </div>
  );
};

export default SignUp;
