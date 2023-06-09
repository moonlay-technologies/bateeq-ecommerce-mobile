import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addressData: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddressData: (state, action) => {
      state.addressData = action.payload;
    },
  },
});

export const { setAddressData } = addressSlice.actions;
export default addressSlice.reducer;
