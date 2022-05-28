import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import { checkIsAuth, deleteUser, signIn, signUp, updateUserData } from '../thunks/AuthThunks';

interface AuthState {
  user: IUser | null;
  isPending: boolean;
  isChanged: boolean;
  isChecking: boolean;
  isSuccess: boolean;
  error: string;
}

const initialState: AuthState = {
  user: null,
  isPending: false,
  isChanged: false,
  isChecking: false,
  isSuccess: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
    setIsChanged(state, action: PayloadAction<boolean>) {
      state.isChanged = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.isSuccess = false;
      state.isPending = true;
    },
    [signIn.fulfilled.type]: (state, action: PayloadAction<IUser | null>) => {
      state.isSuccess = true;
      state.isPending = false;
      state.error = '';
      state.user = action.payload;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isSuccess = false;
      state.isPending = false;
      state.error = action.payload;
    },
    [signUp.pending.type]: (state) => {
      state.isSuccess = false;
      state.isPending = true;
    },
    [signUp.fulfilled.type]: (state, action: PayloadAction<IUser | null>) => {
      state.isSuccess = true;
      state.isPending = false;
      state.error = '';
      state.user = action.payload;
    },
    [signUp.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isSuccess = false;
      state.isPending = false;
      state.error = action.payload;
    },
    [updateUserData.pending.type]: (state) => {
      state.isPending = true;
    },
    [updateUserData.fulfilled.type]: (state, action: PayloadAction<IUser | null>) => {
      state.isPending = false;
      state.isChanged = true;
      state.error = '';
      state.user = action.payload;
    },
    [updateUserData.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    },
    [deleteUser.pending.type]: (state) => {
      state.isPending = true;
    },
    [deleteUser.fulfilled.type]: (state) => {
      state.isPending = false;
      state.error = '';
      state.user = null;
    },
    [deleteUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    },
    [checkIsAuth.pending.type]: (state) => {
      state.isChecking = true;
    },
    [checkIsAuth.fulfilled.type]: (state, action: PayloadAction<IUser | null>) => {
      state.isChecking = false;
      state.error = '';
      state.user = action.payload;
    },
    [checkIsAuth.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isChecking = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
