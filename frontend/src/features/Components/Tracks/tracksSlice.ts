import {createSlice} from "@reduxjs/toolkit";
import {getTracks, getTracksByHistory, postTrackToHistory} from "./tracksThunks";
import {ITracksState} from "../../../type";

const initialState: ITracksState = {
  tracks: [],
  tracksLoading: false,
  album: null,
  tracksHistory: []
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
      state.tracks = action.payload.tracks;
      state.album = action.payload.album;
      state.tracksLoading = false;
    });
    builder.addCase(getTracks.rejected, state => {
      state.tracksLoading = false;
    });

    builder.addCase(postTrackToHistory.pending, state => {});
    builder.addCase(postTrackToHistory.fulfilled, state => {});
    builder.addCase(postTrackToHistory.rejected, state => {});

    builder.addCase(getTracksByHistory.pending, state => {});
    builder.addCase(getTracksByHistory.fulfilled, (state, action) => {
      state.tracksHistory = action.payload;
    });
    builder.addCase(getTracksByHistory.rejected, state => {});
  }
});

export const tracksRouter = TracksSlice.reducer;
export const {resetTracks} = TracksSlice.actions;