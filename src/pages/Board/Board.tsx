import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IBoardColumn } from '../../models/IBoard';
import { IColumn } from '../../models/IColumns';
import { ITask } from '../../models/ITask';
import BoardService from '../../services/BoardService';
import Preloader from '../Preloader';

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    requestColumnList();
    // return () => {
    //   console.log('unmount', columnList);
    //   saveData();
    // };
  }, [isRequestColumn]);

  const requestColumnList = async () => {
    setIsLoading(true);
    await BoardService.getColumns(boardId, setColumnList);
    console.log('mount', columnList);
    setIsLoading(false);
  };

  const saveData = async () => {
    setIsLoading(true);
    // const copyList = columnList.slice(0);
    try {
      const saveList = columnList.slice(0);
      columnList.forEach(async (item) => {
        await BoardService.deleteColumn(boardId, item.id);
      });
      columnList.forEach(async (item) => {
        await BoardService.addColumn(boardId, item.title, item.order);
      });
      BoardService.getColumns(boardId, setColumnList);
      columnList.forEach(async (item) => {
        const saveItem = saveList.find((svItem) => svItem.title === item.title);
        saveItem?.tasks.forEach(async (taskItem) => {
          await BoardService.addTask(
            boardId,
            item.id,
            taskItem.title,
            taskItem.order,
            taskItem.description,
            taskItem.userId
          );
        });
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const requestColumn = () => {
    setIsRequestColumn(!isRequestColumn);
  };

  const updateTaskListColumn = (columnId: string, newTaskList: ITask[]) => {
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
    setColumnList([...columnList]);
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
      {isLoading ? (
        <Preloader />
      ) : (
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
      )}
    </DndProvider>
  );
};

export default Board;
