import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../../axiosApi";
import { ICreateTrack, IGetSingleTrackHistory } from "../../../type";

export const getTracks = createAsyncThunk(
  "tracks/tracksByAlbum",
  async (id: string) => {
    try {
      const request = await axiosApi(`/tracks?album=${id}`);
      return request.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const postTrackToHistory = createAsyncThunk(
  "tracks/newTrackToHistory",
  async ({ token, track }: { token: string; track: string }) => {
    try {
      await axiosApi.post(
        "/track_history",
        { track },
        { headers: { Authorization: token } },
      );
    } catch (e) {
      console.log(e);
    }
  },
);

export const getTracksByHistory = createAsyncThunk<
  IGetSingleTrackHistory[],
  string
>("tracks/getTracksByHistory", async () => {
  try {
    const req = await axiosApi("/track_history");
    return req.data;
  } catch (e) {
    console.log(e);
  }
});

export const createTrack = createAsyncThunk(
  "tracks/create",
  async (track: ICreateTrack) => {
    try {
      await axiosApi.post("/tracks", track);
    } catch (e) {
      console.log(e);
    }
  },
);

export const togglePublishedTrack = createAsyncThunk(
  "tracks/togglePublished",
  async (id: string) => {
    try {
      await axiosApi.patch(`/tracks/${id}/togglePublished`);
    } catch (e) {
      console.log(e);
    }
  },
);

export const deleteTrack = createAsyncThunk(
  "tracks/deleteOne",
  async (id: string) => {
    try {
      await axiosApi.delete(`/tracks/${id}`);
    } catch (e) {
      console.log(e);
    }
  },
);
