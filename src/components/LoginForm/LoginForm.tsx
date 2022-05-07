import React, { useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthService from '../../services/AuthService';
import { authSlice } from '../../store/reducers/AuthSlice';
import { LoginFormDataType } from '../../types';
import Login from './Fields/Login';
import UserService from '../../services/UserService';
import Password from './Fields/Password';
import { TokenDataType, AxiosErrorDataType } from '../../types';
import { useAppDispatch } from '../../hooks/redux';

import cl from './LoginForm.module.scss';

const LoginForm = () => {
  const { setUser } = authSlice.actions;
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
    signIn(login, password);
    reset();
  };

  const signIn = async (login: string, password: string) => {
    try {
      const signInResponse = await AuthService.signIn(login, password);
      localStorage.setItem('token', signInResponse.data.token);

      const tokenData: TokenDataType = jwt_decode(signInResponse.data.token);
      const userResponse = await UserService.getUser(tokenData.userId);
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      dispatch(setUser(userResponse.data));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        toast.error(data.message);
      }
    }
  };

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
      <button className={cl.submit}>Войти</button>
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
