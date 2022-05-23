import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { searchModalSlice } from '../../../../store/reducers/SearchModalSlice';

import cl from './SearchModal.module.scss';

const SearchModal = () => {
  const { isOpen } = useAppSelector((state) => state.SearchModalReducer);
  const { setIsOpen } = searchModalSlice.actions;
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(setIsOpen(false));

  if (!isOpen) return null;

  return (
    <div className={cl.modal}>
      <div className={cl.content}>SearchModal</div>
    </div>
  );
};

export default SearchModal;
