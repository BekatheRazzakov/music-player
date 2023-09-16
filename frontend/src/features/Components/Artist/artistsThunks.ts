import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosApi} from "../../../axiosApi";

export const getArtists = createAsyncThunk(
  'artists/getAll',
  async () => {
    try {
      const request = await axiosApi('artists');
      return request.data;
    } catch (e) {
      console.log(e);
    }
  }
);