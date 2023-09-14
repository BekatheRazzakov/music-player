import {configureStore} from '@reduxjs/toolkit';
import {albumsRouter} from "../features/Containers/Albums/albumsSlice";
import {artistsRouter} from "../features/Containers/Artist/artistSlice";
import {tracksRouter} from "../features/Containers/Tracks/tracksSlice";

export const store = configureStore({
  reducer: {
    albumsState: albumsRouter,
    artistsState: artistsRouter,
    tracksState: tracksRouter,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;