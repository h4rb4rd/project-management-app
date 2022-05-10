import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IColumn } from '../../models/IColumns';
import BoardService from '../../services/BoardService';

import cl from './Board.module.scss';
import Column from './components/Column';
import ModalColumnAdd from './components/ModalColumnAdd';

{
  /* <Route path="board" element={<Board />} /> */
  //   {
  //     "title": "Homework tasks",
  //     "id": "aa2c9f91-36f0-4e1c-b177-489c42584bc5"
  // }
}

const Board = () => {
  const [columnList, setColumnList] = useState<IColumn[]>([]);
  const boardId = 'aa2c9f91-36f0-4e1c-b177-489c42584bc5';
  // BoardService.getColumns('aa2c9f91-36f0-4e1c-b177-489c42584bc5');
  const [isShowColumnAdd, setIsShowColumnAdd] = useState(false);
  const [isRequestColumn, setIsRequestColumn] = useState(false);

  useEffect(() => {
    BoardService.getColumns(boardId, setColumnList);
  }, [isRequestColumn]);

  const requestColumn = () => {
    setIsRequestColumn(!isRequestColumn);
  };

  const moveListItem = useCallback(
    (dragId: string, hoverId: string) => {
      const dragIndex = columnList.findIndex((item) => item.id === dragId);
      const hoverIndex = columnList.findIndex((item) => item.id === hoverId);
      const dragItem = columnList[dragIndex];
      const hoverItem = columnList[hoverIndex];

      // [dragItem.order, hoverItem.order] = [hoverItem.order, dragItem.order];

      const copyList = [...columnList];
      copyList[dragIndex] = hoverItem;
      copyList[hoverIndex] = dragItem;
      setColumnList(copyList);
    },
    [columnList]
  );

  const updateColumnOrder = useCallback(
    async (column1: IColumn, column2: IColumn) => {
      // console.log('upd', column1);
      // await BoardService.updateColumn(boardId, column1.id, column1.title, columnList.length + 1);
      // await BoardService.updateColumn(boardId, column2.id, column2.title, column2.order);
      // await BoardService.updateColumn(boardId, column1.id, column1.title, column1.order);
      // requestColumn();
      columnList.forEach((item, index) => {
        item.order = index + 1;
      });
      console.log('drop', columnList);
    },
    [columnList]
  );

  const updateColumnTitle = async (column: IColumn) => {
    await BoardService.updateColumn(boardId, column.id, column.title, column.order);
    requestColumn();
  };

  const handleCloseModal = () => {
    setIsShowColumnAdd(false);
  };

  const addColumn = async (title: string) => {
    await BoardService.addColumn(boardId, title, columnList.length + 1);
    await BoardService.getColumns(boardId, setColumnList);
    setIsShowColumnAdd(false);
    requestColumn();
  };

  const showAddColumnDialog = () => {
    setIsShowColumnAdd(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cl.board}>
        <div className={cl.boardBtnContainer}>
          <button className={cl.btnColumnAdd} onClick={showAddColumnDialog}>
            Column Add
          </button>
        </div>
        <div className={cl.boardContainer}>
          {/* <div className="boardColumns"> */}
          {columnList.length
            ? columnList.map(({ id, order, title }, index) => (
                <Column
                  key={id}
                  order={order}
                  title={title}
                  moveListItem={moveListItem}
                  id={id}
                  boardId={boardId}
                  index={index}
                  dropColumn={updateColumnOrder}
                  updateTitle={updateColumnTitle}
                />
              ))
            : null}
          {/* </div> */}
        </div>
        {isShowColumnAdd ? (
          <ModalColumnAdd handleClose={handleCloseModal} addColumn={addColumn} />
        ) : null}
      </div>
    </DndProvider>
  );
};

export default Board;
