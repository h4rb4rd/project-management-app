import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { authSlice } from '../../store/reducers/AuthSlice';
import Confirmation from '../Confirmation';
import { FormDataType } from '../FormUI/types';
import { initialState, accountFormSlice } from '../../store/reducers/AccountFormSlice';
import ModalPortal from '../../portals/ModalPortal';
import Name from '../FormUI/Fields/Name';
import Login from '../FormUI/Fields/Login';
import Password from '../FormUI/Fields/Password';
import preloader from '../../assets/buttonPreloader.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUserData } from '../../store/thunks/AuthThunks';

import cl from './AccountForm.module.scss';

const AccountForm = () => {
  const { isPending, error } = useAppSelector((state) => state.AuthReducer);
  const { user } = useAppSelector((state) => state.AuthReducer);
  const { name, login, password } = useAppSelector((state) => state.AccountFormReducer);
  const dispatch = useAppDispatch();
  const [isModalActive, setIsModalActive] = useState(false);
  const { t } = useTranslation();
  const { setName, setLogin, setPassword } = accountFormSlice.actions;
  const { setError } = authSlice.actions;

  const {
    formState,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormDataType>({
    mode: 'onSubmit',
    defaultValues: {
      name: user?.name,
      login: user?.login,
    },
  });

  const onSubmit: SubmitHandler<FormDataType> = () => {
    setIsModalActive(true);
    reset(initialState);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  const handleConfirm = () => {
    if (user) {
      const id = user.id;
      dispatch(updateUserData({ id, name, login, password }));
    }
    setIsModalActive(false);
  };

  useEffect(() => {
    const subscription = watch(({ name, login, password }) => {
      if (name) dispatch(setName(name));
      if (login) dispatch(setLogin(login));
      if (password) dispatch(setPassword(password));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(setError(''));
  }, [error]);

  useEffect(() => {
    if (formState.errors.login) {
      toast.error(errors.login?.message);
    }
    if (formState.errors.name) {
      toast.error(errors.name?.message);
    }

    toast.clearWaitingQueue();
  }, [formState.isSubmitting]);

  return (
    <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <Name isLabel={true} register={register} />
      <Login isLabel={true} register={register} />
      <Password isLabel={true} register={register} />
      <button className={cl.submit} disabled={isPending}>
        {isPending ? (
          <img className={cl.preloader} src={preloader} alt="preloader" />
        ) : (
          <span>{t('accountForm.btn')}</span>
        )}
      </button>
      <ModalPortal isActive={isModalActive} close={closeModal}>
        <Confirmation
          text={t('accountForm.confirmText')}
          confirm={handleConfirm}
          close={closeModal}
        />
      </ModalPortal>
    </form>
  );
};

export default AccountForm;
