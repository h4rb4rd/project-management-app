import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { AxiosErrorDataType } from './types';
import BoardsService from '../../services/BoardsService';
import BoardService from '../../services/BoardService';

export const getBoard = createAsyncThunk('boards/getBoard', async (id: string, thunkAPI) => {
  try {
    const response = await BoardsService.getBoard(id);

    const datalist = response.data.columns;
    datalist.sort((column1, column2) => column1.order - column2.order);

    if (datalist.length) {
      for (let i = 0; i < datalist.length; i++) {
        const column = datalist[i];
        const resultTask = await BoardService.getTasks(id, column.id);
        const dataTaskList = resultTask.data;
        dataTaskList.sort((task1, task2) => task1.order - task2.order);
        datalist[i].tasks = dataTaskList.slice(0);
      }
    }

    return { board: response.data, columns: datalist };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;
      return thunkAPI.rejectWithValue(data.message);
    }
  }
});

export const addColumnItem = createAsyncThunk(
  'board/addColumn',
  async (payload: { boardId: string; titleColumn: string; orderColumn: number }, thunkAPI) => {
    try {
      const result = await BoardService.addColumn(
        payload.boardId,
        payload.titleColumn,
        payload.orderColumn
      );
      return result.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const deleteColumnItem = createAsyncThunk(
  'board/deleteColumn',
  async (payload: { boardId: string; columnId: string }, thunkAPI) => {
    try {
      await BoardService.deleteColumn(payload.boardId, payload.columnId);
      return payload.columnId;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const updateColumnItem = createAsyncThunk(
  'board/updateColumn',
  async (
    payload: { boardId: string; columnId: string; titleColumn: string; orderColumn: number },
    thunkAPI
  ) => {
    try {
      const result = await BoardService.updateColumn(
        payload.boardId,
        payload.columnId,
        payload.titleColumn,
        payload.orderColumn
      );
      return result.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const addTaskItem = createAsyncThunk(
  'column/addTask',
  async (
    payload: {
      boardId: string;
      columnId: string;
      title: string;
      order: number;
      description: string;
      userId: string;
    },
    thunkAPI
  ) => {
    try {
      const result = await BoardService.addTask(
        payload.boardId,
        payload.columnId,
        payload.title,
        payload.order,
        payload.description,
        payload.userId
      );
      return result.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const updateTaskItem = createAsyncThunk(
  'column/updateTask',
  async (
    payload: {
      boardId: string;
      columnId: string;
      taskId: string;
      title: string;
      order: number;
      description: string;
      userId: string;
    },
    thunkAPI
  ) => {
    try {
      const result = await BoardService.updateTask(
        payload.boardId,
        payload.columnId,
        payload.taskId,
        payload.title,
        payload.order,
        payload.description,
        payload.userId
      );
      return result.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const deleteTaskItem = createAsyncThunk(
  'column/deleteTask',
  async (
    payload: {
      boardId: string;
      columnId: string;
      taskId: string;
    },
    thunkAPI
  ) => {
    try {
      await BoardService.deleteTask(payload.boardId, payload.columnId, payload.taskId);
      return { columnId: payload.columnId, taskId: payload.taskId };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const transferTaskItem = createAsyncThunk(
  'column/transferTask',
  async (
    payload: {
      boardId: string;
      columnId: string;
      toColumnId: string;
      taskId: string;
      title: string;
      order: number;
      description: string;
      userId: string;
    },
    thunkAPI
  ) => {
    try {
      await BoardService.transferTask(
        payload.boardId,
        payload.columnId,
        payload.toColumnId,
        payload.taskId,
        payload.title,
        payload.order,
        payload.description,
        payload.userId
      );

      return {
        fromColumnId: payload.columnId,
        toColumnId: payload.toColumnId,
        taskId: payload.taskId,
        newOrder: payload.order,
      };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);
