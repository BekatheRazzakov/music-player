import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../../axiosApi";
import { ICreateArtist } from "../../../type";

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

export const togglePublishedArtist = createAsyncThunk(
  "artists/togglePublished",
  async (id: string) => {
    try {
      const request = await axiosApi.patch(`/artists/${id}/togglePublished`);
      return request.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const deleteArtist = createAsyncThunk(
  "artists/deleteOne",
  async (id: string) => {
    try {
      const request = await axiosApi.delete(`/artists/${id}`);
      return request.data;
    } catch (e) {
      console.log(e);
    }
  },
);
