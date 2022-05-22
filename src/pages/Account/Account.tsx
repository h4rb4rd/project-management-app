import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AccountForm from '../../components/AccountForm';
import img from '../../assets/account.svg';
import preloader from '../../assets/buttonPreloader.svg';
import Success from '../../components/Success';

import cl from './Account.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteUser } from '../../store/thunks/AuthThunks';
import ModalPortal from '../../Portals/ModalPortal';
import Confirmation from '../../components/Confirmation';
import { useTranslation } from 'react-i18next';

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
    </div>
  );
};

export default Account;
