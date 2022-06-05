import React from 'react';
import { useTranslation } from 'react-i18next';

import LoginForm from '../../components/LoginForm';
import Logo from '../../components/Logo';
import PageLayout from '../../layouts/PageLayout';
import SignUpBg from '../../components/SignUpBg';

import cl from './Login.module.scss';

const Login = () => {
  const { t } = useTranslation();

  return (
    <PageLayout isHeader={false}>
      <div className={cl.login}>
        <Logo />
        <div className={cl.container}>
          <h2>{t('loginForm.title')} Trello</h2>
          <LoginForm />
        </div>
        <SignUpBg />
      </div>
    </PageLayout>
  );
};

export default Login;
