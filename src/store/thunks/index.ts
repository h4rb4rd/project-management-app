import { createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import AuthService from '../../services/AuthService';
import { AxiosErrorDataType, TokenDataType } from '../../types';
import { getValueWithExpiry, setValueWithExpiry } from '../../utils/storage';
import UserService from '../../services/UserService';
import BoardsService from '../../services/BoardsService';
import BoardService from '../../services/BoardService';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload: { login: string; password: string }, thunkAPI) => {
    try {
      const response = await AuthService.signIn(payload.login, payload.password);
      setValueWithExpiry('token', response.data.token, 3600000);

      const tokenData: TokenDataType = jwt_decode(response.data.token);
      setValueWithExpiry('userId', tokenData.userId, 3600000);

      const userResponse = await UserService.getUser(tokenData.userId);
      return userResponse.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload: { name: string; login: string; password: string }, thunkAPI) => {
    try {
      const response = await AuthService.signUp(payload.name, payload.login, payload.password);
      setValueWithExpiry('userId', response.data.id, 3600000);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const updateUserData = createAsyncThunk(
  'auth/updateData',
  async (payload: { id: string; name: string; login: string; password: string }, thunkAPI) => {
    try {
      await UserService.updateUser(payload.id, payload.name, payload.login, payload.password);
      const response = await UserService.getUser(payload.id);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const deleteUser = createAsyncThunk('auth/delete', async (id: string, thunkAPI) => {
  try {
    await UserService.deleteUser(id);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;
      return thunkAPI.rejectWithValue(data.message);
    }
  }
});

export const checkIsAuth = createAsyncThunk('auth/check', async (_, thunkAPI) => {
  const userId = getValueWithExpiry('userId');

  if (userId) {
    try {
      const response = await UserService.getUser(userId);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  } else {
    return null;
  }
});

export const getBoards = createAsyncThunk('boards/getBoards', async (_, thunkAPI) => {
  try {
    const response = await BoardsService.getBoards();
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;
      return thunkAPI.rejectWithValue(data.message);
    }
  }
});

export const createBoard = createAsyncThunk('boards/getBoards', async (title: string, thunkAPI) => {
  try {
    await BoardsService.createBoard(title);
    const response = await BoardsService.getBoards();
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;
      return thunkAPI.rejectWithValue(data.message);
    }
  }
});

export const getBoard = createAsyncThunk('boards/getBoard', async (id: string, thunkAPI) => {
  try {
    const response = await BoardsService.getBoard(id);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;
      return thunkAPI.rejectWithValue(data.message);
    }
  }
});

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (id: string, thunkAPI) => {
  try {
    await BoardsService.deleteBoard(id);
    const response = await BoardsService.getBoards();
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;
      return thunkAPI.rejectWithValue(data.message);
    }
  }
});

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      await BoardsService.updateBoard(payload.id, payload.title);
      const response = await BoardsService.getBoards();
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const getColumns = createAsyncThunk(
  'board/getColumns',
  async (boardId: string, thunkAPI) => {
    try {
      const result = await BoardService.getColumns(boardId);
      const datalist = result.data;
      datalist.sort((column1, column2) => column1.order - column2.order);
      if (datalist.length) {
        for (let i = 0; i < datalist.length; i++) {
          const column = datalist[i];
          const resultTask = await BoardService.getTasks(boardId, column.id);
          const dataTaskList = resultTask.data;
          dataTaskList.sort((task1, task2) => task1.order - task2.order);
          datalist[i].tasks = dataTaskList.slice(0);
        }
      }
      return datalist;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

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
      const result = await BoardService.deleteColumn(payload.boardId, payload.columnId);
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
      const result = await BoardService.deleteTask(
        payload.boardId,
        payload.columnId,
        payload.taskId
      );

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
      const result = await BoardService.transferTask(
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
