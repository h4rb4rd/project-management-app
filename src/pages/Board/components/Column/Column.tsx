import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IColumn } from '../../../../models/IColumns';
import { ITask } from '../../../../models/ITask';
import BoardService from '../../../../services/BoardService';
import ModalTaskAdd from '../ModalTaskAdd.tsx';
import Task from '../Task';

import cl from './Column.module.scss';

// type TTaskList = [{ id: number; task: string }] | undefined;

interface IColumnView extends IColumn {
  boardId: string;
  index: number;
  // startDrag: (column: IColumn) => void;
  moveListItem: (dragId: string, hoverId: string) => void;
  dropColumn: (column1: IColumn, column2: IColumn) => void;
  updateTitle: (column: IColumn) => void;
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
  moveListItem,
  dropColumn,
  updateTitle,
}: IColumnView) => {
  const [titleCard, setTitle] = useState(title || 'column');
  const [isChangeTitle, setIsChangeTitle] = useState(false);
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [isShowTaskAdd, setIsShowTaskAdd] = useState(false);
  const [isRequestTask, setIsRequestTask] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    BoardService.getTasks(boardId, id, setTaskList);
  }, [isRequestTask]);

  const moveTaskItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = taskList[dragIndex];
      const hoverItem = taskList[hoverIndex];

      const tmpTasks = taskList.slice(0);

      // if (tmpTasks) {
      //   tmpTasks[dragIndex] = hoverItem;
      //   tmpTasks[hoverIndex] = dragItem;
      //   setTasks(tmpTasks ? tmpTasks : undefined);
      // }
    },
    [taskList]
  );

  const [{ isDragging }, dragRef] = useDrag({
    type: 'column',
    item: { id, title, order },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // (monitor) => {
    //   const result = { isDragging: monitor.isDragging() };
    //   return result;
    // },
    // begin: () => {
    //   // const columnLoc = {
    //   //   id: id,
    //   //   title: title,
    //   //   order: order,
    //   // };
    //   // startDrag(colum1nLoc);
    // },
  });

  const [spec, dropRef] = useDrop({
    accept: 'column',
    hover: (column: IHoverColumn) => {
      // console.log(index);
      if (column.id !== id) {
        moveListItem(column.id, id);
      }
    },
    drop: (columnDrop: IColumn) => {
      console.log('drop', columnDrop);
      dropColumn(columnDrop, { id, title, order });
    },
  });

  dragRef(itemRef);
  dropRef(itemRef);

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

  const showAddTaskDialog = () => {
    setIsShowTaskAdd(true);
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
      <button className={cl.addButton} onClick={showAddTaskDialog}>
        Добавить задачу
      </button>
      <div className={cl.taskList}>
        {taskList.length
          ? taskList.map(({ id, description, title }, index) => (
              <Task
                key={id}
                title={title}
                // moveListItem={moveListItem}
                id={id}
                descr={description}
                // boardId={boardId}
                // index={index}
                // dropColumn={updateColumnOrder}
                // updateTitle={updateColumnTitle}
              />
            ))
          : null}
      </div>
      {isShowTaskAdd ? <ModalTaskAdd handleClose={handleCloseModal} addTask={addTask} /> : null}
    </div>
  );
};

export default Column;
