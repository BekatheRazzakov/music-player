import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../../axiosApi";
import { ICreateAlbum } from "../../../type";

export const getAlbums = createAsyncThunk(
  "albums/albumsByArtist",
  async (id: string) => {
    try {
      const request = await axiosApi(`/albums?artist=${id}`);
      return request.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const createAlbum = createAsyncThunk<void, ICreateAlbum>(
  "artists/create",
  async (album: ICreateAlbum) => {
    try {
      const itemData = new FormData();
      const keys = Object.keys(album) as (keyof ICreateAlbum)[];

      keys.forEach((key) => {
        const value = album[key];

        if (value) {
          itemData.append(key, value);
        }
      });

      await axiosApi.post("/albums", itemData);
    } catch (e) {
      console.log(e);
    }
  },
);
