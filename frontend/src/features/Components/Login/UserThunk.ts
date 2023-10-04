import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../../axiosApi";
import {
  GlobalError,
  ILoginUser,
  ISignUser,
  IUser,
  RegisterResponse,
  ValidationError,
} from "../../../type";
import { isAxiosError } from "axios";

export const signUp = createAsyncThunk<
  IUser,
  ISignUser,
  { rejectValue: ValidationError }
>("users/signUp", async (registerMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(registerMutation) as (keyof ISignUser)[];

    keys.forEach((key) => {
      const value = registerMutation[key];

      if (value) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.post<IUser>("/users", formData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const login = createAsyncThunk<
  RegisterResponse,
  ILoginUser,
  { rejectValue: GlobalError }
>("users/login", async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>(
      "/users/sessions",
      loginMutation,
    );
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const loginWithGoogle = createAsyncThunk<
  RegisterResponse,
  string,
  { rejectValue: GlobalError }
>("users/loginWithGoogle", async (credential, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>("/users/google", {
      credential,
    });
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const logout = createAsyncThunk<void, string>(
  "user/logout",
  async () => {
    await axiosApi.delete("/users/sessions");
  },
);
