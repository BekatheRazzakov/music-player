import React from "react";
import "./toolbar.css";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setCurrentTrack, setShowPlayer } from "../Tracks/tracksSlice";
import { logout } from "../Login/UserThunk";

const Toolbar = () => {
  const location = useLocation();
  const userState = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  const onLogOut = () => {
    if (userState.user) {
      dispatch(logout(userState.user.token));
      dispatch(setShowPlayer(false));
      dispatch(setCurrentTrack(null));
    }
  };

  return (
    <div className="toolbar">
      <h1>Music App</h1>
      <div className="buttons">
        {userState.user && (
          <>
            <Link to="/new-artist">Add new artist</Link>
            <Link to="/new-album">Add new album</Link>
            <Link to="/new-track">Add new track</Link>
          </>
        )}
        {!userState.user &&
          (location.pathname === "/sign-up" ||
            location.pathname === "/login") && <Link to="/">Artists</Link>}
        {userState.user && location.pathname !== "/" && (
          <Link to="/">Artists</Link>
        )}
        {userState.user && location.pathname !== "/track_history" && (
          <Link to="/track_history">History</Link>
        )}
        {userState.user && (
          <Link to="/login" onClick={() => onLogOut()}>
            Logout
          </Link>
        )}
        {location.pathname !== "/sign-up" && !userState.user && (
          <Link to="/sign-up">Sign up</Link>
        )}
        {location.pathname !== "/login" && !userState.user && (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
