import React, { useState } from "react";
import MenuBtns from "./MenuBtns";
import { useAppSelector } from "../../../app/hooks";
import { apiURL } from "../../../constants";

const Menu = () => {
  const userState = useAppSelector((state) => state.userState);
  const [showMenu, setShowMenu] = useState(false);
  const [display, setDisplay] = useState(false);

  const onMenuClick = () => {
    if (showMenu) {
      setShowMenu(false);
      setTimeout(() => {
        setDisplay(false);
      }, 300);
      return;
    }
    setDisplay(true);
    setTimeout(() => {
      setShowMenu(true);
    }, 50);
  };

  return (
    <>
      {showMenu && (
        <div className="backdrop" onClick={() => setShowMenu(false)} />
      )}
      <div className="menu-btn" onClick={onMenuClick}>
        <div className="menu-onclick-btn">
          <img
            src={
              userState.user?.avatar
                ? `${!userState.user.avatar.includes("http") ? apiURL : ""}` +
                  userState.user.avatar
                : "https://api-private.atlassian.com/users/6b5c1609134a5887d7f3ab1b73557664/avatar"
            }
            onClick={onMenuClick}
            alt="user"
          />
          <span>
            {userState.user ? userState.user.displayName : "Unauthorized"}
          </span>
        </div>
        <div
          className={`menu ${showMenu && "show-menu"}`}
          style={{ display: display ? "block" : "none" }}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuBtns onClick={onMenuClick} />
        </div>
      </div>
    </>
  );
};

export default Menu;
