import { createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import AuthService from '../../services/AuthService';
import { AxiosErrorDataType, TokenDataType } from '../../types';
import { getValueWithExpiry, setValueWithExpiry } from '../../utils/storage';
import UserService from '../../services/UserService';
import BoardsService from '../../services/BoardsService';

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
