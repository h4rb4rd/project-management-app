import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import Confirmation from '../../../../components/Confirmation';
import { ITask } from '../../../../models/ITask';
import ModalPortal from '../../../../Portals/ModalPortal';
import { boardSlice } from '../../../../store/reducers/BoardSlice';
import { AppDispatch } from '../../../../store/store';
import { deleteTaskItem, updateTaskItem } from '../../../../store/thunks';
import { ETAskModalMode } from '../../../../types';
import ModalTask from '../ModalTask';

import cl from './Task.module.scss';

interface ITaskView extends ITask {
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
  reorderTask,
}: ITaskView) => {
  const dispatch = useDispatch<AppDispatch>();
  const taskRef = useRef(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const { moveTaskItem } = boardSlice.actions;

  const [{ isDragging }, dragRef] = useDrag({
    type: 'task',
    item: { id, title, order, description, userId, boardId, columnId },
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

  const deleteTask = () => {
    dispatch(deleteTaskItem({ boardId, columnId, taskId: id }));
    setIsShowConfirm(false);
  };

  const updateTask = (titleEdit: string, descrEdit: string) => {
    dispatch(
      updateTaskItem({
        boardId,
        columnId,
        taskId: id,
        title: titleEdit,
        order,
        description: descrEdit,
        userId,
      })
    );
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
        <button
          className={`${cl.buttonTask} ${cl.deleteTask}`}
          onClick={() => {
            setIsShowConfirm(true);
          }}
        >
          &#10008;
        </button>
        <button className={`${cl.buttonTask} ${cl.editTask}`} onClick={showModal}>
          &#9998;
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
      <ModalPortal
        isActive={isShowConfirm}
        close={() => {
          setIsShowConfirm(false);
        }}
      >
        <Confirmation
          text={`Удалить задачу "${title}"?`}
          confirm={deleteTask}
          close={() => {
            setIsShowConfirm(false);
          }}
        />
      </ModalPortal>
    </div>
  );
};

export default Task;
