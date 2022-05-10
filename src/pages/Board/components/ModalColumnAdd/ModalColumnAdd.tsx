import React, { MouseEventHandler, ReactEventHandler, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TTitleInput } from '../../../../types';

import cl from './ModalColumnAdd.module.scss';

interface IModalColumnAdd {
  handleClose: () => void;
  addColumn: (title: string) => void;
}

const ModalColumnAdd = ({ addColumn, handleClose }: IModalColumnAdd) => {
  const rootDiv = document.createElement('div');

  const {
    formState,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<TTitleInput>({
    mode: 'onSubmit',
    defaultValues: {
      titleColumn: '',
    },
  });

  useEffect(() => {
    document.body.append(rootDiv);
    return () => {
      document.body.removeChild(rootDiv);
    };
  });

  const handleClickContainer = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onSubmit: SubmitHandler<TTitleInput> = ({ titleColumn }) => {
    addColumn(titleColumn);
    reset();
  };

  return ReactDOM.createPortal(
    <div className={cl.modal} onClick={handleClose}>
      <div className={cl.formContainer} onClick={(e) => handleClickContainer(e)}>
        <h2>Введите название колонки</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('titleColumn', {
              required: 'Поле не может быть пустым',
            })}
            type="text"
            id="idTitleColumn"
          />
          <div className={cl.btmFormContainer}>
            <button onClick={handleClose} className={`${cl.buttonForm} ${cl.btnCancel}`}>
              Отмена
            </button>
            <button className={`${cl.buttonForm} ${cl.btnOk}`}>Добавить</button>
          </div>
        </form>
      </div>
    </div>,
    rootDiv
  );
};

export default ModalColumnAdd;
