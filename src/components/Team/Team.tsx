import React from 'react';

import Developer from './components/Developer';

import cl from './Team.module.scss';

import devAva from '../../assets/avatar.jpg';
import { useTranslation } from 'react-i18next';

const developers = [
  {
    id: 1,
    name: 'Имя Разработчика',
    imageUrl: devAva,
    position: 'Developer',
    githubUrl: 'https://github.com',
    description: [
      {
        id: 1,
        text: 'Функционал 1',
      },
      {
        id: 2,
        text: 'Функционал 2',
      },
      {
        id: 3,
        text: 'Функционал 3',
      },
    ],
  },
  {
    id: 2,
    name: 'Имя Разработчика',
    imageUrl: devAva,
    position: 'Developer',
    githubUrl: 'https://github.com',
    description: [
      {
        id: 1,
        text: 'Функционал 1',
      },
      {
        id: 2,
        text: 'Функционал 2',
      },
      {
        id: 3,
        text: 'Функционал 3',
      },
    ],
  },
  {
    id: 3,
    name: 'Имя Разработчика',
    imageUrl: devAva,
    position: 'Developer',
    githubUrl: 'https://github.com',
    description: [
      {
        id: 1,
        text: 'Функционал 1',
      },
      {
        id: 2,
        text: 'Функционал 2',
      },
      {
        id: 3,
        text: 'Функционал 3',
      },
    ],
  },
];

const Team = () => {
  const { t } = useTranslation();
  return (
    <div className={cl.team}>
      <h2 className={cl.title}>{t('home.team.title')}</h2>
      <div className={cl.content}>
        {developers.map(({ id, ...rest }) => {
          return <Developer key={id} {...rest} />;
        })}
      </div>
    </div>
  );
};

export default Team;
