import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import img from '../../assets/warning.svg';
import PageLayout from '../../layouts/PageLayout';

import cl from './NotFound.module.scss';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <PageLayout isHeader={false}>
      <div className={cl.error}>
        <img src={img} alt="warning" />
        <h2>{t('notFound.title')}</h2>
        <p>{t('notFound.p1')}</p>
        <p>{t('notFound.p2')}</p>
        <Link to="/">Go to homepage</Link>
      </div>
    </PageLayout>
  );
};

export default NotFound;
