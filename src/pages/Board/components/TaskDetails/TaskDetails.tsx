import React from 'react';
import { useTranslation } from 'react-i18next';

import cl from './TaskDetails.module.scss';

interface TaskDetailsProps {
  title: string;
  description: string;
  close: () => void;
}

const TaskDetails = ({ title, description, close }: TaskDetailsProps) => {
  const { t } = useTranslation();

  return (
    <div className={cl.container}>
      <h2 className={cl.title}>{title}</h2>
      <p className={cl.description}>{description}</p>
      <button className={cl.close} onClick={close}>
        {t('task.detailsBtn')}
      </button>
    </div>
  );
};

export default TaskDetails;
