import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosApi} from "../../../axiosApi";

export const getAlbums = createAsyncThunk(
  'albums/albumsByArtist',
  async (id: string) => {
    try {
      const request = await axiosApi(`/albums?artist=${id}`);
      return request.data;
    } catch (e) {
      console.log(e);
    }
  }
);