import { rootReducer } from '../services/store';
import { initialState as ingredientInitialState } from '../slices/ingredientsSlice';
import { initialState as constructorInitialState } from '../slices/constructorSlice';
import { initialState as userInitialState } from '../slices/userSlice';
import { initialState as feedInitialState } from '../slices/feedSlice';
import { initialState as orderInitialState } from '../slices/orderSlice';

describe('Проверка rootReducer', () => {
  test('[#1] - тест корректного начального состояния', () => {
    const initialState = {
      ingredients: ingredientInitialState,
      constructorBurger: constructorInitialState,
      user: userInitialState,
      feed: feedInitialState,
      order: orderInitialState
    };
    
    const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  })
});
