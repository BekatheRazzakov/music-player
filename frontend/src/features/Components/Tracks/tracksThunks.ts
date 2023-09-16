import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosApi} from "../../../axiosApi";

export const getTracks = createAsyncThunk(
  'tracks/tracksByAlbum',
  async (id: string) => {
    try {
      const request = await axiosApi(`/tracks?album=${id}`);
      return request.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const postTrackToHistory = createAsyncThunk(
  'tracks/newTrackToHistory',
  async ({token, track}: {token: string, track: string}) => {
    try {
      await axiosApi.post('/track_history', { track }, { headers: { 'Authorization': token } });
    } catch (e) {
      console.log(e);
    }
  }
);

export const getTracksByHistory = createAsyncThunk(
  'tracks/getTracksByHistory',
  async (token: string) => {
    try {
      const req = await axiosApi('/track_history', { headers: { 'Authorization': token } });
      return req.data;
    } catch (e) {
      console.log(e);
    }
  }
);