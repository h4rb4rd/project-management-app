import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import img from '../../assets/home.png';
import PageLayout from '../../layouts/PageLayout';
import Team from '../../components/Team';
import { useAppSelector } from '../../hooks/redux';

import cl from './Home.module.scss';

const Home = () => {
  const { user, error } = useAppSelector((state) => state.AuthReducer);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <PageLayout isHeader={true}>
      <div className={cl.home}>
        <div className={cl.info}>
          <div className={cl.text}>
            <h2>
              <span>Trello</span> {t('home.offer.title')}
            </h2>
            <p>{t('home.offer.description')}</p>
          </div>
          <img src={img} alt="main image" />
        </div>
        <div className={cl.offer}>
          <h2>{t('home.info.title')}</h2>
          <p>{t('home.info.description')}</p>
          {!user && <Link to="/signup">{t('home.button')} &#8594;</Link>}
        </div>
        <Team />
      </div>
    </PageLayout>
  );
};

export default Home;
