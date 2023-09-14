import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosApi} from "../../../axiosApi";

export const getAlbums = createAsyncThunk(
  'albums/albumsByArtis',
  async (id: string) => {
    const request = await axiosApi(`/albums?artist=${id}`);
    return request.data;
  }
);