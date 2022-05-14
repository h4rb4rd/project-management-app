import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBoardColumn } from '../../models/IBoard';
import { IColumn } from '../../models/IColumns';
import { ITask } from '../../models/ITask';
import { getNewOrder } from '../../utils/board';

interface IInitStateBoard {
  columns: IBoardColumn[];
}

export const initialStateBoard: IInitStateBoard = {
  columns: [],
};

interface IMoveColumnItem {
  dragId: string;
  hoverId: string;
}

interface IMoveTaskItem {
  columnId: string;
  dragId: string;
  hoverId: string;
}

interface ITransferTaskItem {
  fromColumnId: string;
  toColumnId: string;
  taskId: string;
  newOrder: number;
}

interface IDeleteTaskItem {
  columnId: string;
  taskId: string;
}

export const boardSlice = createSlice({
  name: 'board',
  initialState: initialStateBoard,
  reducers: {
    clearStore(state) {
      state.columns.slice(0);
    },
    addItems(state, action: PayloadAction<IBoardColumn[]>) {
      state.columns = [];
      action.payload.forEach((item) => {
        state.columns.push(item);
      });
    },
    moveColumnItem(state, action: PayloadAction<IMoveColumnItem>) {
      const dragIndex = state.columns.findIndex((item) => item.id === action.payload.dragId);
      const hoverIndex = state.columns.findIndex((item) => item.id === action.payload.hoverId);
      const dragItem = state.columns[dragIndex];
      const hoverItem = state.columns[hoverIndex];

      state.columns[dragIndex] = hoverItem;
      state.columns[hoverIndex] = dragItem;
      state.columns.forEach((item, index) => {
        const order = getNewOrder(index);
        console.log('moveColumn', order);
        item.order = order;
      });
    },
    deleteColumnItem(state, action: PayloadAction<string>) {
      const deleteIndex = state.columns.findIndex((item) => item.id === action.payload);
      state.columns.splice(deleteIndex, 1);
    },
    addColumnItem(state, action: PayloadAction<IBoardColumn>) {
      state.columns.push(action.payload);
    },
    updateColumnItem(state, action: PayloadAction<IColumn>) {
      const columnIndex = state.columns.findIndex((item) => item.id === action.payload.id);
      state.columns[columnIndex].title = action.payload.title;
    },
    addTaskItem(state, action: PayloadAction<ITask>) {
      const columnIndex = state.columns.findIndex((item) => item.id === action.payload.columnId);
      state.columns[columnIndex].tasks.push(action.payload);
    },
    moveTaskItem(state, action: PayloadAction<IMoveTaskItem>) {
      const columnIndex = state.columns.findIndex((item) => item.id === action.payload.columnId);
      const dragIndex = state.columns[columnIndex].tasks.findIndex(
        (item) => item.id === action.payload.dragId
      );
      const hoverIndex = state.columns[columnIndex].tasks.findIndex(
        (item) => item.id === action.payload.hoverId
      );
      const dragItem = state.columns[columnIndex].tasks[dragIndex];
      const hoverItem = state.columns[columnIndex].tasks[hoverIndex];

      state.columns[columnIndex].tasks[dragIndex] = hoverItem;
      state.columns[columnIndex].tasks[hoverIndex] = dragItem;
      state.columns[columnIndex].tasks.forEach((item, index) => {
        item.order = getNewOrder(index);
      });
    },
    transferTask(state, action: PayloadAction<ITransferTaskItem>) {
      const fromColumn = state.columns.findIndex((item) => item.id === action.payload.fromColumnId);
      const toColumn = state.columns.findIndex((item) => item.id === action.payload.toColumnId);
      const indexTask = state.columns[fromColumn].tasks.findIndex(
        (item) => item.id === action.payload.taskId
      );
      const task = state.columns[fromColumn].tasks[indexTask];
      task.columnId = action.payload.toColumnId;
      task.order = action.payload.newOrder;
      state.columns[toColumn].tasks.push(task);
      state.columns[fromColumn].tasks.splice(indexTask, 1);
    },
    deleteTaskItem(state, action: PayloadAction<IDeleteTaskItem>) {
      const columnIndex = state.columns.findIndex((item) => item.id === action.payload.columnId);
      const taskIndex = state.columns[columnIndex].tasks.findIndex(
        (item) => item.id === action.payload.taskId
      );
      state.columns[columnIndex].tasks.splice(taskIndex, 1);
    },
    updateTaskItem(state, action: PayloadAction<ITask>) {
      const columnIndex = state.columns.findIndex((item) => item.id === action.payload.columnId);
      const indexTask = state.columns[columnIndex].tasks.findIndex(
        (item) => item.id === action.payload.id
      );
      state.columns[columnIndex].tasks[indexTask].title = action.payload.title;
      state.columns[columnIndex].tasks[indexTask].description = action.payload.description;
    },
  },
});

export default boardSlice.reducer;
