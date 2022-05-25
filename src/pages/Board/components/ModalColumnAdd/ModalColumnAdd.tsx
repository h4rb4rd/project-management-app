import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';

import { TitleInputType } from '../../types';

import cl from './ModalColumnAdd.module.scss';

interface IModalColumnAdd {
  handleClose: () => void;
  addColumn: (title: string) => void;
}

const ModalColumnAdd = ({ addColumn, handleClose }: IModalColumnAdd) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm<TitleInputType>({
    mode: 'onSubmit',
    defaultValues: {
      titleColumn: '',
    },
  });

  const onSubmit: SubmitHandler<TitleInputType> = ({ titleColumn }) => {
    addColumn(titleColumn);
    reset();
  };

  useEffect(() => {
    if (errors.titleColumn) {
      toast.error(errors.titleColumn.message);
    }
  }, [errors]);

  return (
    <div className={cl.modal} onClick={handleClose}>
      <div className={cl.formContainer} onClick={(e) => e.stopPropagation()}>
        <h2>{t('board.modalAdd.title')}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('titleColumn', {
              required: 'Название не может быть пустым',
            })}
            type="text"
            id="idTitleColumn"
            autoFocus
          />
          <div className={cl.btmFormContainer}>
            <button className={cl.btnOk}>{t('board.modalAdd.button')}</button>
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

export default ModalColumnAdd;
