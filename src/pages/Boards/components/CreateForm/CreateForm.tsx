import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { boardsSlice } from '../../../../store/reducers/BoardsSlice';
import { createBoard } from '../../../../store/thunks';
import { CreateFormDataType } from '../../../../types';
import Title from './Fields/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

import cl from './CreateForm.module.scss';

const CreateForm = () => {
  const { isPending, error } = useAppSelector((state) => state.BoardsReducer);

  const { setIsModalOpen } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    formState,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateFormDataType>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<CreateFormDataType> = ({ title }) => {
    dispatch(createBoard(title));
    dispatch(setIsModalOpen(false));
    reset();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (formState.errors.title) {
      toast.error(errors.title?.message);
    }
  }, [formState.isSubmitting]);

  return (
    <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cl.title}>{t('createForm.title')}</h2>
      <hr className={cl.selector} />
      <Title register={register} />
      <button className={cl.submit}>
        <span>{t('createForm.btn')}</span>
      </button>
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
    </form>
  );
};

export default CreateForm;
