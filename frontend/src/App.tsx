import React from 'react';
import {Route, Routes} from "react-router-dom";
import Artists from "./features/Components/Artist/Artists";
import Albums from "./features/Components/Albums/Albums";
import Tracks from "./features/Components/Tracks/Tracks";
import './preloader.css';
import './App.css';
import Player from "./features/Components/Player/Player";
import {useAppSelector} from "./app/hooks";

const App = () => {
  const showPlayer = useAppSelector(state => state.artistsState.showPlayer);

  return (
    <div
      className="App"
    >
      <div className="board">
        <Routes>
          <Route path='/' element={<Artists />} />
          <Route path={'/albums/:id'} element={<Albums />} />
          <Route path={'/tracks/:id'} element={<Tracks />} />
        </Routes>
      </div>
      {
        showPlayer && <Player />
      }
    </div>
  );
}

export default App;