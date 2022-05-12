import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IDropTasks, ITask } from '../../../../models/ITask';
import BoardService from '../../../../services/BoardService';
import { ETAskModalMode } from '../../../../types';
import ModalTask from '../ModalTask';

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
  const [isUpdate, setIsUpdate] = useState(false);

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
      if (task.columnId !== columnId) {
        console.log('!=');
      }
      if (task.columnId == columnId) {
        if (task.id !== id) {
          moveTaskItem(task.id, id);
        }
      }
    },
  });

  dragRef(taskRef);
  dropRef(taskRef);

  const handleDeleteTask = () => {
    deleteTask(id);
  };

  const updateTask = async (titleEdit: string, descrEdit: string) => {
    title = titleEdit;
    description = descrEdit;
    await BoardService.updateTask(boardId, columnId, id, titleEdit, order, descrEdit, userId);
    closeModal();
  };

  const closeModal = () => {
    setIsUpdate(false);
  };

  const showModal = () => {
    setIsUpdate(true);
  };

  return (
    <div ref={taskRef} className={isDragging ? `${cl.itemTask} ${cl.hide}` : cl.itemTask}>
      <div className={cl.taskTitle}>{title}</div>
      <div className={cl.taskBtnContainer}>
        <button className={cl.editTask} onClick={showModal}>
          &#9998;
        </button>
        <button className={cl.deleteTask} onClick={handleDeleteTask}>
          &#10008;
        </button>
      </div>
      {isUpdate ? (
        <ModalTask
          mode={ETAskModalMode.UPDATE}
          handleClose={closeModal}
          updateTask={updateTask}
          valueDescr={description}
          valueTitle={title}
        />
      ) : null}
    </div>
  );
};

export default Task;
