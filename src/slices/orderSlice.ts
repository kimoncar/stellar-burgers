import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface IOrderState {
  isLoading: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
  data: TOrder[];
}

const initialState: IOrderState = {
  isLoading: false,
  orderRequest: false,
  orderModalData: null,
  error: null,
  data: []
};

export const createOrder = createAsyncThunk('order/create', (data: string[]) =>
  orderBurgerApi(data)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoading = false;
        state.error = action.error as string;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  }
});

export const { resetOrderModalData } = orderSlice.actions;
export default orderSlice;
