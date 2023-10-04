import { createSlice } from "@reduxjs/toolkit";
import {
  createArtist,
  deleteArtist,
  getArtists,
  togglePublishedArtist,
} from "./artistsThunks";
import { IArtistsState } from "../../../type";

const initialState: IArtistsState = {
  artists: [],
  artistsLoading: false,
  createLoading: false,
  message: null,
  deleteLoading: false,
};

const ArtistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArtists.pending, (state) => {
      state.artistsLoading = true;
    });
    builder.addCase(getArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
      state.artistsLoading = false;
    });
    builder.addCase(getArtists.rejected, (state) => {
      state.artistsLoading = false;
    });

    builder.addCase(createArtist.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createArtist.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createArtist.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(deleteArtist.pending, (state) => {
      state.message = null;
      state.deleteLoading = true;
    });
    builder.addCase(deleteArtist.fulfilled, (state, { payload }) => {
      state.deleteLoading = false;
      state.message = payload;
    });
    builder.addCase(deleteArtist.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(togglePublishedArtist.pending, (state) => {
      state.message = null;
      state.deleteLoading = true;
    });
    builder.addCase(togglePublishedArtist.fulfilled, (state, { payload }) => {
      state.deleteLoading = false;
      state.message = payload;
    });
    builder.addCase(togglePublishedArtist.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const artistsRouter = ArtistSlice.reducer;
