import React from 'react';
import clsx from 'clsx';

import cl from './Confirmation.module.scss';
import { useTranslation } from 'react-i18next';

interface ConfirmationProps {
  text: string;
  confirm: () => void;
  close: () => void;
}
const Confirmation = ({ text, confirm, close }: ConfirmationProps) => {
  const { t } = useTranslation();

  return (
    <div className={cl.confirmation}>
      <h2>{text}</h2>
      <div className={cl.buttons}>
        <button className={clsx(cl.button, cl.submit)} onClick={confirm}>
          {t('confirmation.yesBtn')}
        </button>
        <button className={clsx(cl.button, cl.reject)} onClick={close}>
          {t('confirmation.noBtn')}
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
