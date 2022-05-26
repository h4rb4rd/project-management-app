import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AppDispatch } from '../../../../store/store';
import { boardSlice } from '../../../../store/reducers/BoardSlice';
import Confirmation from '../../../../components/Confirmation';
import deleteImg from '../../../../assets/delete.svg';
import editImg from '../../../../assets/edit.svg';
import EditTaskModal from '../EditTaskModal';
import { ITask } from '../../../../models/ITask';
import ModalPortal from '../../../../portals/ModalPortal';
import TaskDetailsModal from '../TaskDetailsModal';
import { deleteTaskItem, updateTaskItem } from '../../../../store/thunks/BoardThunks';

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

  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const { t } = useTranslation();
  const { moveTaskItem } = boardSlice.actions;
  const [isDetailsModal, setIsDetailsModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

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
    setIsDetailsModal(false);
  };

  return (
    <div ref={taskRef} className={isDragging ? `${cl.itemTask} ${cl.hide}` : cl.itemTask}>
      <div className={cl.taskTitle} onClick={() => setIsDetailsModal(true)}>
        {title}
      </div>
      <div className={cl.taskBtnContainer}>
        <button className={cl.buttonTask} onClick={() => setIsEditModal(true)}>
          <img src={editImg} alt="delete" />
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
      <ModalPortal isActive={isDetailsModal} close={() => setIsDetailsModal(false)}>
        <TaskDetailsModal
          handleClose={() => setIsDetailsModal(false)}
          updateTask={updateTask}
          valueDescr={description}
          valueTitle={title}
        />
      </ModalPortal>
      <ModalPortal isActive={isEditModal} close={() => setIsEditModal(false)}>
        <EditTaskModal
          handleClose={() => setIsEditModal(false)}
          updateTask={updateTask}
          valueDescr={description}
          valueTitle={title}
        />
      </ModalPortal>
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
    </div>
  );
};

export default Task;
