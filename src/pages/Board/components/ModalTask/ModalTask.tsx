import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

import { TaskFormType } from '../../types';

import cl from './ModalTask.module.scss';

interface IModalTaskAdd {
  handleClose: () => void;
  valueTitle?: string;
  valueDescr?: string;
  addTask?: (title: string, descr: string) => void;
  updateTask?: (title: string, descr: string) => void;
}

const ModalTask = ({ addTask, handleClose, valueDescr, valueTitle }: IModalTaskAdd) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormType>({
    mode: 'onSubmit',
    defaultValues: {
      titleTask: valueTitle,
      descrTask: valueDescr,
    },
  });

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<TaskFormType> = ({ titleTask, descrTask }) => {
    addTask?.call(null, titleTask, descrTask);

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

  return (
    <div className={cl.modal} onClick={handleClose}>
      <div className={cl.formContainer} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{t('modalTask.title')}</h2>
          <input
            {...register('titleTask', {
              required: t('modalTask.titleRequired'),
            })}
            type="text"
            id="idTitleTask"
            autoFocus
          />
          <h2>{t('modalTask.description')}</h2>
          <textarea
            {...register('descrTask', {
              required: t('modalTask.descriptionRequired'),
            })}
            id="idDescrTask"
          />
          <div className={cl.btmFormContainer}>
            <button className={cl.btnOk} type="submit">
              {t('modalTask.btnAdd')}
            </button>
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
    </div>
  );
};

export default ModalTask;
