import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Artists from "./features/Components/Artist/Artists";
import Albums from "./features/Components/Albums/Albums";
import Tracks from "./features/Components/Tracks/Tracks";
import "./preloader.css";
import "./App.css";
import Player from "./features/Components/Player/Player";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Toolbar from "./features/Components/ToolBar/Toolbar";
import Login from "./features/Components/Login/Login";
import NotFoundPage from "./features/Components/NotFoundPage/NotFoundPage";
import SignUp from "./features/Components/SignUp/SignUp";
import TracksHistory from "./features/Components/TracksHistory/TracksHistory";
import NewArtist from "./features/Components/NewArtist/NewArtist";
import NewAlbum from "./features/Components/NewAlbum/NewAlbum";
import NewTrack from "./features/Components/NewTrack/NewTrack";
import { resetMessage } from "./features/Components/Artist/artistSlice";

const App = () => {
  const showPlayer = useAppSelector((state) => state.tracksState.showPlayer);
  const userState = useAppSelector((state) => state.userState);
  const artistsState = useAppSelector((state) => state.artistsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (artistsState.message) {
      setTimeout(() => {
        dispatch(resetMessage());
      }, 1500);
    }
  }, [dispatch, artistsState]);

  return (
    <div className="App">
      <Toolbar />
      <div className="board">
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/sign-up"} element={<SignUp />} />
          <Route path="/" element={<Artists />} />
          <Route path={"/albums/:id"} element={<Albums />} />
          <Route path={"/tracks/:id"} element={<Tracks />} />
          <Route
            path="/track_history"
            element={userState.user ? <TracksHistory /> : <NotFoundPage />}
          />
          <Route path={"/new-artist"} element={<NewArtist />} />
          <Route path={"/new-album"} element={<NewAlbum />} />
          <Route path={"/new-track"} element={<NewTrack />} />
        </Routes>
      </div>
      <div
        className="artistsMessage"
        style={{
          zIndex: artistsState.message ? "2" : "0",
        }}
      >
        <div
          className="artistsMessage-inner"
          style={{
            opacity: artistsState.message ? "1" : "0",
          }}
        >
          <h3>{artistsState.message?.message}</h3>
        </div>
      </div>
      {showPlayer && <Player />}
    </div>
  );
};

export default App;
