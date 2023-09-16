import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosApi} from "../../../axiosApi";
import {IUserWithoutToken} from "../../../type";

export const login = createAsyncThunk(
  'user/login',
  async (userData: IUserWithoutToken) => {
    const req = await axiosApi.post('/users/sessions', userData);
    localStorage.setItem('user', JSON.stringify({
      username: userData.username,
      token: req.data.token,
      password: userData.password
    }));
    return req.data;
  }
);