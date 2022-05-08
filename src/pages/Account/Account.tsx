import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AccountForm from '../../components/AccountForm';
import img from '../../assets/account.svg';
import preloader from '../../assets/buttonPreloader.svg';
import Success from '../../components/Success';

import cl from './Account.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteUser } from '../../store/thunks';
import ModalPortal from '../../Portals/ModalPortal';
import Confirmation from '../../components/Confirmation';

const Account = () => {
  const { user, isChanged, isPending, error } = useAppSelector((state) => state.AuthReducer);
  const [isModalActive, setIsModalActive] = useState(false);

  const dispatch = useAppDispatch();

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
        <h2>Редактировать персональные данные</h2>
        <hr className={cl.selector} />
        {!isChanged ? <AccountForm /> : <Success text="Данные были успешно изменены!" />}
        <p className={cl.or}>или</p>
        <button className={cl.delete} disabled={isPending} onClick={deleteAccount}>
          {isPending ? (
            <img className={cl.preloader} src={preloader} alt="preloader" />
          ) : (
            <span>Удалить аккаунт</span>
          )}
        </button>
      </div>
      <ModalPortal isActive={isModalActive} close={closeModal}>
        <Confirmation
          text="Вы действительно хотите удалить аккаунт?"
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
