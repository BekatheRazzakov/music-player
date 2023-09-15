import {configureStore} from '@reduxjs/toolkit';
import {albumsRouter} from "../features/Components/Albums/albumsSlice";
import {artistsRouter} from "../features/Components/Artist/artistSlice";
import {tracksRouter} from "../features/Components/Tracks/tracksSlice";

export const store = configureStore({
  reducer: {
    albumsState: albumsRouter,
    artistsState: artistsRouter,
    tracksState: tracksRouter,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;