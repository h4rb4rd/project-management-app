import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { authSlice } from '../../store/reducers/AuthSlice';
import { FormDataType } from '../FormUI/types';
import { initialState, loginFormSlice } from '../../store/reducers/LoginFormSlice';
import Login from '../FormUI/Fields/Login';
import Password from '../FormUI/Fields/Password';
import preloader from '../../assets/buttonPreloader.svg';
import { signIn } from '../../store/thunks/AuthThunks';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import cl from './LoginForm.module.scss';

const LoginForm = () => {
  const { isPending, error, isSuccess } = useAppSelector((state) => state.AuthReducer);
  const { login, password } = useAppSelector((state) => state.LoginFormReducer);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { setLogin, setPassword } = loginFormSlice.actions;
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
      login,
      password,
    },
  });

  const onSubmit: SubmitHandler<FormDataType> = ({ login, password }) => {
    dispatch(signIn({ login, password }));
    dispatch(setLogin(''));
    dispatch(setPassword(''));
  };

  useEffect(() => {
    if (isSuccess === true) {
      reset(initialState);
    }
  }, [isSuccess]);

  useEffect(() => {
    const subscription = watch(({ login, password }) => {
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
    if (formState.errors.password) {
      toast.error(errors.password?.message);
    }

    toast.clearWaitingQueue();
  }, [formState.isSubmitting]);

  return (
    <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <Login register={register} />
      <Password register={register} />
      <button className={cl.submit} disabled={isPending}>
        {isPending ? (
          <img className={cl.preloader} src={preloader} alt="preloader" />
        ) : (
          <span>{t('loginForm.button')}</span>
        )}
      </button>
      <hr className={cl.selector} />
      <Link to="/signup">{t('loginForm.signUpAccount')}</Link>
    </form>
  );
};

export default LoginForm;
