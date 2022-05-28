import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { IBoard } from '../../../../models/IBoard';
import { getBoards } from '../../../../store/thunks/BoardsThunks';
import { RouteNames } from '../../../AppRouter/types';
import { searchModalSlice } from '../../../../store/reducers/SearchModalSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

import cl from './SearchModal.module.scss';

const SearchModal = () => {
  const { boards, error } = useAppSelector((state) => state.BoardsReducer);
  const { isOpen, searchValue } = useAppSelector((state) => state.SearchModalReducer);
  const [filteredBoards, setFilteredBoards] = useState<IBoard[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setIsOpen, setSearchValue } = searchModalSlice.actions;

  const boardClickHandler = (id: string) => {
    dispatch(setIsOpen(false));
    dispatch(setSearchValue(''));
    navigate(RouteNames.BOARDS + `/` + id);
  };

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  useEffect(() => {
    if (searchValue) {
      setFilteredBoards(
        boards.filter(({ title }) =>
          title.split('ʵ')[0].toLowerCase().includes(searchValue.trim().toLowerCase())
        )
      );
    } else {
      setFilteredBoards([]);
    }
  }, [searchValue]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (!isOpen) return null;

  return (
    <div className={cl.modal}>
      <h2 className={cl.title}>{t('searchModal.title')}</h2>
      <div className={cl.content}>
        <h3 className={cl.subtitle}>{t('searchModal.subtitle')}</h3>
        <ul className={cl.boards}>
          {boards.length && filteredBoards.length ? (
            filteredBoards.map(({ id, title }) => (
              <li className={cl.board} key={id} onClick={() => boardClickHandler(id)}>
                <span className={cl.icon} style={{ backgroundColor: title.split('ʵ')[1] }} />
                <span className={cl['board-title']}>{title.split('ʵ')[0]}</span>
              </li>
            ))
          ) : (
            <li className={cl.placeholder}>{t('searchModal.placeholder')}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchModal;
