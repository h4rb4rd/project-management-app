import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { authSlice } from '../../store/reducers/AuthSlice';
import { userModalSlice } from '../../store/reducers/UserModalSlice';

import cl from './UserModal.module.scss';

const UserModal = () => {
  const { user } = useAppSelector((state) => state.AuthReducer);
  const { isOpen } = useAppSelector((state) => state.userModalReducer);
  const { setIsOpen } = userModalSlice.actions;
  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(setIsOpen(false));
  const logout = () => {
    dispatch(setIsOpen(false));
    dispatch(setUser(null));
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  if (!isOpen) return null;

  return (
    <div className={cl.modal}>
      <p className={cl.title}>Учетная запись</p>
      <div className={cl.user}>
        <div className={cl.ava}>{user?.name[0]}</div>
        <div className={cl.info}>
          <p>{user?.name}</p>
          <p>{user?.login}</p>
        </div>
      </div>
      <button className={cl.logout} onClick={logout}>
        Выйти
      </button>
      <button className={cl.close} onClick={closeModal}>
        &#10006;
      </button>
    </div>
  );
};

export default UserModal;
