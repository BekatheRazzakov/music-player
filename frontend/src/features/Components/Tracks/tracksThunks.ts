import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../../axiosApi";
import { IGetSingleTrackHistory } from "../../../type";

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
