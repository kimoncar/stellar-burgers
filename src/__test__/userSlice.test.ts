import { configureStore } from "@reduxjs/toolkit";
import userSlice, { getUserSelector, getUserThunk, initialState, isAuthCheckedSelector, isAuthorizedSelector, IUserState, loginUserThunk, logoutUserThunk, registerUserThunk, updateUserThunk } from "../slices/userSlice";

// Хранилище для тестов
const testStore = () => configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

describe('Проверяем userSlice', () => {
  const testUserData: IUserState  = {
    isLoading: false,
    isAuthorized: false,
    isAuthChecked: false,
    user: {
      email: "lorem@ipsum.li",
      name: "LoremIpsum"
    },
    error: null
  };

  describe('Проверяем исходное состояние', () => {
    it('[#1] - тест исходного состояния', () => {
      const store = testStore();
      expect(store.getState().user).toEqual(initialState);
    });
  });

  describe('Проверяем дополнительные редьюсеры (extraReducers)', () => {
    describe('Проверяем getUserThunk', () => {
      it('[#1] - тест ожидания ответа (getUserThunk.pending)', () => {
        const store = testStore();
        store.dispatch({
          type: getUserThunk.pending.type
        });

        expect(store.getState().user.isLoading).toBeTruthy();
        expect(store.getState().user.error).toBeNull();
      });

      it('[#2] - тест ошибки ответа (getUserThunk.rejected)', () => {
        const store = testStore();
        store.dispatch({
          type: getUserThunk.rejected.type,
          error: { message: 'error' }
        });

        expect(store.getState().user.isLoading).toBeFalsy();
        expect(store.getState().user.isAuthChecked).toBeTruthy();
        expect(store.getState().user.error).toBe('error');
      });

      it('[#3] - тест получения ответа (getUserThunk.fulfilled)', () => {
        const store = testStore();
        store.dispatch({
          type: getUserThunk.fulfilled.type,
          payload: testUserData
        });

        expect(store.getState().user.isLoading).toBeFalsy();
        expect(store.getState().user.isAuthChecked).toBeTruthy();
        expect(store.getState().user.isAuthorized).toBeTruthy();
        expect(store.getState().user.error).toBeNull();
        expect(store.getState().user.user).toEqual(testUserData.user);
      });
    });
    
    describe('Проверяем registerUserThunk', () => {
      it('[#1] - тест ожидания ответа (registerUserThunk.pending)', () => {
        const store = testStore();
        store.dispatch({
          type: registerUserThunk.pending.type
        });

        expect(store.getState().user.isLoading).toBeTruthy();
        expect(store.getState().user.error).toBeNull();
      });

      it('[#2] - тест ошибки ответа (registerUserThunk.rejected)', () => {
        const store = testStore();
        store.dispatch({
          type: registerUserThunk.rejected.type,
          error: { message: 'error' }
        });

        expect(store.getState().user.isLoading).toBeFalsy();
        expect(store.getState().user.error).toBe('error');
      });

      it('[#3] - тест получения ответа (registerUserThunk.fulfilled)', () => {
        const store = testStore();
        store.dispatch({
          type: registerUserThunk.fulfilled.type,
          payload: testUserData
        });

        expect(store.getState().user.isLoading).toBeFalsy();
        expect(store.getState().user.isAuthorized).toBeTruthy();
        expect(store.getState().user.error).toBeNull();
        expect(store.getState().user.user).toEqual(testUserData.user);
      });
    });

    describe('Проверяем loginUserThunk', () => {
      it('[#1] - тест ожидания ответа (loginUserThunk.pending)', () => {
        const store = testStore();
        store.dispatch({
          type: loginUserThunk.pending.type
        });

        expect(store.getState().user.isLoading).toBeTruthy();
        expect(store.getState().user.error).toBeNull();
      });

      it('[#2] - тест ошибки ответа (loginUserThunk.rejected)', () => {
        const store = testStore();
        store.dispatch({
          type: loginUserThunk.rejected.type,
          error: { message: 'error' }
        });

        expect(store.getState().user.isLoading).toBeFalsy();
        expect(store.getState().user.error).toBe('error');
      });

      it('[#3] - тест получения ответа (loginUserThunk.fulfilled)', () => {
        const store = testStore();
        store.dispatch({
          type: loginUserThunk.fulfilled.type,
          payload: testUserData
        });

        expect(store.getState().user.isLoading).toBeFalsy();
        expect(store.getState().user.isAuthorized).toBeTruthy();
        expect(store.getState().user.error).toBeNull();
        expect(store.getState().user.user).toEqual(testUserData.user);
      });
    });

    describe('Проверяем updateUserThunk', () => {
      it('[#1] - тест ожидания ответа (updateUserThunk.pending)', () => {
        const store = testStore();
        store.dispatch({
          type: updateUserThunk.pending.type
        });

        expect(store.getState().user.isLoading).toBeTruthy();
        expect(store.getState().user.error).toBeNull();
      });

      it('[#2] - тест ошибки ответа (updateUserThunk.rejected)', () => {
        const store = testStore();
        store.dispatch({
          type: updateUserThunk.rejected.type,
          error: { message: 'error' }
        });

        expect(store.getState().user.isLoading).toBeFalsy();
        expect(store.getState().user.error).toBe('error');
      });

      it('[#3] - тест получения ответа (updateUserThunk.fulfilled)', () => {
        const store = testStore();
        store.dispatch({
          type: updateUserThunk.fulfilled.type,
          payload: testUserData
        });

        expect(store.getState().user.isLoading).toBeFalsy();
        expect(store.getState().user.isAuthorized).toBeTruthy();
        expect(store.getState().user.error).toBeNull();
        expect(store.getState().user.user).toEqual(testUserData.user);
      });
    });

    describe('Проверяем logoutUserThunk', () => {
      it('[#1] - тест ожидания ответа (logoutUserThunk.pending)', () => {
        const store = testStore();
        store.dispatch({
          type: logoutUserThunk.pending.type
        });

        expect(store.getState().user.isLoading).toBeTruthy();
        expect(store.getState().user.error).toBeNull();
      });

      it('[#2] - тест ошибки ответа (logoutUserThunk.rejected)', () => {
        const store = testStore();
        store.dispatch({
          type: logoutUserThunk.rejected.type,
          error: { message: 'error' }
        });

        expect(store.getState().user.isLoading).toBeFalsy();
        expect(store.getState().user.error).toBe('error');
      });

      it('[#3] - тест получения ответа (logoutUserThunk.fulfilled)', () => {
        const store = testStore();
        store.dispatch({
          type: logoutUserThunk.fulfilled.type,
          payload: testUserData
        });

        expect(store.getState().user.isLoading).toBeFalsy();
        expect(store.getState().user.isAuthorized).toBeFalsy();
        expect(store.getState().user.error).toBeNull();
        expect(store.getState().user.user).toBeNull();
      });
    });
  });

  describe('Проверяем селекторы', () => {
    const store = testStore();
    store.dispatch({
      type: getUserThunk.fulfilled.type,
      payload: testUserData
    });
    
    it('[#1] - тест селектора isAuthorizedSelector', () => {
      expect(isAuthorizedSelector(store.getState())).toBe(!testUserData.isAuthorized);
    });

    it('[#2] - тест селектора isAuthCheckedSelector', () => {
      expect(isAuthCheckedSelector(store.getState())).toBe(!testUserData.isAuthChecked);
    });

    it('[#3] - тест селектора getUserSelector', () => {
      expect(getUserSelector(store.getState())).toEqual(testUserData.user);
    });
  });
});