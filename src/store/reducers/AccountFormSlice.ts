import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface accountFormSlice {
  name: string;
  login: string;
  password: string;
}

export const initialState: accountFormSlice = {
  name: '',
  login: '',
  password: '',
};

export const accountFormSlice = createSlice({
  name: 'accountForm',
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

export default accountFormSlice.reducer;
