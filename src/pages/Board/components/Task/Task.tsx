import React from 'react';

import cl from './Task.module.scss';

interface ITaskView {
  id: string;
  title: string;
  descr: string;
}

const Task = ({ id, title, descr }: ITaskView) => {
  return <div className={cl.itemTask}>{title}</div>;
};

export default Task;
