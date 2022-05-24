import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { FormDataType } from '../FormUI/types';
import { initialState, loginFormSlice } from '../../store/reducers/LoginFormSlice';
import Login from '../FormUI/Fields/Login';
import Password from '../FormUI/Fields/Password';
import preloader from '../../assets/buttonPreloader.svg';
import { signIn } from '../../store/thunks/AuthThunks';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import cl from './LoginForm.module.scss';

const LoginForm = () => {
  const { isPending, error } = useAppSelector((state) => state.AuthReducer);
  const { login, password } = useAppSelector((state) => state.LoginFormReducer);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { setLogin, setPassword } = loginFormSlice.actions;

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
    reset(initialState);
  };

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
  }, [error]);

  useEffect(() => {
    if (formState.errors.login) {
      toast.error(errors.login?.message);
    }
    if (formState.errors.password) {
      toast.error(errors.password?.message);
    }
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

export default LoginForm;
