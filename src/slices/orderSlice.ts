import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface IFeedState {
  isLoading: boolean;
  order: TOrder | null;
  error: string | null;
}

const initialState: IFeedState = {
  isLoading: false,
  order: null,
  error: null
};

export const getOrderThunk = createAsyncThunk('order/order', (data: number) =>
  getOrderByNumberApi(data)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderSelector: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.order = action.payload.orders[0];
      });
  }
});

export const { getOrderSelector } = orderSlice.selectors;
export default orderSlice;
