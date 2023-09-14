import {createSlice} from "@reduxjs/toolkit";

const initialState = {};

const TracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: builder => {}
});

export const tracksRouter = TracksSlice.reducer;
export const {} = TracksSlice.actions;