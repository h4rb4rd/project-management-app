import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface signUpFormSlice {
  name: string;
  login: string;
  password: string;
}

export const initialState: signUpFormSlice = {
  name: '',
  login: '',
  password: '',
};

export const signUpFormSlice = createSlice({
  name: 'signUpForm',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

export default signUpFormSlice.reducer;
