import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useClickOutside } from '../../hooks/useClickOutside';

import { userModalSlice } from '../../store/reducers/UserModalSlice';
import UserModal from '../UserModal';

import cl from './UserBar.module.scss';

const UserBar = () => {
  const { user } = useAppSelector((state) => state.AuthReducer);
  const { isOpen } = useAppSelector((state) => state.userModalReducer);
  const { setIsOpen } = userModalSlice.actions;
  const dispatch = useAppDispatch();
  const barRef = useRef(null);

  const toggleModal = () => dispatch(setIsOpen(!isOpen));
  const closeModal = () => dispatch(setIsOpen(false));

  useClickOutside(barRef, closeModal);

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
