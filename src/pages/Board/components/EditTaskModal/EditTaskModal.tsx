import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { TaskFormType } from '../../types';

import cl from './EditTaskModal.module.scss';

interface EditTaskModalProps {
  handleClose: () => void;
  valueTitle?: string;
  valueDescr?: string;
  addTask?: (title: string, descr: string) => void;
  updateTask?: (title: string, descr: string) => void;
}

const EditTaskModal = ({ handleClose, updateTask, valueDescr, valueTitle }: EditTaskModalProps) => {
  const titleRef = useRef<HTMLLabelElement | null>(null);
  const {
    watch,
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
    updateTask?.call(null, titleTask, descrTask);

    reset({
      titleTask: titleTask,
      descrTask: descrTask,
    });

    handleClose();
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
          <label htmlFor="titleEditId" ref={titleRef}>
            {t('editTaskModal.title')}
          </label>
          <input
            {...register('titleTask', {
              required: t('modalTask.titleRequired'),
            })}
            type="text"
            id="titleEditId"
            autoFocus
          />
          <label htmlFor="descrEditId">{t('editTaskModal.description')}</label>
          <textarea
            {...register('descrTask', {
              required: t('modalTask.descriptionRequired'),
            })}
            id="descrEditId"
          />
          <div className={cl.btmFormContainer}>
            <button className={cl.btnOk} type="submit">
              {t('editTaskModal.btnSave')}
            </button>
            <button className={cl.btnOk} onClick={handleClose}>
              {t('editTaskModal.btnClose')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
