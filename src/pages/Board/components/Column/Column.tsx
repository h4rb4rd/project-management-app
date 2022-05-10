import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IColumn } from '../../../../models/IColumns';
import BoardService from '../../../../services/BoardService';

import cl from './Column.module.scss';

type TTaskList = [{ id: number; task: string }] | undefined;

interface IColumnView extends IColumn {
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
  index,
  // startDrag,
  moveListItem,
  dropColumn,
  updateTitle,
}: IColumnView) => {
  const [titleCard, setTitle] = useState(title || 'column');
  const [isChangeTitle, setIsChangeTitle] = useState(false);
  const [tasks, setTasks] = useState([]);
  const itemRef = useRef(null);

  useEffect(() => {}, []);

  const moveTaskItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = tasks![dragIndex];
      const hoverItem = tasks![hoverIndex];

      const tmpTasks = tasks?.slice(0);

      // if (tmpTasks) {
      //   tmpTasks[dragIndex] = hoverItem;
      //   tmpTasks[hoverIndex] = dragItem;
      //   setTasks(tmpTasks ? tmpTasks : undefined);
      // }
    },
    [tasks]
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
        <button className={cl.addButton}>+</button>
      </div>
      <div className={cl.taskList}></div>
    </div>
  );
};

export default Column;
