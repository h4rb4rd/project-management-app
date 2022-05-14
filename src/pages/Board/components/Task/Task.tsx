import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { IDropTasks, ITask } from '../../../../models/ITask';
import BoardService from '../../../../services/BoardService';
import { AppDispatch, moveTaskItem, updateTaskItem } from '../../../../store/store';
import { ETAskModalMode } from '../../../../types';
import ModalTask from '../ModalTask';

import cl from './Task.module.scss';

interface ITaskView extends IDropTasks {
  reorderTask: () => void;
}

const Task = ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
  deleteTask,
  reorderTask,
}: ITaskView) => {
  const dispatch = useDispatch<AppDispatch>();
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
      if (task.columnId == columnId) {
        if (task.id !== id) {
          const dragId = task.id;
          const moveItem = {
            columnId: columnId,
            dragId: dragId,
            hoverId: id,
          };
          dispatch(moveTaskItem(moveItem));
        }
      }
    },
    drop: (task: ITask) => {
      if (task.columnId === columnId) {
        reorderTask();
      }
    },
  });

  dragRef(taskRef);
  dropRef(taskRef);

  const handleDeleteTask = () => {
    deleteTask(id);
  };

  const updateTask = async (titleEdit: string, descrEdit: string) => {
    const result = await BoardService.updateTask(
      boardId,
      columnId,
      id,
      titleEdit,
      order,
      descrEdit,
      userId
    );
    if (result?.status === 200) {
      dispatch(updateTaskItem(result.data));
    }
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
        <button className={`${cl.buttonTask} ${cl.editTask}`} onClick={showModal}>
          &#9998;
        </button>
        <button className={`${cl.buttonTask} ${cl.deleteTask}`} onClick={handleDeleteTask}>
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
