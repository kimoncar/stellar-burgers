import { describe, test } from "@jest/globals";
import { rootReducer } from '../services/store';
import { initialState as ingredientInitialState } from '../slices/ingredientsSlice';
import { initialState as constructorInitialState } from '../slices/constructorSlice';
import { initialState as userInitialState } from '../slices/userSlice';
import { initialState as feedInitialState } from '../slices/feedSlice';
import { initialState as orderInitialState } from '../slices/orderSlice';

describe('Проверка rootReducer', () => {
  test('[#1] - тест инициализации редьюсера', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  })
});
