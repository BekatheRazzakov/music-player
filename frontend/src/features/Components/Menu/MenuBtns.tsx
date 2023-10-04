import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { logout } from "../Login/UserThunk";
import { setCurrentTrack, setShowPlayer } from "../Tracks/tracksSlice";
import "./menu.css";

interface IProps {
  onClick: () => void;
}

const MenuBtns: React.FC<IProps> = ({ onClick }) => {
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
    <div className="menu-buttons">
      {userState.user && (
        <>
          <Link onClick={onClick} to="/new-artist">
            Add new artist
          </Link>
          <Link onClick={onClick} to="/new-album">
            Add new album
          </Link>
          <Link onClick={onClick} to="/new-track">
            Add new track
          </Link>
        </>
      )}
      {!userState.user &&
        (location.pathname === "/sign-up" ||
          location.pathname === "/login") && <Link to="/">Artists</Link>}
      {userState.user && location.pathname !== "/" && (
        <Link onClick={onClick} to="/">
          Artists
        </Link>
      )}
      {userState.user && location.pathname !== "/track_history" && (
        <Link onClick={onClick} to="/track_history">
          History
        </Link>
      )}
      {userState.user && (
        <Link
          to="/login"
          onClick={() => {
            onLogOut();
            onClick();
          }}
        >
          Logout
        </Link>
      )}
      {location.pathname !== "/sign-up" && !userState.user && (
        <Link onClick={onClick} to="/sign-up">
          Sign up
        </Link>
      )}
      {location.pathname !== "/login" && !userState.user && (
        <Link onClick={onClick} to="/login">
          Login
        </Link>
      )}
    </div>
  );
};

export default MenuBtns;
