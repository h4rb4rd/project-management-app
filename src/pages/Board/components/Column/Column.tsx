import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../../store/store';
import BoardService from '../../../../services/BoardService';
import { boardSlice } from '../../../../store/reducers/BoardSlice';
import Confirmation from '../../../../components/Confirmation';
import { TAskModalMode } from '../../types';
import { getNewOrder } from '../../../../utils/board';
import { getValueWithExpiry } from '../../../../utils/storage';
import { IColumn } from '../../../../models/IColumns';
import { ITask } from '../../../../models/ITask';
import ModalPortal from '../../../../portals/ModalPortal';
import ModalTaskAdd from '../ModalTask';
import Task from '../Task';
import {
  addTaskItem,
  deleteColumnItem,
  transferTaskItem,
  updateColumnItem,
} from '../../../../store/thunks/BoardThunks';

import cl from './Column.module.scss';

interface IColumnView extends IColumn {
  boardId: string;
  index: number;
  taskList: ITask[];
  reorderColumn: () => void;
}

interface IHoverColumn {
  id: string;
}

const Column = ({ id, title, order, boardId, taskList, reorderColumn }: IColumnView) => {
  const dispatch = useDispatch<AppDispatch>();
  const [titleCard, setTitle] = useState(title || 'column');
  const [isChangeTitle, setIsChangeTitle] = useState(false);
  const [isShowTaskAdd, setIsShowTaskAdd] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const itemRef = useRef(null);
  const { moveColumnItem } = boardSlice.actions;
  const { t } = useTranslation();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'column',
    item: { id, title, order },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [spec, dropRef] = useDrop({
    accept: 'column',
    hover: (column: IHoverColumn) => {
      if (column.id !== id) {
        const dragId = column.id;
        const moveItem = {
          dragId: dragId,
          hoverId: id,
        };
        dispatch(moveColumnItem(moveItem));
      }
    },
    drop: () => {
      reorderColumn();
    },
  });

  const [specTask, dropTaskRef] = useDrop({
    accept: 'task',
    drop: (dropenTask: ITask) => {
      dropTask(dropenTask);
    },
  });

  dragRef(itemRef);
  dropRef(itemRef);
  dropTaskRef(itemRef);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOk = async () => {
    if (!titleCard.trim()) {
      setTitle(title);
    } else {
      const result = await BoardService.updateColumn(boardId, id, titleCard, order);
      if (result?.status === 200) {
        dispatch(
          updateColumnItem({
            boardId,
            columnId: id,
            titleColumn: titleCard,
            orderColumn: order,
          })
        );
      }
    }
    setIsChangeTitle(false);
  };

  const handleNo = () => {
    setTitle(title);
    setIsChangeTitle(false);
  };

  const handleCloseModal = () => {
    setIsShowTaskAdd(false);
  };

  const addTask = async (title: string, descr: string) => {
    const userId = getValueWithExpiry('userId');

    dispatch(
      addTaskItem({
        boardId,
        columnId: id,
        title,
        order: taskList.length + 1,
        description: descr,
        userId,
      })
    );
    setIsShowTaskAdd(false);
  };

  const requestReorderTask = async () => {
    taskList.forEach((item) => {
      BoardService.updateTask(
        boardId,
        id,
        item.id,
        item.title,
        item.order,
        item.description,
        item.userId
      );
    });
  };

  const dropTask = (dropTask: ITask) => {
    if (dropTask.columnId !== id) {
      const order = getNewOrder(taskList.length);
      dispatch(
        transferTaskItem({
          boardId,
          columnId: dropTask.columnId,
          toColumnId: id,
          taskId: dropTask.id,
          title: dropTask.title,
          order: order,
          description: dropTask.description,
          userId: dropTask.userId,
        })
      );
    }
  };

  const showAddTaskDialog = () => {
    setIsShowTaskAdd(true);
  };

  const deleteColumn = () => {
    dispatch(deleteColumnItem({ boardId, columnId: id }));
    setIsShowConfirm(false);
  };

  return (
    <div ref={itemRef} className={isDragging ? `${cl.column} ${cl.hide}` : cl.column}>
      <div className={cl.columnHeader}>
        {isChangeTitle ? (
          <div className={cl.titleChangeContainer}>
            <input
              type="text"
              className={cl.inputTitle}
              value={titleCard}
              onChange={(e) => {
                handleChangeTitle(e);
              }}
              autoFocus
            />
            <button className={`${cl.changeBtn} ${cl.changeBtnNo}`} onClick={handleNo}>
              &#10008;
            </button>
            <button className={`${cl.changeBtn} ${cl.changeBtnOk}`} onClick={handleOk}>
              &#10004;
            </button>
          </div>
        ) : (
          <div className={cl.titleBoard} onDoubleClick={() => setIsChangeTitle(true)}>
            {titleCard}
            <button
              className={`${cl.deleteButton}`}
              onClick={() => {
                setIsShowConfirm(true);
              }}
            >
              &#10006;
            </button>
          </div>
        )}
      </div>

      <div className={cl.taskListContainer}>
        {taskList.length
          ? taskList.map(({ id, description, title, order, boardId, columnId, userId }) => (
              <Task
                key={id}
                title={title}
                id={id}
                description={description}
                order={order}
                boardId={boardId}
                columnId={columnId}
                userId={userId}
                reorderTask={requestReorderTask}
              />
            ))
          : null}
      </div>
      <button className={`${cl.btnTaskAdd}`} onClick={showAddTaskDialog}>
        <span className={cl.iconAdd}>+</span>
        <span>{t('column.btnAdd')}</span>
      </button>
      {isShowTaskAdd ? (
        <ModalTaskAdd mode={TAskModalMode.ADD} handleClose={handleCloseModal} addTask={addTask} />
      ) : null}

      <ModalPortal
        isActive={isShowConfirm}
        close={() => {
          setIsShowConfirm(false);
        }}
      >
        <Confirmation
          text={`${t('column.confirmation')}`}
          confirm={deleteColumn}
          close={() => {
            setIsShowConfirm(false);
          }}
        />
      </ModalPortal>
    </div>
  );
};

export default Column;
