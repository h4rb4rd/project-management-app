import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { IColumn } from '../../../../models/IColumns';
import { IDropTasks, ITask } from '../../../../models/ITask';
import BoardService from '../../../../services/BoardService';
import {
  addTaskItem,
  AppDispatch,
  deleteColumnItem,
  deleteTaskItem,
  moveColumnItem,
  transferTask,
  updateColumnItem,
} from '../../../../store/store';
import { ETAskModalMode } from '../../../../types';
import { getNewOrder } from '../../../../utils/board';
import ModalTaskAdd from '../ModalTask';
import Task from '../Task';

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
  const itemRef = useRef(null);

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
    drop: (dropenTask: IDropTasks) => {
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
            id,
            title: titleCard,
            order,
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
    const user = JSON.parse(localStorage.getItem('user') || '');

    if (user) {
      const result = await BoardService.addTask(
        boardId,
        id,
        title,
        taskList.length + 1,
        descr,
        user.id
      );
      if (result?.status === 201) {
        const item: ITask = {
          id: result.data.id,
          title: result.data.title,
          order: result.data.order,
          boardId: result.data.boardId,
          columnId: result.data.columnId,
          description: result.data.description,
          userId: result.data.userId,
        };
        dispatch(addTaskItem(item));
      }
    }
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

  const dropTask = async (dropTask: ITask) => {
    if (dropTask.columnId !== id) {
      const order = getNewOrder(taskList.length);
      const transferItem = {
        fromColumnId: dropTask.columnId,
        toColumnId: id,
        taskId: dropTask.id,
        newOrder: order,
      };
      const result = await BoardService.transferTask(
        boardId,
        dropTask.columnId,
        id,
        dropTask.id,
        dropTask.title,
        order,
        dropTask.description,
        dropTask.userId
      );
      if (result?.status === 200) {
        dispatch(transferTask(transferItem));
      }
    }
  };

  const showAddTaskDialog = () => {
    setIsShowTaskAdd(true);
  };

  const deleteTask = async (taskId: string) => {
    const result = await BoardService.deleteTask(boardId, id, taskId);
    if (result?.status === 204) {
      const deletedTask = {
        columnId: id,
        taskId: taskId,
      };
      dispatch(deleteTaskItem(deletedTask));
    }
  };

  const deleteColumn = async () => {
    const result = await BoardService.deleteColumn(boardId, id);
    if (result?.status === 204) {
      dispatch(deleteColumnItem(id));
    }
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
          </div>
        )}
      </div>
      <button className={`${cl.columnBtn} ${cl.addButton}`} onClick={showAddTaskDialog}>
        Добавить задачу
      </button>
      <div className={cl.taskListContainer}>
        {taskList.length
          ? taskList.map(({ id, description, title, order, boardId, columnId, userId }, index) => (
              <Task
                key={id}
                title={title}
                id={id}
                description={description}
                order={order}
                boardId={boardId}
                columnId={columnId}
                userId={userId}
                deleteTask={deleteTask}
                reorderTask={requestReorderTask}
              />
            ))
          : null}
      </div>
      <button className={`${cl.columnBtn} ${cl.deleteButton}`} onClick={deleteColumn}>
        Удалить колонку
      </button>
      {isShowTaskAdd ? (
        <ModalTaskAdd mode={ETAskModalMode.ADD} handleClose={handleCloseModal} addTask={addTask} />
      ) : null}
    </div>
  );
};

export default Column;
