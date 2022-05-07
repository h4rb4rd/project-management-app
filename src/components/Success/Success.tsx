import React from 'react';

import img from '../../assets/success.svg';

import cl from './Success.module.scss';

interface SuccessProps {
  text: string;
  close: () => void;
}
const Success = ({ text, close }: SuccessProps) => {
  return (
    <div className={cl.success}>
      <img src={img} alt="success" />
      <h2>{text}</h2>
      <button onClick={close}>Продолжить</button>
    </div>
  );
};

export default Success;
