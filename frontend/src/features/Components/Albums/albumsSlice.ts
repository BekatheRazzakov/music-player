import { createSlice } from "@reduxjs/toolkit";
import { IAlbumsState } from "../../../type";
import { getAlbums } from "./albumsThunks";

const initialState: IAlbumsState = {
  albums: [],
  albumsLoading: false,
};

const AlbumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    resetAlbums: (state) => {
      state.albums = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAlbums.pending, (state) => {
      state.albumsLoading = true;
    });
    builder.addCase(getAlbums.fulfilled, (state, action) => {
      state.albums = action.payload;
      state.albumsLoading = false;
    });
    builder.addCase(getAlbums.rejected, (state) => {
      state.albumsLoading = false;
    });
  },
});

export const albumsRouter = AlbumsSlice.reducer;
export const { resetAlbums } = AlbumsSlice.actions;
