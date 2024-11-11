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
import { deleteCookie, setCookie } from '../utils/cookie';

export interface IUserState {
  isLoading: boolean;
  isAuthorized: boolean;
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: IUserState = {
  isLoading: false,
  isAuthorized: false,
  isAuthChecked: false,
  user: null,
  error: null
};

export const registerUserThunk = createAsyncThunk(
  'user/register',
  registerUserApi
);

export const loginUserThunk = createAsyncThunk('user/login', loginUserApi);

export const forgotPasswordThunk = createAsyncThunk(
  'user/forgotPassword',
  forgotPasswordApi
);

export const resetPasswordThunk = createAsyncThunk(
  'user/resetPassword',
  resetPasswordApi
);

export const updateUserThunk = createAsyncThunk('user/update', updateUserApi);

export const getUserThunk = createAsyncThunk('user/get', getUserApi);
export const logoutUserThunk = createAsyncThunk('user/logout', logoutApi);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    isAuthorizedSelector: (state) => state.isAuthorized,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    getUserSelector: (state) => state.user
  },
  extraReducers: (builder) => {
    builder
      // registerUser
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthorized = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })

      // loginUser
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthorized = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })

      // forgotPassword
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
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
        state.error = action.error.message as string;
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
        state.error = action.error.message as string;
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
        state.isAuthChecked = true;
        state.error = action.error.message as string;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthorized = true;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })

      // logoutUser
      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = null;
        state.isAuthorized = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const { isAuthorizedSelector, getUserSelector, isAuthCheckedSelector } =
  userSlice.selectors;
export default userSlice;
