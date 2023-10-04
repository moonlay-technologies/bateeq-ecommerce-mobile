import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customerData: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
    },
  },
});

export const { setCustomerData } = customerSlice.actions;
export default customerSlice.reducer;
