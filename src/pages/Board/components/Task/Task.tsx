import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AppDispatch } from '../../../../store/store';
import { boardSlice } from '../../../../store/reducers/BoardSlice';
import Confirmation from '../../../../components/Confirmation';
import deleteImg from '../../../../assets/delete.svg';
import editImg from '../../../../assets/edit.svg';
import { ETAskModalMode } from '../../../../types';
import { ITask } from '../../../../models/ITask';
import ModalPortal from '../../../../Portals/ModalPortal';
import ModalTask from '../ModalTask';
import TaskDetails from '../TaskDetails';

import cl from './Task.module.scss';
import { deleteTaskItem, updateTaskItem } from '../../../../store/thunks/BoardThunks';

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
  const [isTaskDetails, setIsTaskDetails] = useState(false);
  const { moveTaskItem } = boardSlice.actions;
  const { t } = useTranslation();

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
      <div className={cl.taskTitle} onClick={() => setIsTaskDetails(true)}>
        {title}
      </div>
      <div className={cl.taskBtnContainer}>
        <button className={cl.buttonTask} onClick={showModal}>
          <img src={editImg} alt="edit" />
        </button>
        <button
          className={cl.buttonTask}
          onClick={() => {
            setIsShowConfirm(true);
          }}
        >
          <img src={deleteImg} alt="delete" />
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
          text={t('task.confirmation')}
          confirm={deleteTask}
          close={() => {
            setIsShowConfirm(false);
          }}
        />
      </ModalPortal>
      <ModalPortal
        isActive={isTaskDetails}
        close={() => {
          setIsTaskDetails(false);
        }}
      >
        <TaskDetails
          title={title}
          description={description}
          close={() => {
            setIsTaskDetails(false);
          }}
        />
      </ModalPortal>
    </div>
  );
};

export default Task;
