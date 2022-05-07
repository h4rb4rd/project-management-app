import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthService from '../../services/AuthService';
import { authSlice } from '../../store/reducers/AuthSlice';
import { AxiosErrorDataType, SignUpFormDataType } from '../../types';
import Login from './Fields/Login';
import Name from './Fields/Name';
import Password from './Fields/Password';
import preloader from '../../assets/buttonPreloader.svg';
import { setValueWithExpiry } from '../../utils/storage';
import { useAppDispatch } from '../../hooks/redux';

import cl from './SignUpForm.module.scss';

const SignUpForm = () => {
  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

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
    signUp(name, login, password);
    reset();
  };

  const signUp = async (name: string, login: string, password: string) => {
    setIsLoading(true);
    try {
      const signUpResponse = await AuthService.signUp(name, login, password);
      setValueWithExpiry('userId', signUpResponse.data.id, 3600000);
      dispatch(setUser(signUpResponse.data));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        toast.error(data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      <button className={cl.submit} disabled={isLoading}>
        {isLoading ? (
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
