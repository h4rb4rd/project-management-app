import React from 'react';

import img from '../../assets/success.svg';
import { useAppDispatch } from '../../hooks/redux';
import { authSlice } from '../../store/reducers/AuthSlice';

import cl from './Success.module.scss';

interface SuccessProps {
  text: string;
}
const Success = ({ text }: SuccessProps) => {
  const { setIsChanged } = authSlice.actions;
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(setIsChanged(false));
  };

  return (
    <div className={cl.success}>
      <img src={img} alt="success" />
      <h2>{text}</h2>
      <button onClick={close}>Продолжить</button>
    </div>
  );
};

export default Success;
