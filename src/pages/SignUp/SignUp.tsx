import React from 'react';
import { useTranslation } from 'react-i18next';

import Logo from '../../components/Logo';
import PageLayout from '../../layouts/PageLayout';
import SignUpBg from '../../components/SignUpBg';
import SignUpForm from '../../components/SignUpForm';

import cl from './SignUp.module.scss';

const SignUp = () => {
  const { t } = useTranslation();

  return (
    <PageLayout isHeader={false}>
      <div className={cl.signup}>
        <Logo />
        <div className={cl.container}>
          <h2>{t('signUpForm.title')}</h2>
          <SignUpForm />
        </div>
        <SignUpBg />
      </div>
    </PageLayout>
  );
};

export default SignUp;
