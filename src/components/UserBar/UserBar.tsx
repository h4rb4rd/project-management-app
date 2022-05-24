import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { useClickOutside } from '../../hooks/useClickOutside';
import { userModalSlice } from '../../store/reducers/UserModalSlice';
import UserModal from './components/UserModal';

import cl from './UserBar.module.scss';

const UserBar = () => {
  const { user } = useAppSelector((state) => state.AuthReducer);
  const { isOpen } = useAppSelector((state) => state.UserModalReducer);
  const dispatch = useAppDispatch();
  const barRef = useRef(null);
  const { setIsOpen } = userModalSlice.actions;
  const token = localStorage.getItem('token');

  const toggleModal = () => dispatch(setIsOpen(!isOpen));
  const closeModal = () => dispatch(setIsOpen(false));

  useClickOutside(barRef, closeModal);

  if (!token) {
    return null;
  }

  return (
    <div ref={barRef}>
      <button className={cl.userbar} onClick={toggleModal}>
        <span>{user?.name[0]}</span>
      </button>
      <UserModal />
    </div>
  );
};

export default UserBar;
