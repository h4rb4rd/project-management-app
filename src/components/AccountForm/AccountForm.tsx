import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { initialState, accountFormSlice } from '../../store/reducers/AccountFormSlice';
import Login from './Fields/Login';
import Name from './Fields/Name';
import Password from './Fields/Password';
import preloader from '../../assets/buttonPreloader.svg';
import { SignUpFormDataType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUserData } from '../../store/thunks';

import cl from './AccountForm.module.scss';

const AccountForm = () => {
  const { isPending, error } = useAppSelector((state) => state.AuthReducer);
  const { user } = useAppSelector((state) => state.AuthReducer);
  const { name, login, password } = useAppSelector((state) => state.AccountFormReducer);
  const { setName, setLogin, setPassword } = accountFormSlice.actions;

  const dispatch = useAppDispatch();

  const {
    formState,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<SignUpFormDataType>({
    mode: 'onSubmit',
    defaultValues: {
      name: user?.name || name,
      login: user?.login || login,
    },
  });

  const onSubmit: SubmitHandler<SignUpFormDataType> = ({ name, login, password }) => {
    if (user) {
      const id = user.id;
      dispatch(updateUserData({ id, name, login, password }));
    }
    reset(initialState);
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
  }, [error]);

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
      <button className={cl.submit} disabled={isPending}>
        {isPending ? (
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
