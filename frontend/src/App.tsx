import React from "react";
import { Route, Routes } from "react-router-dom";
import Artists from "./features/Components/Artist/Artists";
import Albums from "./features/Components/Albums/Albums";
import Tracks from "./features/Components/Tracks/Tracks";
import "./preloader.css";
import "./App.css";
import Player from "./features/Components/Player/Player";
import Toolbar from "./features/Components/ToolBar/Toolbar";
import Login from "./features/Components/Login/Login";
import NotFoundPage from "./features/Components/NotFoundPage/NotFoundPage";
import SignUp from "./features/Components/SignUp/SignUp";
import TracksHistory from "./features/Components/TracksHistory/TracksHistory";
import NewArtist from "./features/Components/NewArtist/NewArtist";
import NewAlbum from "./features/Components/NewAlbum/NewAlbum";
import NewTrack from "./features/Components/NewTrack/NewTrack";
import { useAppSelector } from "./app/hooks";
import Menu from "./features/Components/Menu/Menu";
import AllTracks from "./features/Components/AllTracks/AllTracks";

const App = () => {
  const showPlayer = useAppSelector((state) => state.tracksState.showPlayer);
  const userState = useAppSelector((state) => state.userState);

  return (
    <div className="App">
      <Toolbar />
      <Menu />
      <div className="board">
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/sign-up"} element={<SignUp />} />
          <Route path="/" element={<Artists />} />
          <Route path="/all" element={<AllTracks />} />
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
      {showPlayer && <Player />}
    </div>
  );
};

export default App;
