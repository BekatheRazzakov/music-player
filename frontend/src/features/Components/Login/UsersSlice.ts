import {createSlice} from "@reduxjs/toolkit";
import {IUserState} from "../../../type";
import {login} from "./UserThunk";

const initialState: IUserState = {
  token: '',
  signedUp: false,
  loginFulfilled: false,
  showAlert: false
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
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state) => {});
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginFulfilled = true;
      state.showAlert = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loginFulfilled = false;
      state.showAlert = true;
      localStorage.setItem('user', JSON.stringify({}));
    });
  }
});

export const userReducer = UsersSlice.reducer;
export const {logOut, setLoginFulfilled, setAlert} = UsersSlice.actions;