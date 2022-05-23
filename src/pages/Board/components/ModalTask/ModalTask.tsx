import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

import { TAskModalMode, TaskFormType } from '../../types';

import cl from './ModalTask.module.scss';

interface IModalTaskAdd {
  handleClose: () => void;
  mode: TAskModalMode;
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
  } = useForm<TaskFormType>({
    mode: 'onSubmit',
    defaultValues: {
      titleTask: valueTitle,
      descrTask: valueDescr,
    },
  });

  const { t } = useTranslation();

  useEffect(() => {
    document.body.append(rootDiv);
    return () => {
      document.body.removeChild(rootDiv);
    };
  });

  const onSubmit: SubmitHandler<TaskFormType> = ({ titleTask, descrTask }) => {
    if (mode === TAskModalMode.ADD) {
      addTask?.call(null, titleTask, descrTask);
    } else {
      updateTask?.call(null, titleTask, descrTask);
    }

    reset({
      titleTask: '',
      descrTask: '',
    });
  };

  useEffect(() => {
    if (errors.descrTask) {
      toast.error(errors.descrTask.message);
    }
    if (errors.titleTask) {
      toast.error(errors.titleTask.message);
    }
  }, [errors]);

  return ReactDOM.createPortal(
    <div className={cl.modal} onClick={handleClose}>
      <div className={cl.formContainer} onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className={cl.btnCancel}>
          &#10006;
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{t('modalTask.title')}</h2>
          <input
            {...register('titleTask', {
              required: t('modalTask.titleRequired'),
            })}
            type="text"
            id="idTitleTask"
          />
          <h2>{t('modalTask.description')}</h2>
          <textarea
            {...register('descrTask', {
              required: t('modalTask.descriptionRequired'),
            })}
            id="idDescrTask"
          />
          <div className={cl.btmFormContainer}>
            <button className={cl.btnOk}>{t('modalTask.btnAdd')}</button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>,
    rootDiv
  );
};

export default ModalTask;
