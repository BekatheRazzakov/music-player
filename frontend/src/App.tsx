import React from 'react';
import {Route, Routes} from "react-router-dom";
import Artists from "./features/Components/Artist/Artists";
import Albums from "./features/Components/Albums/Albums";
import Tracks from "./features/Components/Tracks/Tracks";
import './preloader.css';
import './App.css';
import Player from "./features/Components/Player/Player";
import {useAppSelector} from "./app/hooks";
import Toolbar from "./features/Components/ToolBar/Toolbar";
import Login from "./features/Components/Login/Login";

const App = () => {
  const showPlayer = useAppSelector(state => state.artistsState.showPlayer);

  return (
    <div className="App" >
      <Toolbar />
      <div className="board">
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/sign-up'} element={<Login />} />
          <Route path='/artists' element={<Artists />} />
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