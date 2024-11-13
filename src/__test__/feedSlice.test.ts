import { configureStore } from "@reduxjs/toolkit";
import feedSlice, { getFeedsThunk, getOrdersSelector, getUserOrdersThunk, initialState, isLoadingOrdersSelector } from "../slices/feedSlice";

// Хранилище для тестов
const testStore = () => {
  return configureStore({
    reducer: {
      feed: feedSlice.reducer
    }
  })
};

describe('Проверяем feedSlice', () => {
  describe('Проверяем исходное состояние', () => {
    it('[#1] - тест исходного состояния', () => {
      const store = testStore();
      expect(store.getState().feed).toEqual(initialState);
    });
  });

  describe('Проверяем дополнительные редьюсеры (extraReducers)', () => {
    const testFeedsData = {
      orders: [
        {
          "_id": "6734b792b27b06001c3e7fb3",
          "ingredients": [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0943",
            "643d69a5c3f7b9001cfa0945",
            "643d69a5c3f7b9001cfa093c"
          ],
          "status": "done",
          "name": "Краторный space антарианский бургер",
          "createdAt": "2024-11-13T14:28:34.071Z",
          "updatedAt": "2024-11-13T14:28:34.952Z",
          "number": 59322
        },
        {
          "_id": "6734b347b27b06001c3e7fad",
          "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa093d"
          ],
          "status": "done",
          "name": "Флюоресцентный люминесцентный бургер",
          "createdAt": "2024-11-13T14:10:15.271Z",
          "updatedAt": "2024-11-13T14:10:16.081Z",
          "number": 59321
        },
      ],
      total: 2,
      totalToday: 2,
      loading: false,
      error: null
    };

    describe('Проверяем getFeedsThunk', () => {
      it('[#1] - тест ожидания ответа (getFeedsThunk.pending)', () => {
        const store = testStore();
        store.dispatch({
          type: getFeedsThunk.pending.type
        });

        expect(store.getState().feed.isLoading).toBeTruthy();
        expect(store.getState().feed.error).toBeNull();
        expect(store.getState().feed.total).toBe(0);
        expect(store.getState().feed.totalToday).toBe(0);
      });

      it('[#2] - тест ошибки ответа (getFeedsThunk.rejected)', () => {
        const store = testStore();
        store.dispatch({
          type: getFeedsThunk.rejected.type,
          error: { message: 'error' }
        });

        expect(store.getState().feed.isLoading).toBeFalsy();
        expect(store.getState().feed.error).toBe('error');
        expect(store.getState().feed.total).toBe(0);
        expect(store.getState().feed.totalToday).toBe(0);
      });

      it('[#3] - тест получения ответа (getFeedsThunk.fulfilled)', () => {
        const store = testStore();
        store.dispatch({
          type: getFeedsThunk.fulfilled.type,
          payload: testFeedsData
        });

        expect(store.getState().feed.isLoading).toBeFalsy();
        expect(store.getState().feed.error).toBeNull();
        expect(store.getState().feed.total).toBe(2);
        expect(store.getState().feed.totalToday).toBe(2);
        expect(store.getState().feed.orders).toEqual(testFeedsData.orders);
      });
    });

    describe('Проверяем getUserOrdersThunk', () => {
      it('[#1] - тест ожидания ответа (getUserOrdersThunk.pending)', () => {
        const store = testStore();
        store.dispatch({
          type: getUserOrdersThunk.pending.type
        });

        expect(store.getState().feed.isLoading).toBeTruthy();
        expect(store.getState().feed.error).toBeNull();
        expect(store.getState().feed.total).toBe(0);
        expect(store.getState().feed.totalToday).toBe(0);
      });

      it('[#2] - тест ошибки ответа (getUserOrdersThunk.rejected)', () => {
        const store = testStore();
        store.dispatch({
          type: getUserOrdersThunk.rejected.type,
          error: { message: 'error' }
        });

        expect(store.getState().feed.isLoading).toBeFalsy();
        expect(store.getState().feed.error).toBe('error');
        expect(store.getState().feed.total).toBe(0);
        expect(store.getState().feed.totalToday).toBe(0);
      });

      it('[#3] - тест получения ответа (getUserOrdersThunk.fulfilled)', () => {
        const store = testStore();
        store.dispatch({
          type: getUserOrdersThunk.fulfilled.type,
          payload: testFeedsData
        });

        expect(store.getState().feed.isLoading).toBeFalsy();
        expect(store.getState().feed.error).toBeNull();
        expect(store.getState().feed.total).toBe(0);
        expect(store.getState().feed.totalToday).toBe(0);
        expect(store.getState().feed.orders).toEqual(testFeedsData);    
      });
    });

    describe('Проверяем селекторы', () => {
      const store = testStore();
      testStore().dispatch({
        type: getUserOrdersThunk.fulfilled.type,
        payload: testFeedsData
      });
      
      it('[#1] - тест селектора getOrdersSelector', () => {
        //expect(getOrdersSelector(store.getState())).toEqual(testFeedsData);
        console.log(store.getState());
      });

      /*
      it('[#2] - тест селектора isLoadingOrdersSelector', () => {
        expect(isLoadingOrdersSelector(store.getState())).toEqual(testFeedsData);
      });
      */
    });
  });
});