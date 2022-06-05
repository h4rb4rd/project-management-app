import React from 'react';
import { useTranslation } from 'react-i18next';

import Developer from './components/Developer';
import { teamData } from '../../mocks/teamData';

import cl from './Team.module.scss';

const Team = () => {
  const { t } = useTranslation();

  return (
    <div className={cl.team}>
      <h2 className={cl.title}>{t('home.team.title')}</h2>
      <div className={cl.content}>
        {teamData.map(({ id, ...rest }) => {
          return <Developer key={id} {...rest} />;
        })}
      </div>
    </div>
  );
};

export default Team;
