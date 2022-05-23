import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface searchModalSlice {
  isOpen: boolean;
}

const initialState: searchModalSlice = {
  isOpen: false,
};

export const searchModalSlice = createSlice({
  name: 'searchModal',
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export default searchModalSlice.reducer;
