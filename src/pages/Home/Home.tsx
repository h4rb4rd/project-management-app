import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import img from '../../assets/home.png';
import Team from '../../partials/Team';

import cl from './Home.module.scss';

const Home = () => {
  const { user } = useAppSelector((state) => state.AuthReducer);

  return (
    <div className={cl.home}>
      <div className={cl.info}>
        <div className={cl.text}>
          <h2>
            <span>Trello</span> помогает командам эффективно решать рабочие задачи.
          </h2>
          <p>
            Работайте в команде, управляйте проектами и выводите продуктивность на новый уровень
            собственным уникальным способом вместе с Trello.
          </p>
        </div>
        <img src={img} alt="main image" />
      </div>
      <div className={cl.offer}>
        <h2>Это не просто работа. Это координация действий в команде.</h2>
        <p>
          Начните с досок, колонок и карточек, а затем переходите к более сложным функциям.
          Управляйте проектами, упорядочивайте задачи и поддерживайте командный дух — все это в
          Trello.
        </p>
        {!user && <Link to="/signup">Начать работу &#8594;</Link>}
      </div>
      <Team />
    </div>
  );
};

export default Home;
