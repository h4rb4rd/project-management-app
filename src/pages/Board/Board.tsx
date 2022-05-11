import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IBoardColumn } from '../../models/IBoard';
import { IColumn } from '../../models/IColumns';
import { ITask } from '../../models/ITask';
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
  const [columnList, setColumnList] = useState<IBoardColumn[]>([]);
  const boardId = 'aa2c9f91-36f0-4e1c-b177-489c42584bc5';
  const [isShowColumnAdd, setIsShowColumnAdd] = useState(false);
  const [isRequestColumn, setIsRequestColumn] = useState(false);

  useEffect(() => {
    requestColumnList();
  }, [isRequestColumn]);

  const requestColumnList = async () => {
    await BoardService.getColumns(boardId, setColumnList);
  };

  const requestColumn = () => {
    setIsRequestColumn(!isRequestColumn);
  };

  const updateTaskListColumn = (columnId: string, newTaskList: ITask[]) => {
    // const copyListColumn = columnList.slice(0);
    // const columnIndex = copyListColumn.findIndex((item) => item.id === columnId);
    // copyListColumn[columnIndex].tasks = newTaskList.slice(0);
    const copyListColumn = columnList.map((item) => {
      if (item.id === columnId) {
        item.tasks = newTaskList.slice(0);
      }
      return item;
    });
    setColumnList([...copyListColumn]);
  };

  const moveListItem = useCallback(
    (dragId: string, hoverId: string) => {
      const dragIndex = columnList.findIndex((item) => item.id === dragId);
      const hoverIndex = columnList.findIndex((item) => item.id === hoverId);
      const dragItem = columnList[dragIndex];
      const hoverItem = columnList[hoverIndex];

      const copyList = [...columnList];
      copyList[dragIndex] = hoverItem;
      copyList[hoverIndex] = dragItem;
      copyList.forEach((item, index) => (item.order = index + 1));
      setColumnList(copyList);
    },
    [columnList]
  );

  const updateColumnOrder = useCallback(() => {
    columnList.forEach((item, index) => {
      item.order = index + 1;
    });
  }, [columnList]);

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
          {columnList.length
            ? columnList.map(({ id, order, title, tasks }, index) => (
                <Column
                  key={id}
                  order={order}
                  title={title}
                  moveListItem={moveListItem}
                  id={id}
                  boardId={boardId}
                  index={index}
                  taskList={tasks}
                  updateTaskList={updateTaskListColumn}
                  dropColumn={updateColumnOrder}
                  updateTitle={updateColumnTitle}
                  requestBoard={requestColumn}
                />
              ))
            : null}
        </div>
        {isShowColumnAdd ? (
          <ModalColumnAdd handleClose={handleCloseModal} addColumn={addColumn} />
        ) : null}
      </div>
    </DndProvider>
  );
};

export default Board;
