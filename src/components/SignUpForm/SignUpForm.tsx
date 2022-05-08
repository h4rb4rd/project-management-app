import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SignUpFormDataType } from '../../types';
import Login from './Fields/Login';
import Name from './Fields/Name';
import Password from './Fields/Password';
import preloader from '../../assets/buttonPreloader.svg';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import cl from './SignUpForm.module.scss';
import { signUp } from '../../store/thunks';

const SignUpForm = () => {
  const { isPending, error } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();

  const {
    formState,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SignUpFormDataType>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<SignUpFormDataType> = ({ name, login, password }) => {
    dispatch(signUp({ name, login, password }));
    reset();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
  }, [formState.isSubmitting]);

  return (
    <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <Name register={register} />
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
      <Link to="/login">Уже есть аккаунт? Войти</Link>
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

export default SignUpForm;
