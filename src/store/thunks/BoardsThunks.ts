import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { AxiosErrorDataType } from './types';
import BoardsService from '../../services/BoardsService';

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

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (id: string, thunkAPI) => {
  try {
    await BoardsService.deleteBoard(id);
    return id;
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
