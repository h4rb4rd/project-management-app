import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AppDispatch } from '../../store/store';
import Column from './components/Column';
import EditBoard from './components/EditBoard';
import editImg from '../../assets/edit.svg';
import { getNewOrder } from '../../utils/board';
import ModalPortal from '../../portals/ModalPortal';
import ModalColumnAdd from './components/ModalColumnAdd';
import preloaderImg from '../../assets/preloader.svg';
import { RouteNames } from '../../components/AppRouter/types';
import { useAppSelector } from '../../hooks/redux';
import { addColumnItem, getBoard, updateColumnItem } from '../../store/thunks/BoardThunks';

import cl from './Board.module.scss';

const Board = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, columnList, title, color, isLoading } = useAppSelector(
    (state) => state.BoardReducer
  );

  const params = useParams();
  const [isShowColumnAdd, setIsShowColumnAdd] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const { t } = useTranslation();

  const boardId = params.id || '';

  useEffect(() => {
    dispatch(getBoard(boardId));
  }, [boardId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCloseModal = () => {
    setIsShowColumnAdd(false);
  };

  const addColumn = (title: string) => {
    dispatch(
      addColumnItem({
        boardId,
        titleColumn: title,
        orderColumn: getNewOrder(columnList.length + 1),
      })
    );
    setIsShowColumnAdd(false);
  };

  const showAddColumnDialog = () => {
    setIsShowColumnAdd(true);
  };

  const requestReorderColumn = () => {
    columnList.forEach((item) => {
      dispatch(
        updateColumnItem({
          boardId,
          columnId: item.id,
          titleColumn: item.title,
          orderColumn: item.order,
        })
      );
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cl.board}>
        <div className={cl.heading}>
          <div className={cl.breadcrumbs}>
            <Link to={RouteNames.BOARDS}>{t('board.breadcrumbs')}</Link>
            <span>&#62;</span>
            {isEditable ? (
              <EditBoard
                id={boardId}
                title={title}
                color={color}
                handleClose={() => setIsEditable(false)}
              />
            ) : (
              <h2 className={cl.title}>
                {title}
                <div className={cl.icon} onClick={() => setIsEditable(true)}>
                  <img src={editImg} alt="edit" />
                </div>
              </h2>
            )}
          </div>
          <button className={cl.btnColumnAdd} onClick={showAddColumnDialog}>
            <span className={cl.iconAdd}>+</span>
            <span>{t('board.btnAdd')}</span>
          </button>
        </div>
        {!isLoading ? (
          <div className={cl.boardContainer} style={{ backgroundColor: color }}>
            {columnList.length ? (
              columnList.map(({ id, order, title, tasks }, index) => (
                <Column
                  key={id}
                  order={order}
                  title={title}
                  columnId={id}
                  boardId={boardId}
                  index={index}
                  taskList={tasks}
                  reorderColumn={requestReorderColumn}
                />
              ))
            ) : (
              <span className={cl.placeholder}>{t('board.placeholder')}</span>
            )}
          </div>
        ) : (
          <div className={cl.preloader}>
            <img src={preloaderImg} alt="preloader" />
          </div>
        )}
        <ModalPortal isActive={isShowColumnAdd} close={handleCloseModal}>
          <ModalColumnAdd handleClose={handleCloseModal} addColumn={addColumn} />
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
    </DndProvider>
  );
};

export default Board;
