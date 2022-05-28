import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { boardsSlice } from '../../../../store/reducers/BoardsSlice';

import { FormDataType } from '../../../../components/FormUI/types';
import Color from '../../../../components/FormUI/Fields/Color';
import { createBoard } from '../../../../store/thunks/BoardsThunks';
import Title from '../../../../components/FormUI/Fields/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

import cl from './CreateForm.module.scss';

const CreateForm = () => {
  const { error } = useAppSelector((state) => state.BoardsReducer);
  const { t } = useTranslation();
  const {
    formState,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataType>({
    mode: 'onSubmit',
    defaultValues: {
      color: '#0079bf',
    },
  });
  const dispatch = useAppDispatch();

  const { setIsModalOpen, setError } = boardsSlice.actions;

  const onSubmit: SubmitHandler<FormDataType> = ({ title, color }) => {
    dispatch(createBoard(`${title}ʵ${color}`));
    dispatch(setIsModalOpen(false));
    reset();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    dispatch(setError(''));
  }, [error]);

  useEffect(() => {
    if (formState.errors.title) {
      toast.error(errors.title?.message);
    }

    toast.clearWaitingQueue();
  }, [formState.isSubmitting]);

  return (
    <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cl.title}>{t('createForm.title')}</h2>
      <hr className={cl.selector} />
      <Title register={register} />
      <Color register={register} />
      <button className={cl.submit}>
        <span>{t('createForm.btn')}</span>
      </button>
    </form>
  );
};

export default CreateForm;
