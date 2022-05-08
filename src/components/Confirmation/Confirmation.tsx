import React from 'react';
import clsx from 'clsx';

import cl from './Confirmation.module.scss';

interface ConfirmationProps {
  text: string;
  confirm: () => void;
  close: () => void;
}
const Confirmation = ({ text, confirm, close }: ConfirmationProps) => {
  return (
    <div className={cl.confirmation}>
      <h2>{text}</h2>
      <div className={cl.buttons}>
        <button className={clsx(cl.button, cl.submit)} onClick={confirm}>
          Да
        </button>
        <button className={clsx(cl.button, cl.reject)} onClick={close}>
          Нет
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
