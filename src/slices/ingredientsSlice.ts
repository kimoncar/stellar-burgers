import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IIngredientsState {
  isLoading: boolean;
  error: null | string;
  ingredientsData: TIngredient[];
}

const initialState: IIngredientsState = {
  isLoading: false,
  error: null,
  ingredientsData: []
};

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/get',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as string;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.ingredientsData = action.payload;
      });
  }
});

export default ingredientsSlice;
