import React, { useState } from 'react';

import cl from './CardColumn.module.scss';

interface ICardColumn {
  idxCard: number;
  titleCard: string;
}

const CardColumn = ({ titleCard, idxCard }: ICardColumn) => {
  const [title, setTitle] = useState(titleCard || 'Board');
  const [isChangeTitle, setIsChangeTitle] = useState(false);

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
    <div className={cl.cardColumn}>
      <div className={cl.cardHeader}>
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
      <div className="taskList"></div>
    </div>
  );
};

export default CardColumn;
