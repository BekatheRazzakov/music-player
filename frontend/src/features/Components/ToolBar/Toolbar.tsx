import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setTheme } from "../Login/UsersSlice";

const Toolbar = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.userState.theme);

  return (
    <div className="toolbar">
      <h1>
        <Link to="/">Music App</Link>
      </h1>
      <div
        className="theme-switcher"
        onClick={() => dispatch(setTheme(theme === "light" ? "" : "light"))}
      >
        <div className="theme-switcher-inner" />
      </div>
    </div>
  );
};

export default Toolbar;
