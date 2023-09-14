import React from 'react';
import {Route, Routes} from "react-router-dom";
import Artists from "./features/Containers/Artist/Artists";
import Albums from "./features/Containers/Albums/Albums";
import Tracks from "./features/Containers/Tracks/Tracks";
import './preloader.css';
import './App.css';

const App = () => (
  <div className="App">
    <div className="board">
      <Routes>
        <Route path='/' element={<Artists />} />
        <Route path={'/albums/:id'} element={<Albums />} />
        <Route path={'/tracks/:id'} element={<Tracks />} />
      </Routes>
    </div>
  </div>
);

export default App;