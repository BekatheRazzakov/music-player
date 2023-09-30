import { createSlice } from "@reduxjs/toolkit";
import { createArtist, getArtists } from "./artistsThunks";
import { IArtistsState } from "../../../type";

const initialState: IArtistsState = {
  artists: [],
  artistsLoading: false,
  createLoading: false,
};

const ArtistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
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
  },
});

export const artistsRouter = ArtistSlice.reducer;
