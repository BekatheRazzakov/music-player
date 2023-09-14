import {createSlice} from "@reduxjs/toolkit";
import {getArtists} from "./artistsThunks";
import {IArtistsState} from "../../../type";

const initialState: IArtistsState = {
  artists: []
};

const ArtistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getArtists.pending, state => {});
    builder.addCase(getArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
    });
    builder.addCase(getArtists.rejected, state => {});
  }
});

export const artistsRouter = ArtistSlice.reducer;
export const {} = ArtistSlice.actions;