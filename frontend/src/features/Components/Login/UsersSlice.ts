import { createSlice } from "@reduxjs/toolkit";
import { IUsersState } from "../../../type";
import { login, loginWithGoogle, logout, signUp } from "./UserThunk";

const initialState: IUsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  logoutLoading: false,
};

const UsersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.loginError = null;
      state.registerError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.registerLoading = false;
      state.user = payload;
    });
    builder.addCase(signUp.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: userResponse }) => {
      state.loginLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(loginWithGoogle.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(
      loginWithGoogle.fulfilled,
      (state, { payload: userResponse }) => {
        state.loginLoading = false;
        state.user = userResponse.user;
      },
    );
    builder.addCase(loginWithGoogle.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutLoading = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutLoading = false;
    });
  },
});

export const userReducer = UsersSlice.reducer;
export const { resetErrors } = UsersSlice.actions;
