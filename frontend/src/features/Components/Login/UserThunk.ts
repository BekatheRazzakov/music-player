import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosApi} from "../../../axiosApi";
import {ISignUser} from "../../../type";

export const login = createAsyncThunk(
  'user/login',
  async (userData: ISignUser) => {
    try {
      const req = await axiosApi.post('/users/sessions', userData);
      localStorage.setItem('user', JSON.stringify({
        username: userData.username,
        token: req.data.token,
        password: userData.password
      }));
      return req.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async (userData: ISignUser) => {
    try {
      const req = await axiosApi.post('/users', userData);
      return req.data;
    } catch (e) {
      console.log(e);
    }
  }
);