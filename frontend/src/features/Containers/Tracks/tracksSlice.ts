import {createSlice} from "@reduxjs/toolkit";
import {getTracks} from "./tracksThunks";
import {ITracksState} from "../../../type";

const initialState: ITracksState = {
  tracks: []
};

const TracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    resetTracks: state => {
      state.tracks = [];
    }
  },
  extraReducers: builder => {
    builder.addCase(getTracks.pending, state => {});
    builder.addCase(getTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
    });
    builder.addCase(getTracks.rejected, state => {});

  }
});

export const tracksRouter = TracksSlice.reducer;
export const {resetTracks} = TracksSlice.actions;