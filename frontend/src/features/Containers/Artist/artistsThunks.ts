import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosApi} from "../../../axiosApi";

export const getArtists = createAsyncThunk(
  'artists/getAll',
  async () => {
    const request = await axiosApi('artists');
    return request.data;
  }
);