import React, { MouseEventHandler, ReactEventHandler, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ETAskModalMode, TTaskForm } from '../../../../types';

import cl from '../ModalAdd.module.scss';

interface IModalTaskAdd {
  handleClose: () => void;
  mode: ETAskModalMode;
  valueTitle?: string;
  valueDescr?: string;
  addTask?: (title: string, descr: string) => void;
  updateTask?: (title: string, descr: string) => void;
}

const ModalTask = ({
  addTask,
  handleClose,
  mode,
  updateTask,
  valueDescr,
  valueTitle,
}: IModalTaskAdd) => {
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
      titleTask: valueTitle,
      descrTask: valueDescr,
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
    // addTask?(titleTask, descrTask);
    if (mode === ETAskModalMode.ADD) {
      addTask?.call(null, titleTask, descrTask);
    } else {
      updateTask?.call(null, titleTask, descrTask);
    }

    reset({
      titleTask: '',
      descrTask: '',
    });
  };

  return ReactDOM.createPortal(
    <div className={cl.modal} onClick={handleClose}>
      <div className={cl.formContainer} onClick={(e) => handleClickContainer(e)}>
        <button onClick={handleClose} className={`${cl.buttonForm} ${cl.btnCancel}`}>
          &#10006;
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Введите название задачи</h2>
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
            <button className={`${cl.buttonForm} ${cl.btnOk}`}>{mode}</button>
          </div>
        </form>
      </div>
    </div>,
    rootDiv
  );
};

export default ModalTask;
