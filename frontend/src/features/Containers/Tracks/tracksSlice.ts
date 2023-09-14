import {createSlice} from "@reduxjs/toolkit";
import {getTracks} from "./tracksThunks";
import {ITracksState} from "../../../type";

const initialState: ITracksState = {
  tracks: [],
  tracksLoading: false
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
    builder.addCase(getTracks.pending, state => {
      state.tracksLoading = true;
    });
    builder.addCase(getTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
      state.tracksLoading = false;
    });
    builder.addCase(getTracks.rejected, state => {
      state.tracksLoading = false;
    });

  }
});

export const tracksRouter = TracksSlice.reducer;
export const {resetTracks} = TracksSlice.actions;