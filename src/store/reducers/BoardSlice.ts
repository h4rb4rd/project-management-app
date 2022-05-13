import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../models/IBoard';
import { getBoard, updateBoard } from '../thunks';

interface boardsSlice {
  board: IBoard | null;
  isPending: boolean;
  error: string;
}

const initialState: boardsSlice = {
  board: null,
  isPending: false,
  error: '',
};

export const boardsSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard(state, action: PayloadAction<IBoard>) {
      state.board = action.payload;
    },
  },
  extraReducers: {
    [getBoard.pending.type]: (state) => {
      state.isPending = true;
    },
    [getBoard.fulfilled.type]: (state, action: PayloadAction<IBoard>) => {
      state.isPending = false;
      state.error = '';
      state.board = action.payload;
    },
    [getBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    },
    [updateBoard.pending.type]: (state) => {
      state.isPending = true;
    },
    [updateBoard.fulfilled.type]: (state, action: PayloadAction<IBoard | null>) => {
      state.isPending = false;
      state.error = '';
      state.board = action.payload;
    },
    [updateBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    },
  },
});

export default boardsSlice.reducer;
