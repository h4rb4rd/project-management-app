import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { initialState, signUpFormSlice } from '../../store/reducers/SignUpFormSlice';
import Login from './Fields/Login';
import Name from './Fields/Name';
import Password from './Fields/Password';
import PasswordConfirm from './Fields/PasswordConfirm';
import preloader from '../../assets/buttonPreloader.svg';
import { signUp } from '../../store/thunks/AuthThunks';
import { SignUpFormDataType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import cl from './SignUpForm.module.scss';
import { useTranslation } from 'react-i18next';

const SignUpForm = () => {
  const { isPending, error } = useAppSelector((state) => state.AuthReducer);
  const { name, login, password, passwordConfirm } = useAppSelector(
    (state) => state.SignUpFormReducer
  );
  const { setName, setLogin, setPassword, setPasswordConfirm } = signUpFormSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
      name,
      login,
      password,
      passwordConfirm,
    },
  });

  const onSubmit: SubmitHandler<SignUpFormDataType> = ({ name, login, password }) => {
    dispatch(signUp({ name, login, password }));
    dispatch(setName(''));
    dispatch(setLogin(''));
    dispatch(setPassword(''));
    dispatch(setPasswordConfirm(''));
    reset(initialState);
  };

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
    if (formState.errors.passwordConfirm) {
      toast.error(errors.passwordConfirm?.message);
    }
  }, [formState.isSubmitting]);

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
