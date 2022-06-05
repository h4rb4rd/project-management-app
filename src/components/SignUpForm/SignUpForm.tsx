import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FormDataType } from '../FormUI/types';
import Name from '../FormUI/Fields/Name';
import Login from '../FormUI/Fields/Login';
import Password from '../FormUI/Fields/Password';
import PasswordConfirm from '../FormUI/Fields/PasswordConfirm';
import preloader from '../../assets/buttonPreloader.svg';
import { signUp } from '../../store/thunks/AuthThunks';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { initialState, signUpFormSlice } from '../../store/reducers/SignUpFormSlice';

import cl from './SignUpForm.module.scss';
import { authSlice } from '../../store/reducers/AuthSlice';

const SignUpForm = () => {
  const { isPending, isSuccess, error } = useAppSelector((state) => state.AuthReducer);
  const { name, login, password, passwordConfirm } = useAppSelector(
    (state) => state.SignUpFormReducer
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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
      name,
      login,
      password,
      passwordConfirm,
    },
  });
  const { setName, setLogin, setPassword, setPasswordConfirm } = signUpFormSlice.actions;
  const { setError } = authSlice.actions;

  const onSubmit: SubmitHandler<FormDataType> = ({ name, login, password }) => {
    dispatch(signUp({ name, login, password }));
    dispatch(setName(''));
    dispatch(setLogin(''));
    dispatch(setPassword(''));
    dispatch(setPasswordConfirm(''));
  };

  useEffect(() => {
    if (isSuccess === true) {
      reset(initialState);
    }
  }, [isSuccess]);

  useEffect(() => {
    const subscription = watch(({ name, login, password, passwordConfirm }) => {
      if (name) dispatch(setName(name));
      if (login) dispatch(setLogin(login));
      if (password) dispatch(setPassword(password));
      if (password) dispatch(setPassword(password));
      if (passwordConfirm) dispatch(setPasswordConfirm(passwordConfirm));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (formState.errors.name) {
      toast.error(errors.name?.message);
    }
    if (formState.errors.login) {
      toast.error(errors.login?.message);
    }
    if (formState.errors.password) {
      toast.error(errors.password?.message);
    }
    if (formState.errors.passwordConfirm) {
      toast.error(errors.passwordConfirm?.message);
    }

    toast.clearWaitingQueue();
  }, [formState.isSubmitting]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(setError(''));
  }, [error]);

  return (
    <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <Name register={register} />
      <Login register={register} />
      <Password register={register} />
      <PasswordConfirm register={register} watch={watch} />
      <button className={cl.submit} disabled={isPending}>
        {isPending ? (
          <img className={cl.preloader} src={preloader} alt="preloader" />
        ) : (
          <span>{t('signUpForm.button')}</span>
        )}
      </button>
      <hr className={cl.selector} />
      <Link to="/login">{t('signUpForm.signInAccount')}</Link>
    </form>
  );
};

export default SignUpForm;
