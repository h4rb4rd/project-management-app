import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoginFormDataType } from '../../types';
import Login from './Fields/Login';
import Password from './Fields/Password';
import preloader from '../../assets/buttonPreloader.svg';
import { signIn } from '../../store/thunks';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import cl from './LoginForm.module.scss';

const LoginForm = () => {
  const { isPending, error } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();

  const {
    formState,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormDataType>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<LoginFormDataType> = ({ login, password }) => {
    dispatch(signIn({ login, password }));
    reset();
  };

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
          <span>Войти</span>
        )}
      </button>
      <hr className={cl.selector} />
      <Link to="/signup">Зарегистрировать аккаунт</Link>
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
