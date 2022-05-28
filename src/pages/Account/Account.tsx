import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import AccountForm from '../../components/AccountForm';
import Confirmation from '../../components/Confirmation';
import { deleteUser } from '../../store/thunks/AuthThunks';
import img from '../../assets/account.svg';
import ModalPortal from '../../portals/ModalPortal';
import preloader from '../../assets/buttonPreloader.svg';
import Success from '../../components/Success';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import cl from './Account.module.scss';

const Account = () => {
  const { user, isChanged, isPending, error } = useAppSelector((state) => state.AuthReducer);
  const [isModalActive, setIsModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const deleteAccount = () => {
    setIsModalActive(true);
  };

  const handleConfirm = () => {
    if (user) {
      dispatch(deleteUser(user.id));
    }
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={cl.account}>
      <div className={cl.container}>
        <img className={cl.bg} src={img} alt="form-img" />
        <h2>{t('userSettings.title')}</h2>
        <hr className={cl.selector} />
        {!isChanged ? <AccountForm /> : <Success text={t('userSettings.successText')} />}
        <p className={cl.or}>{t('userSettings.or')}</p>
        <button className={cl.delete} disabled={isPending} onClick={deleteAccount}>
          {isPending ? (
            <img className={cl.preloader} src={preloader} alt="preloader" />
          ) : (
            <span>{t('userSettings.deleteBtn')}</span>
          )}
        </button>
      </div>
      <ModalPortal isActive={isModalActive} close={closeModal}>
        <Confirmation
          text={t('userSettings.confirmText')}
          confirm={handleConfirm}
          close={closeModal}
        />
      </ModalPortal>
    </div>
  );
};

export default Account;
