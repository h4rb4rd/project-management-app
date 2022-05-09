import React, { MouseEventHandler, ReactEventHandler, useEffect } from 'react';
import ReactDOM from 'react-dom';

import cl from './ModalColumnAdd.module.scss';

interface IModalColumnAdd {
  handleClose: () => void;
  addColumn: (title: string) => void;
}

const ModalColumnAdd = ({ addColumn, handleClose }: IModalColumnAdd) => {
  const rootDiv = document.createElement('div');

  useEffect(() => {
    document.body.append(rootDiv);
    return () => {
      document.body.removeChild(rootDiv);
    };
  });

  const handleClickContainer = (e:React.MouseEvent) => {
    e.stopPropagation();
  }

  return ReactDOM.createPortal(
    <div className={cl.modal} onClick={handleClose}>
      <div className={cl.formContainer} onClick={(e) => handleClickContainer(e)}>
        <form action="">
          <input type="text" name="" id="" />
          <div className={cl.btmFormContainer}>
            <button className={`${cl.buttonForm} ${cl.btnCancel}`}>Отмена</button>
            <button className={`${cl.buttonForm} ${cl.btnOk}`}>Добавить</button>
          </div>
        </form>
      </div>
    </div>,
    rootDiv
  );
};

export default ModalColumnAdd;
