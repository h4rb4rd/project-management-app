import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface locationSlice {
  location: string;
  isModalOpen: boolean;
}

const initialState: locationSlice = {
  location: 'Ru',
  isModalOpen: false,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
  },
});

export default locationSlice.reducer;
