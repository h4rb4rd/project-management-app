import React from 'react';

import Logo from '../../components/Logo';
import SignUpBg from '../../components/SignUpBg';
import SignUpForm from '../../components/SignUpForm';

import cl from './SignUp.module.scss';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const { t } = useTranslation();

  return (
    <div className={cl.signup}>
      <Logo />
      <div className={cl.container}>
        <h2>{t('signUpForm.title')}</h2>
        <SignUpForm />
      </div>
      <SignUpBg />
    </div>
  );
};

export default SignUp;
