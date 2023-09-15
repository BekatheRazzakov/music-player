import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosApi} from "../../../axiosApi";

export const getTracks = createAsyncThunk(
  'tracks/tracksByAlbum',
  async (id: string) => {
    const request = await axiosApi(`/tracks?album=${id}`);
    return request.data;
  }
);