import { createSlice } from "@reduxjs/toolkit";
import {
  getTracks,
  getTracksByHistory,
  postTrackToHistory,
} from "./tracksThunks";
import { ITracksState } from "../../../type";

const initialState: ITracksState = {
  tracks: [],
  currentTracksList: [],
  tracksLoading: false,
  album: null,
  tracksHistory: [],
  historyLoading: false,
  currentTrack: null,
  currentTrackIndex: 0,
  trackChanged: false,
  showPlayer: false,
};

const TracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    resetTracks: (state) => {
      state.tracks = [];
    },
    resetHistory: (state) => {
      state.tracksHistory = [];
    },
    setShowPlayer: (state, action) => {
      state.showPlayer = action.payload;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setCurrentTrackIndex: (state, action) => {
      state.currentTrackIndex = action.payload;
    },
    setTrackChange: (state, action) => {
      state.trackChanged = action.payload;
    },
    setGlobalTracks: (state, action) => {
      state.currentTracksList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTracks.pending, (state) => {
      state.tracksLoading = true;
    });
    builder.addCase(getTracks.fulfilled, (state, action) => {
      state.tracks = action.payload.tracks;
      state.album = action.payload.album;
      state.tracksLoading = false;
    });
    builder.addCase(getTracks.rejected, (state) => {
      state.tracksLoading = false;
    });

    builder.addCase(postTrackToHistory.pending, (state) => {
      state.historyLoading = true;
    });
    builder.addCase(postTrackToHistory.fulfilled, (state) => {
      state.historyLoading = false;
    });
    builder.addCase(postTrackToHistory.rejected, (state) => {
      state.historyLoading = false;
    });

    builder.addCase(getTracksByHistory.pending, (state) => {
      state.historyLoading = true;
    });
    builder.addCase(getTracksByHistory.fulfilled, (state, action) => {
      state.tracksHistory = action.payload;
      state.historyLoading = false;
    });
    builder.addCase(getTracksByHistory.rejected, (state) => {
      state.historyLoading = false;
    });
  },
});

export const tracksRouter = TracksSlice.reducer;
export const {
  resetTracks,
  resetHistory,
  setCurrentTrack,
  setTrackChange,
  setShowPlayer,
  setGlobalTracks,
  setCurrentTrackIndex,
} = TracksSlice.actions;
