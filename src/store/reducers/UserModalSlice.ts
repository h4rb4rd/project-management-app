import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userModalSlice {
  isOpen: boolean;
}

const initialState: userModalSlice = {
  isOpen: false,
};

export const userModalSlice = createSlice({
  name: 'userModal',
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export default userModalSlice.reducer;
