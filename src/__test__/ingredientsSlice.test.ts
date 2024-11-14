import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice, { getIngredientsThunk, initialState } from "../slices/ingredientsSlice";

// Хранилище для тестов
const testStore = () => configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer
  }
});

describe('Проверяем ingredientSlice', () => {
  describe('Проверяем исходное состояние', () => {
    it('[#1] - тест исходного состояния', () => {
      const store = testStore();
      expect(store.getState().ingredients).toEqual(initialState);
    });
  });

  describe('Проверяем дополнительные редьюсеры (extraReducers)', () => {
    it('[#1] - тест ожидания ответа (pending)', () => {
      const store = testStore();
      store.dispatch({
        type: getIngredientsThunk.pending.type
      });

      expect(store.getState().ingredients.isLoading).toBeTruthy();
      expect(store.getState().ingredients.error).toBeNull();
    });

    it('[#2] - тест ошибки ответа (rejected)', () => {
      const store = testStore();
      store.dispatch({
        type: getIngredientsThunk.rejected.type,
        error: 'error'
      });

      expect(store.getState().ingredients.isLoading).toBeFalsy();
      expect(store.getState().ingredients.error).toBe('error');
    });

    it('[#3] - тест получения ответа (fulfilled)', () => {
      const testIngredientsData = [
        {
          "_id": "643d69a5c3f7b9001cfa093d",
          "name": "Флюоресцентная булка R2-D3",
          "type": "bun",
          "proteins": 44,
          "fat": 26,
          "carbohydrates": 85,
          "calories": 643,
          "price": 988,
          "image": "https://code.s3.yandex.net/react/code/bun-01.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
          "__v": 0
        },
        {
          "_id": "643d69a5c3f7b9001cfa093e",
          "name": "Филе Люминесцентного тетраодонтимформа",
          "type": "main",
          "proteins": 44,
          "fat": 26,
          "carbohydrates": 85,
          "calories": 643,
          "price": 988,
          "image": "https://code.s3.yandex.net/react/code/meat-03.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
          "__v": 0
        }
      ];

      const store = testStore();
      store.dispatch({
        type: getIngredientsThunk.fulfilled.type,
        payload: testIngredientsData
      });

      expect(store.getState().ingredients.isLoading).toBeFalsy();
      expect(store.getState().ingredients.error).toBeNull();
      expect(store.getState().ingredients.ingredientsData).toEqual(testIngredientsData);
    });
  });
});
