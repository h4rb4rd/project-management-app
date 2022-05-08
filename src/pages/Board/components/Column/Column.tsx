import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IColumn } from '../../../../models/IColumns';

import cl from './Column.module.scss';

type TTaskList = [{ id: number; task: string }] | undefined;

interface IColumnView extends IColumn {
  moveListItem: (dragIndex: number, hoverIndex: number) => void;
}

const Column = ({ id, title, order, moveListItem }: IColumnView) => {
  const [titleCard, setTitle] = useState(title || 'Board');
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

  const [{ isDragging, handlerId }, dragRef] = useDrag({
    type: 'item',
    item: { order },
    collect: (monitor) => {
      const result = { handlerId: monitor.getHandlerId(), isDragging: monitor.isDragging() };
      return result;
    },
  });

  const [spec, dropRef] = useDrop({
    accept: 'item',
    hover({ id: draggedId }: { id: number; tpe: string }) {
      if (draggedId !== order) {
        moveListItem(draggedId, order);
      }
    },
  });

  dragRef(itemRef);
  dropRef(itemRef);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    if (!title.trim()) {
      setTitle(title.trim());
    } else {
      setTitle(title.trim());
    }
    setIsChangeTitle(false);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div ref={itemRef} className={cl.column}>
      <div className={cl.columnHeader}>
        {isChangeTitle ? (
          <input
            type="text"
            className={cl.inputTitle}
            value={title}
            onChange={(e) => {
              handleChangeTitle(e);
            }}
            onBlur={handleBlur}
            onKeyDown={onKeyDownHandler}
            autoFocus
          />
        ) : (
          <div className={cl.titleBoard} onDoubleClick={() => setIsChangeTitle(true)}>
            {title}
          </div>
        )}
        <button className={cl.addButton}>+</button>
      </div>
      <div className={cl.taskList}></div>
    </div>
  );
};

export default Column;
