import React from 'react';
import { useTranslation } from 'react-i18next';

import { authSlice } from '../../store/reducers/AuthSlice';
import img from '../../assets/success.svg';
import { useAppDispatch } from '../../hooks/redux';

import cl from './Success.module.scss';

interface SuccessProps {
  text: string;
}
const Success = ({ text }: SuccessProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { setIsChanged } = authSlice.actions;

  const close = () => {
    dispatch(setIsChanged(false));
  };

  return (
    <div className={cl.success}>
      <img src={img} alt="success" />
      <h2>{text}</h2>
      <button onClick={close}>{t('success.btn')}</button>
    </div>
  );
};

export default Success;
