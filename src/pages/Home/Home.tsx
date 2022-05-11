import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import img from '../../assets/home.png';
import Team from '../../partials/Team';

import cl from './Home.module.scss';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { user } = useAppSelector((state) => state.AuthReducer);
  const { t } = useTranslation();

  return (
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
  );
};

export default Home;
