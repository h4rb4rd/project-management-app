import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface loginFormSlice {
  login: string;
  password: string;
}

export const initialState: loginFormSlice = {
  login: '',
  password: '',
};

export const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

export default loginFormSlice.reducer;
