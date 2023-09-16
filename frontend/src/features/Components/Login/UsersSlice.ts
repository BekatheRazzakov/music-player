import {createSlice} from "@reduxjs/toolkit";
import {IUserState} from "../../../type";

const initialState: IUserState = {
  user: null,
  signedUp: false,
  loginFulfilled: false,
  showAlert: false
};

const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearState: (state) => {
        state.user = null;
        localStorage.setItem('user', JSON.stringify({}));
    },
    setLoginFulfilled: (state, action) => {
      state.loginFulfilled = action.payload;
    }
  },
  extraReducers: builder => {}
});

export const userReducer = UsersSlice.reducer;
export const {} = UsersSlice.actions;