import React, { MouseEventHandler, ReactEventHandler, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TTaskForm } from '../../../../types';

import cl from '../ModalAdd.module.scss';

interface IModalTaskAdd {
  handleClose: () => void;
  addTask: (title: string, descr: string) => void;
}

const ModalTaskAdd = ({ addTask, handleClose }: IModalTaskAdd) => {
  const rootDiv = document.createElement('div');

  const {
    formState,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<TTaskForm>({
    mode: 'onSubmit',
    defaultValues: {
      titleTask: '',
      descrTask: '',
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

  const onSubmit: SubmitHandler<TTaskForm> = ({ titleTask, descrTask }) => {
    addTask(titleTask, descrTask);
    reset();
  };

  return ReactDOM.createPortal(
    <div className={cl.modal} onClick={handleClose}>
      <div className={cl.formContainer} onClick={(e) => handleClickContainer(e)}>
        <h2>Введите название задачи</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('titleTask', {
              required: 'Поле не может быть пустым',
            })}
            type="text"
            id="idTitleTask"
          />
          <h2>Введите описание</h2>
          <textarea
            {...register('descrTask', {
              required: 'Поле не может быть пустым',
            })}
            id="idDescrTask"
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

export default ModalTaskAdd;
