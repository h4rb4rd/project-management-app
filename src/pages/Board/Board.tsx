import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { IBoardColumn } from '../../models/IBoard';
import BoardService from '../../services/BoardService';
import { addColumnItem, addItems, AppDispatch, clearStore, RootState } from '../../store/store';
import { getNewOrder } from '../../utils/board';
import Preloader from '../Preloader';

import cl from './Board.module.scss';
import Column from './components/Column';
import ModalColumnAdd from './components/ModalColumnAdd';

const Board = () => {
  const dispatch = useDispatch<AppDispatch>();
  const columnList = useSelector(({ boardReducer }: RootState) => boardReducer.columns);
  const boardId = 'aa2c9f91-36f0-4e1c-b177-489c42584bc5';
  const [isShowColumnAdd, setIsShowColumnAdd] = useState(false);
  const [isRequestColumn, setIsRequestColumn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    requestColumnList();
  }, []);

  const requestColumnList = async () => {
    setIsLoading(true);
    const columns = await BoardService.getColumns(boardId);
    if (columns) {
      dispatch(addItems(columns));
    }
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setIsShowColumnAdd(false);
  };

  const addColumn = async (title: string) => {
    const result = await BoardService.addColumn(boardId, title, getNewOrder(columnList.length + 1));
    if (result?.status == 201) {
      const item: IBoardColumn = {
        id: result.data.id,
        title: result.data.title,
        order: result.data.order,
        tasks: [],
      };
      dispatch(addColumnItem(item));
    }
    setIsShowColumnAdd(false);
  };

  const showAddColumnDialog = () => {
    setIsShowColumnAdd(true);
  };

  const requestReorderColumn = async () => {
    columnList.forEach((item) => {
      BoardService.updateColumn(boardId, item.id, item.title, item.order);
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {isLoading ? (
        <Preloader />
      ) : (
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
        </div>
      )}
    </DndProvider>
  );
};

export default Board;
