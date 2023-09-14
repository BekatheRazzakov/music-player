import {createSlice} from "@reduxjs/toolkit";
import {IAlbumsState} from "../../../type";
import {getAlbums} from "./albumsThunks";

const initialState: IAlbumsState = {
  albums: []
};

const AlbumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    resetAlbums: state => {
      state.albums = [];
    }
  },
  extraReducers: builder => {
    builder.addCase(getAlbums.pending, state => {});
    builder.addCase(getAlbums.fulfilled, (state, action) => {
      state.albums = action.payload;
    });
    builder.addCase(getAlbums.rejected, state => {});
  }
});

export const albumsRouter = AlbumsSlice.reducer;
export const {resetAlbums} = AlbumsSlice.actions;