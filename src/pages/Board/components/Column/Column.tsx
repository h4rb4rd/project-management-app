import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IColumn } from '../../../../models/IColumns';
import { IDropTasks, ITask } from '../../../../models/ITask';
import BoardService from '../../../../services/BoardService';
import ModalTaskAdd from '../ModalTaskAdd.tsx';
import Task from '../Task';

import cl from './Column.module.scss';

interface IColumnView extends IColumn {
  boardId: string;
  index: number;
  taskList: ITask[];
  updateTaskList: (columnId: string, newTaskList: ITask[]) => void;
  moveListItem: (dragId: string, hoverId: string) => void;
  dropColumn: () => void;
  updateTitle: (column: IColumn) => void;
  requestBoard: () => void;
}

interface IHoverColumn {
  id: string;
}

const Column = ({
  id,
  title,
  order,
  boardId,
  index,
  // startDrag,
  taskList,
  updateTaskList,
  moveListItem,
  dropColumn,
  updateTitle,
  requestBoard,
}: IColumnView) => {
  const [titleCard, setTitle] = useState(title || 'column');
  const [isChangeTitle, setIsChangeTitle] = useState(false);
  // const [taskList, setTaskList] = useState<ITask[]>(taskLst || []);
  const [isShowTaskAdd, setIsShowTaskAdd] = useState(false);
  const [isRequestTask, setIsRequestTask] = useState(false);
  const itemRef = useRef(null);

  // useEffect(() => {
  //   // requestTaskList();
  //   console.log(id);
  // }, [isRequestTask]);

  // const requestTaskList = async () => {
  //   await BoardService.getTasks(boardId, id, setTaskList);
  // };

  const moveTaskItem = useCallback(
    (dragId: string, hoverId: string) => {
      const dragIndex = taskList.findIndex((item) => item.id === dragId);
      const hoverIndex = taskList.findIndex((item) => item.id === hoverId);
      const dragItem = taskList[dragIndex];
      const hoverItem = taskList[hoverIndex];

      // [dragItem.order, hoverItem.order] = [hoverItem.order, dragItem.order];

      const copyList = [...taskList];
      copyList[dragIndex] = hoverItem;
      copyList[hoverIndex] = dragItem;
      // setTaskList(copyList);
      updateTaskList(id, copyList);
    },
    [taskList]
  );

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
        moveListItem(column.id, id);
      }
    },
    drop: (columnDrop: IColumn) => {
      dropColumn();
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

  const handleBlur = () => {
    if (!titleCard.trim()) {
      setTitle(title);
    } else {
      updateTitle({
        id,
        title: titleCard,
        order,
      });
    }
    setIsChangeTitle(false);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleBlur();
    }
  };

  const handleCloseModal = () => {
    setIsShowTaskAdd(false);
  };

  const requestTasks = () => {
    setIsRequestTask(!isRequestTask);
  };

  const addTask = async (title: string, descr: string) => {
    const user = JSON.parse(localStorage.getItem('user') || '');

    if (user) {
      await BoardService.addTask(boardId, id, title, taskList.length + 1, descr, user.id);
    }

    setIsShowTaskAdd(false);
    requestTasks();
  };

  const dropTask = (dropTask: IDropTasks, task?: ITask) => {
    if (dropTask.columnId !== id) {
      console.log('!=');
      dropTask.columnId = id;
      dropTask.deleteTask(dropTask.id);
      dropTask.order = taskList.length + 1;
      taskList.push(dropTask);
      BoardService.addTask(
        boardId,
        id,
        dropTask.title,
        dropTask.order,
        dropTask.description,
        dropTask.userId
      );
      updateTaskList(
        id,
        taskList.map((item, index) => {
          item.order = index + 1;
          return item;
        })
      );
    }
  };

  const showAddTaskDialog = () => {
    setIsShowTaskAdd(true);
  };

  const deleteTask = async (taskId: string) => {
    await BoardService.deleteTask(boardId, id, taskId);
    const listIndex = taskList.findIndex((item) => item.id === taskId);
    taskList.splice(listIndex, 1);
    updateTaskList(id, [...taskList]);
  };

  const deleteColumn = async () => {
    await BoardService.deleteColumn(boardId, id);
    requestBoard();
  };

  return (
    <div ref={itemRef} className={isDragging ? `${cl.column} ${cl.hide}` : cl.column}>
      <div className={cl.columnHeader}>
        {isChangeTitle ? (
          <input
            type="text"
            className={cl.inputTitle}
            value={titleCard}
            onChange={(e) => {
              handleChangeTitle(e);
            }}
            onBlur={handleBlur}
            onKeyDown={onKeyDownHandler}
            autoFocus
          />
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
                moveTaskItem={moveTaskItem}
                id={id}
                description={description}
                order={order}
                boardId={boardId}
                columnId={columnId}
                userId={userId}
                dropTask={dropTask}
                deleteTask={deleteTask}
              />
            ))
          : null}
      </div>
      <button className={`${cl.columnBtn} ${cl.deleteButton}`} onClick={deleteColumn}>
        Удалить колонку
      </button>
      {isShowTaskAdd ? <ModalTaskAdd handleClose={handleCloseModal} addTask={addTask} /> : null}
    </div>
  );
};

export default Column;
