import { configureStore } from "@reduxjs/toolkit";
import orderSlice, { getOrderSelector, getOrderThunk, initialState, isLoadingOrderSelector } from "../slices/orderSlice";

// Хранилище для тестов
const testStore = () => configureStore({
  reducer: {
    order: orderSlice.reducer
  }
});

describe('Проверяем orderSlice', () => {
  const testResponseData = {
    "success": true,
    "orders": [
      {
        "_id": "67371782b27b06001c3e8514",
        "ingredients": [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa093d"
        ],
        "owner": "671a211ad829be001c7785ad",
        "status": "done",
        "name": "Флюоресцентный люминесцентный бургер",
        "createdAt": "2024-11-15T09:42:26.796Z",
        "updatedAt": "2024-11-15T09:42:27.786Z",
        "number": 59471,
        "__v": 0
      }
    ]
  };

  describe('Проверяем исходное состояние', () => {
    it('[#1] - тест исходного состояния', () => {
      const store = testStore();
      expect(store.getState().order).toEqual(initialState);
    });
  });

  describe('Проверяем дополнительные редьюсеры (extraReducers)', () => {
    describe('Проверяем getOrderThunk', () => {
      it('[#1] - тест ожидания ответа (getOrderThunk.pending)', () => {
        const store = testStore();
        store.dispatch({
          type: getOrderThunk.pending.type
        });

        expect(store.getState().order.isLoading).toBeTruthy();
        expect(store.getState().order.error).toBeNull();
      });

      it('[#2] - тест ошибки ответа (getOrderThunk.rejected)', () => {
        const store = testStore();
        store.dispatch({
          type: getOrderThunk.rejected.type,
          error: { message: 'error' }
        });

        expect(store.getState().order.isLoading).toBeFalsy();
        expect(store.getState().order.error).toBe('error');
      });

      it('[#3] - тест получения ответа (getOrderThunk.fulfilled)', () => {
        const store = testStore();
        store.dispatch({
          type: getOrderThunk.fulfilled.type,
          payload: testResponseData
        });

        expect(store.getState().order.isLoading).toBeFalsy();
        expect(store.getState().order.error).toBeNull();
        expect(store.getState().order.order).toEqual(testResponseData.orders[0]);
      });
    });
  });

  describe('Проверяем селекторы', () => {
    const store = testStore();
    store.dispatch({
      type: getOrderThunk.fulfilled.type,
      payload: testResponseData
    });

    it('[#1] - тест селектора getOrderSelector', () => {
      expect(getOrderSelector(store.getState())).toEqual(testResponseData.orders[0]);
    });
    
    it('[#2] - тест селектора isLoadingOrderSelector', () => {
      expect(isLoadingOrderSelector(store.getState())).toBeFalsy();
    });
  });
});