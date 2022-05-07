import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AxiosErrorDataType } from '../../types';
import { authSlice } from '../../store/reducers/AuthSlice';
import { SignUpFormDataType } from '../../types';
import Login from './Fields/Login';
import Name from './Fields/Name';
import UserService from '../../services/UserService';
import Password from './Fields/Password';
import preloader from '../../assets/buttonPreloader.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import cl from './AccountForm.module.scss';

interface AccountFormProps {
  openSuccessWindow: () => void;
}

const AccountForm = ({ openSuccessWindow }: AccountFormProps) => {
  const { user } = useAppSelector((state) => state.AuthReducer);
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
    defaultValues: {
      name: user?.name,
      login: user?.login,
    },
  });

  const onSubmit: SubmitHandler<SignUpFormDataType> = ({ name, login, password }) => {
    updateUserData(name, login, password);
    reset();
  };

  const updateUserData = async (name: string, login: string, password: string) => {
    setIsLoading(true);
    try {
      if (user) {
        await UserService.updateUser(user.id, name, login, password);
        const userResponse = await UserService.getUser(user.id);
        dispatch(setUser(userResponse.data));
        openSuccessWindow();
      }
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        toast.error(data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (formState.errors.login) {
      toast.error(errors.login?.message);
    }
    if (formState.errors.name) {
      toast.error(errors.name?.message);
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
          <span>Сохранить</span>
        )}
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

export default AccountForm;
