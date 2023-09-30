import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../../axiosApi";
import { IArtist, ICreateArtist } from "../../../type";

export const getArtists = createAsyncThunk("artists/getAll", async () => {
  try {
    const request = await axiosApi("artists");
    return request.data;
  } catch (e) {
    console.log(e);
  }
});

export const createArtist = createAsyncThunk<void, ICreateArtist>(
  "artists/create",
  async (artist: ICreateArtist) => {
    try {
      const itemData = new FormData();
      const keys = Object.keys(artist) as (keyof ICreateArtist)[];

      keys.forEach((key) => {
        const value = artist[key];

        if (value) {
          itemData.append(key, value);
        }
      });

      await axiosApi.post("/artists/", itemData);
    } catch (e) {
      console.log(e);
    }
  },
);
