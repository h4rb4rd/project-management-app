import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { boardsSlice } from '../../store/reducers/BoardsSlice';
import CreateForm from './components/CreateForm';

import Item from './components/Item';
import ModalPortal from '../../Portals/ModalPortal';
import preloader from '../../assets/buttonPreloader.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import cl from './Boards.module.scss';
import { getBoards } from '../../store/thunks/BoardsThunks';

const Boards = () => {
  const { boards, isModalOpen, isPending, error } = useAppSelector((state) => state.BoardsReducer);
  const { setIsModalOpen } = boardsSlice.actions;
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const createBoard = () => {
    dispatch(setIsModalOpen(true));
  };

  const closeModal = () => {
    dispatch(setIsModalOpen(false));
  };

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={cl.boards}>
      <div className={cl.heading}>
        <h2 className={cl.title}>{t('boards.title')}</h2>
      </div>
      <div className={cl.container}>
        {boards &&
          boards.map(({ title, id }) => <Item key={id} boardData={title.split(',')} id={id} />)}
        <button className={cl.create} onClick={createBoard} disabled={isPending}>
          {isPending ? (
            <img className={cl.preloader} src={preloader} alt="preloader" />
          ) : (
            <span>{t('boards.createBoardBtn')}</span>
          )}
        </button>
      </div>
      <ModalPortal isActive={isModalOpen} close={closeModal}>
        <CreateForm />
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

export default Boards;
