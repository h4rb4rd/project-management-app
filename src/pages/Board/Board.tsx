import React, { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IColumn } from '../../models/IColumns';
import BoardService from '../../services/BoardService';

import cl from './Board.module.scss';
import Column from './components/Column';

{
  /* <Route path="board" element={<Board />} /> */
  //   {
  //     "title": "Homework tasks",
  //     "id": "aa2c9f91-36f0-4e1c-b177-489c42584bc5"
  // }
}

const Board = () => {
  const [columnList, setColumnList] = useState<IColumn[]>([]);

  // BoardService.getColumns('aa2c9f91-36f0-4e1c-b177-489c42584bc5');

  const moveListItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = columnList[dragIndex];
      const hoverItem = columnList[hoverIndex];

      setColumnList((items) => {
        const copyList = [...items];

        copyList[dragIndex] = hoverItem;
        copyList[hoverIndex] = dragItem;
        return copyList;
      });
    },
    [columnList]
  );

  return (
    // <DndProvider backend={HTML5Backend}>
    <div className={cl.board}>
      <div className={cl.boardContainer}>
        {/* <div className="boardColumns"> */}
        {columnList.map(({ id, order, title }, index) => (
          <Column key={id} order={order} title={title} moveListItem={moveListItem} id={id} />
        ))}
        {/* </div> */}
      </div>
    </div>
    // </DndProvider>
  );
};

export default Board;
