import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

export interface IConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  isLoading: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: [],
  isLoading: false,
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const createOrder = createAsyncThunk('order/create', (data: string[]) =>
  orderBurgerApi(data)
);

const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({
          ...action.payload,
          id: nanoid()
        });
      }
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveUp: (state, action) => {
      const index = action.payload;
      [state.ingredients[index], state.ingredients[index - 1]] = [
        state.ingredients[index - 1],
        state.ingredients[index]
      ];
    },
    moveDown: (state, action) => {
      const index = action.payload;
      [state.ingredients[index], state.ingredients[index + 1]] = [
        state.ingredients[index + 1],
        state.ingredients[index]
      ];
    },
    nulledOrderModalData: (state) => {
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
        state.bun = null;
        state.ingredients = [];
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveUp,
  moveDown,
  nulledOrderModalData
} = constructorSlice.actions;
export default constructorSlice;
