import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IDropTasks, ITask } from '../../../../models/ITask';

import cl from './Task.module.scss';

export interface ITaskView extends IDropTasks {
  moveTaskItem: (dragId: string, hoverId: string) => void;
  dropTask: (dropTask: IDropTasks, task: ITask) => void;
}

interface IHoverTask {
  id: string;
}

const Task = ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
  moveTaskItem,
  dropTask,
  deleteTask,
}: ITaskView) => {
  const taskRef = useRef(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'task',
    item: { id, title, order, description, userId, boardId, columnId, deleteTask },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [spec, dropRef] = useDrop({
    accept: 'task',
    hover: (task: ITask) => {
      // console.log(index);
      if (task.columnId !== columnId) {
        console.log('!=');
      }
      if (task.columnId == columnId) {
        if (task.id !== id) {
          moveTaskItem(task.id, id);
        }
      }
    },
    // drop: (taskDrop: ITask) => {
    //   console.log('drop', taskDrop);
    //   dropTask(taskDrop, {
    //     id,
    //     title,
    //     order,
    //     description,
    //     userId,
    //     boardId,
    //     columnId,
    //   });
    // },
  });

  dragRef(taskRef);
  dropRef(taskRef);

  const handleDeleteTask = () => {
    deleteTask(id);
  };

  return (
    <div ref={taskRef} className={isDragging ? `${cl.itemTask} ${cl.hide}` : cl.itemTask}>
      <div>{title}</div>
      <button className={cl.deleteTask} onClick={handleDeleteTask}>
        X
      </button>
    </div>
  );
};

export default Task;
