import React, { useRef } from 'react';

import img from '../../assets/search.svg';
import { searchModalSlice } from '../../store/reducers/SearchModalSlice';
import SearchModal from './components/SearchModal';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import cl from './SearchBar.module.scss';

const SearchBar = () => {
  const { isOpen } = useAppSelector((state) => state.SearchModalReducer);
  const dispatch = useAppDispatch();
  const barRef = useRef(null);
  const { setIsOpen } = searchModalSlice.actions;
  const token = localStorage.getItem('token');

  const toggleModal = () => dispatch(setIsOpen(!isOpen));
  const closeModal = () => dispatch(setIsOpen(false));

  useClickOutside(barRef, closeModal);

  if (!token) {
    return null;
  }

  return (
    <div className={cl.container} ref={barRef}>
      <label className={cl.label} htmlFor="searchBarId">
        <img src={img} alt="search" />
      </label>
      <input
        className={cl.input}
        type="text"
        id="searchBarId"
        placeholder="Поиск"
        onClick={toggleModal}
      />
      <SearchModal />
    </div>
  );
};

export default SearchBar;
