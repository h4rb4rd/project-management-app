import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import Confirmation from '../../../../components/Confirmation';
import { deleteBoard } from '../../../../store/thunks/BoardsThunks';
import ModalPortal from '../../../../portals/ModalPortal';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { useLocation, useNavigate } from 'react-router-dom';

import cl from './Item.module.scss';

interface ItemProps {
  boardData: string[];
  id: string;
}

const Item = ({ boardData, id }: ItemProps) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const { isPending, error } = useAppSelector((state) => state.BoardsReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const deleteHandler = () => {
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  const handleConfirm = () => {
    dispatch(deleteBoard(id));
    setIsModalActive(false);
  };

  const openBoard = () => {
    navigate(pathname + `/` + id);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={cl.item} key={boardData[0]}>
      <div className={cl.content} onClick={openBoard} style={{ backgroundColor: boardData[1] }}>
        <h2>{boardData[0]}</h2>
      </div>
      <button className={cl.delete} onClick={deleteHandler} disabled={isPending}>
        &#10006;
      </button>
      <ModalPortal isActive={isModalActive} close={closeModal}>
        <Confirmation
          text={t('boardsItem.confirmation')}
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

export default Item;
