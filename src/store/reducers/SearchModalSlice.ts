import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface searchModalSlice {
  isOpen: boolean;
  searchValue: string;
}

const initialState: searchModalSlice = {
  isOpen: false,
  searchValue: '',
};

export const searchModalSlice = createSlice({
  name: 'searchModal',
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export default searchModalSlice.reducer;
