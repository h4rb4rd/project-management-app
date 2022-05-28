import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { TaskFormType } from '../../types';

import cl from './TaskDetailsModal.module.scss';

interface TaskDetailsModalProps {
  handleClose: () => void;
  valueTitle?: string;
  valueDescr?: string;
  addTask?: (title: string, descr: string) => void;
  updateTask?: (title: string, descr: string) => void;
}

const TaskDetailsModal = ({
  handleClose,
  updateTask,
  valueDescr,
  valueTitle,
}: TaskDetailsModalProps) => {
  const [isEditable, setIsEditable] = useState(false);
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
      titleTask: '',
      descrTask: '',
    });
  };

  useEffect(() => {
    const subscription = watch(({ titleTask }) => {
      if (titleTask) console.log(titleTask);
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  const onClose = () => {
    setIsEditable(false);
    handleClose();
  };

  const onChange = () => {
    setIsEditable(true);
    titleRef.current?.click();
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
            className={clsx(!isEditable && cl.preview)}
            id="titleEditId"
          />
          <label htmlFor="descrEditId">{t('editTaskModal.description')}</label>
          <textarea
            {...register('descrTask', {
              required: t('modalTask.descriptionRequired'),
            })}
            className={clsx(!isEditable && cl.preview)}
            id="descrEditId"
          />
          <div className={cl.btmFormContainer}>
            {isEditable && (
              <>
                <button className={cl.btnOk} type="submit">
                  {t('editTaskModal.btnSave')}
                </button>
                <button className={cl.btnOk} onClick={() => setIsEditable(false)} type="button">
                  {t('editTaskModal.btnCancel')}
                </button>
              </>
            )}
          </div>
        </form>
        <div className={cl.btmFormContainer}>
          {!isEditable && (
            <>
              <button className={cl.btnOk} onClick={onChange} type="button">
                {t('editTaskModal.btnChange')}
              </button>
              <button className={cl.btnOk} onClick={onClose}>
                {t('editTaskModal.btnClose')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
