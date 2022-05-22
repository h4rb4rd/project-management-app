import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

import { authSlice } from '../../../../store/reducers/AuthSlice';
import { RouteNames } from '../../../AppRouter/types';
import { userModalSlice } from '../../../../store/reducers/UserModalSlice';

import cl from './UserModal.module.scss';
import { useTranslation } from 'react-i18next';

const UserModal = () => {
  const { user } = useAppSelector((state) => state.AuthReducer);
  const { isOpen } = useAppSelector((state) => state.UserModalReducer);
  const { setIsOpen } = userModalSlice.actions;
  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const closeModal = () => dispatch(setIsOpen(false));
  const logout = () => {
    dispatch(setIsOpen(false));
    dispatch(setUser(null));
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  const openOptions = () => {
    navigate(RouteNames.ACCOUNT);
    dispatch(setIsOpen(false));
  };

  if (!isOpen) return null;

  return (
    <div className={cl.modal}>
      <p className={cl.title}>{t('userModal.title')}</p>
      <div className={cl.user}>
        <div className={cl.ava}>{user?.name[0]}</div>
        <div className={cl.info}>
          <p>{user?.name}</p>
          <p>{user?.login}</p>
        </div>
      </div>
      <button className={cl.options} onClick={openOptions}>
        {t('userModal.settings')}
      </button>
      <button className={cl.logout} onClick={logout}>
        {t('userModal.logOut')}
      </button>
      <button className={cl.close} onClick={closeModal}>
        &#10006;
      </button>
    </div>
  );
};

export default UserModal;
