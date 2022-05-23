import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBoard, IBoardColumn } from '../../models/IBoard';
import { IColumn } from '../../models/IColumns';
import { ITask } from '../../models/ITask';
import { getNewOrder } from '../../utils/board';
import {
  addColumnItem,
  addTaskItem,
  deleteColumnItem,
  deleteTaskItem,
  getBoard,
  transferTaskItem,
  updateColumnItem,
  updateTaskItem,
} from '../thunks/BoardThunks';

interface IInitStateBoard {
  board: IBoard | null;
  columnList: IBoardColumn[];
  isLoading: boolean;
  error: string;
}

export const initialStateBoard: IInitStateBoard = {
  board: null,
  columnList: [],
  isLoading: false,
  error: '',
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
    moveColumnItem(state, action: PayloadAction<IMoveColumnItem>) {
      const dragIndex = state.columnList.findIndex((item) => item.id === action.payload.dragId);
      const hoverIndex = state.columnList.findIndex((item) => item.id === action.payload.hoverId);
      const dragItem = state.columnList[dragIndex];
      const hoverItem = state.columnList[hoverIndex];

      state.columnList[dragIndex] = hoverItem;
      state.columnList[hoverIndex] = dragItem;
      state.columnList.forEach((item, index) => {
        const order = getNewOrder(index);
        item.order = order;
      });
    },

    moveTaskItem(state, action: PayloadAction<IMoveTaskItem>) {
      const columnIndex = state.columnList.findIndex((item) => item.id === action.payload.columnId);
      const dragIndex = state.columnList[columnIndex].tasks.findIndex(
        (item) => item.id === action.payload.dragId
      );
      const hoverIndex = state.columnList[columnIndex].tasks.findIndex(
        (item) => item.id === action.payload.hoverId
      );
      const dragItem = state.columnList[columnIndex].tasks[dragIndex];
      const hoverItem = state.columnList[columnIndex].tasks[hoverIndex];

      state.columnList[columnIndex].tasks[dragIndex] = hoverItem;
      state.columnList[columnIndex].tasks[hoverIndex] = dragItem;
      state.columnList[columnIndex].tasks.forEach((item, index) => {
        item.order = getNewOrder(index);
      });
    },
  },
  extraReducers: {
    [getBoard.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getBoard.fulfilled.type]: (state, action: PayloadAction<IBoard>) => {
      state.board = action.payload;

      const columns = action.payload.columns;
      columns.sort((column1, column2) => column1.order - column2.order);

      if (columns.length) {
        columns.forEach((column) => {
          const tasks = column.tasks;
          tasks.sort((task1, task2) => task1.order - task2.order);
        });
      }

      state.columnList = columns;
      state.isLoading = false;
      state.error = '';
    },
    [getBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [addColumnItem.pending.type]: (state) => {
      state.error = '';
    },
    [addColumnItem.fulfilled.type]: (state, action: PayloadAction<IBoardColumn>) => {
      state.columnList.push({ ...action.payload, tasks: [] });
    },
    [addColumnItem.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    [deleteColumnItem.pending.type]: (state) => {
      state.error = '';
    },
    [deleteColumnItem.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.columnList = state.columnList.filter((item) => item.id !== action.payload);
    },
    [deleteColumnItem.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    [updateColumnItem.pending.type]: (state) => {
      state.error = '';
    },
    [updateColumnItem.fulfilled.type]: (state, action: PayloadAction<IColumn>) => {
      const columnIndex = state.columnList.findIndex((item) => item.id === action.payload.id);

      state.columnList[columnIndex].title = action.payload.title;
    },
    [updateColumnItem.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    [addTaskItem.pending.type]: (state) => {
      state.error = '';
    },
    [addTaskItem.fulfilled.type]: (state, action: PayloadAction<ITask>) => {
      const columnIndex = state.columnList.findIndex((item) => item.id === action.payload.columnId);
      state.columnList[columnIndex].tasks.push(action.payload);
    },
    [addTaskItem.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    [updateTaskItem.pending.type]: (state) => {
      state.error = '';
    },
    [updateTaskItem.fulfilled.type]: (state, action: PayloadAction<ITask>) => {
      const columnIndex = state.columnList.findIndex((item) => item.id === action.payload.columnId);
      const indexTask = state.columnList[columnIndex].tasks.findIndex(
        (item) => item.id === action.payload.id
      );
      state.columnList[columnIndex].tasks[indexTask].title = action.payload.title;
      state.columnList[columnIndex].tasks[indexTask].description = action.payload.description;
      state.error = '';
    },
    [updateTaskItem.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteTaskItem.pending.type]: (state) => {
      state.error = '';
    },
    [deleteTaskItem.fulfilled.type]: (state, action: PayloadAction<IDeleteTaskItem>) => {
      const columnIndex = state.columnList.findIndex((item) => item.id === action.payload.columnId);
      state.columnList[columnIndex].tasks = state.columnList[columnIndex].tasks.filter(
        (item) => item.id !== action.payload.taskId
      );
    },
    [deleteTaskItem.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [transferTaskItem.pending.type]: (state) => {
      state.error = '';
    },
    [transferTaskItem.fulfilled.type]: (state, action: PayloadAction<ITransferTaskItem>) => {
      const fromColumn = state.columnList.findIndex(
        (item) => item.id === action.payload.fromColumnId
      );
      const toColumn = state.columnList.findIndex((item) => item.id === action.payload.toColumnId);
      const indexTask = state.columnList[fromColumn].tasks.findIndex(
        (item) => item.id === action.payload.taskId
      );
      const task = state.columnList[fromColumn].tasks[indexTask];
      task.columnId = action.payload.toColumnId;
      task.order = action.payload.newOrder;
      state.columnList[toColumn].tasks.push(task);
      state.columnList[fromColumn].tasks.splice(indexTask, 1);
    },
    [transferTaskItem.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default boardSlice.reducer;
