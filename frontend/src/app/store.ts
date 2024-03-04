import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { albumsRouter } from "../features/Components/Albums/albumsSlice";
import { artistsRouter } from "../features/Components/Artist/artistSlice";
import { tracksRouter } from "../features/Components/Tracks/tracksSlice";
import { userReducer } from "../features/Components/Login/UsersSlice";

const usersPersistConfig = {
  key: "musicApp:users",
  storage,
  whitelist: ["user", "theme"],
};

const rootReducer = combineReducers({
  albumsState: albumsRouter,
  artistsState: artistsRouter,
  tracksState: tracksRouter,
  userState: persistReducer(usersPersistConfig, userReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);
