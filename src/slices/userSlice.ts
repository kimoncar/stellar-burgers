import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export interface IUserState {
  isLoading: boolean;
  isAuthorized: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: IUserState = {
  isLoading: false,
  isAuthorized: false,
  user: null,
  error: null
};

export const registerUserThunk = createAsyncThunk(
  'user/register',
  (data: TRegisterData) => registerUserApi(data)
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  (data: TLoginData) => loginUserApi(data)
);

export const forgotPasswordThunk = createAsyncThunk(
  'user/forgotPassword',
  (data: Pick<TLoginData, 'email'>) => forgotPasswordApi(data)
);

export const resetPasswordThunk = createAsyncThunk(
  'user/resetPassword',
  (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const getUserThunk = createAsyncThunk(
  'user/get',
  async () => await getUserApi()
);

export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // registerUser
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as string;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        /** TODO: сохрани токены: refreshToken->localStorage, accessToken->setCookie */
      })

      // loginUser
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as string;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthorized = true;
        state.user = action.payload.user;
        /** TODO: сохрани токены: refreshToken->localStorage, accessToken->setCookie */
      })

      // forgotPassword
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as string;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })

      // resetPassword
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as string;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })

      // updateUser
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as string;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthorized = true;
        state.user = action.payload.user;
      })

      // getUser
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as string;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthorized = true;
        state.user = action.payload.user;
      })

      // logoutUser
      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as string;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = null;
        state.isAuthorized = false;
        /** TODO: удали токены: refreshToken->localStorage, accessToken->setCookie */
      });
  }
});

export default userSlice;