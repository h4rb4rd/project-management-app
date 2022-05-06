import React from 'react';

import cl from './Board.module.scss';
import CardColumn from './components/CardColumn';

{/* <Route path="board" element={<Board />} /> */}

const Board = () => {
  return (
    <div className={cl.board}>
      <div className="boardContainer">
        <div className="boardColumns">
          <div className={cl.column}>
            <CardColumn idxCard={1} titleCard="Title" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
