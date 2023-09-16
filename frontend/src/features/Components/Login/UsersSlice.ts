import {createSlice} from "@reduxjs/toolkit";
import {IUserState} from "../../../type";
import {login, signUp} from "./UserThunk";

const initialState: IUserState = {
  token: '',
  signedUp: false,
  loginFulfilled: false,
  showAlert: false,
  signUpAttempt: false
};

const UsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
        state.token = '';
        localStorage.setItem('user', JSON.stringify({}));
    },
    setLoginFulfilled: (state, action) => {
      state.loginFulfilled = action.payload;
    },
    setAlert: (state, action) => {
      state.showAlert = action.payload;
    },
    resetSignedUp: state => {
      state.signedUp = false;
    },
    resetAttempt: state => {
      state.signUpAttempt = false;
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state) => {
      state.token = '';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        state.loginFulfilled = false;
        state.showAlert = true;
        return localStorage.setItem('user', JSON.stringify({}));
      }
      state.token = action.payload.token;
      state.loginFulfilled = true;
      state.showAlert = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loginFulfilled = false;
      state.showAlert = true;
      localStorage.setItem('user', JSON.stringify({}));
    });

    builder.addCase(signUp.pending, (state) => {
      state.signUpAttempt = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      if (action.payload.error) {
        return;
      }
      state.signedUp = true;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.signedUp = false;
    });
  }
});

export const userReducer = UsersSlice.reducer;
export const {logOut, setLoginFulfilled, setAlert, resetSignedUp, resetAttempt} = UsersSlice.actions;