import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { IBoardColumn } from '../../models/IBoard';
import BoardService from '../../services/BoardService';
import { AppDispatch, RootState } from '../../store/store';
//addColumnItem,
import { addColumnItem, getColumns, updateColumnItem } from '../../store/thunks';
import { getNewOrder } from '../../utils/board';
import Preloader from '../Preloader';

import cl from './Board.module.scss';
import Column from './components/Column';
import ModalColumnAdd from './components/ModalColumnAdd';

const Board = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, isLoading, columnList } = useSelector((state: RootState) => state.boardReducer);
  const boardId = 'aa2c9f91-36f0-4e1c-b177-489c42584bc5';
  const [isShowColumnAdd, setIsShowColumnAdd] = useState(false);

  useEffect(() => {
    dispatch(getColumns(boardId));
  }, []);

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
    //const result =
    // if (result?.status == 201) {
    //   const item: IBoardColumn = {
    //     id: result.data.id,
    //     title: result.data.title,
    //     order: result.data.order,
    //     tasks: [],
    //   };
    //   dispatch(addColumnItem(item));
    // }
    setIsShowColumnAdd(false);
  };

  const showAddColumnDialog = () => {
    setIsShowColumnAdd(true);
  };

  const requestReorderColumn = () => {
    columnList.forEach((item) => {
      // BoardService.updateColumn(boardId, item.id, item.title, item.order);
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

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cl.board}>
        <div className={cl.boardContainer}>
          {columnList.length
            ? columnList.map(({ id, order, title, tasks }, index) => (
                <Column
                  key={id}
                  order={order}
                  title={title}
                  id={id}
                  boardId={boardId}
                  index={index}
                  taskList={tasks}
                  reorderColumn={requestReorderColumn}
                />
              ))
            : null}
          <button className={cl.btnColumnAdd} onClick={showAddColumnDialog}>
            <span className={cl.iconAdd}>+</span>
            <span>Добавить колонку</span>
          </button>
        </div>
        {isShowColumnAdd ? (
          <ModalColumnAdd handleClose={handleCloseModal} addColumn={addColumn} />
        ) : null}
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
