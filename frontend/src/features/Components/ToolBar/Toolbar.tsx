import React from 'react';
import './toolbar.css';
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {logOut} from "../Login/UsersSlice";
import {setCurrentTrack, setShowPlayer} from "../Tracks/tracksSlice";

const Toolbar = () => {
  const location = useLocation();
  const userState = useAppSelector(state => state.userState);
  const dispatch = useAppDispatch();

  const onLogOut = () => {
    dispatch(logOut());
    dispatch(setShowPlayer(false));
    dispatch(setCurrentTrack(null));
  };

  return (
    <div className='toolbar'>
      <h1>Music App</h1>
      <div className='buttons'>
        {
          !userState.loginFulfilled &&
          (location.pathname === '/sign-up' || location.pathname === '/login') &&
              <Link to='/'>Artists</Link>
        }
        {
          userState.loginFulfilled && location.pathname !== '/login' && location.pathname !== '/sign-up' ?
            <Link to={
              location.pathname === '/track_history' ?
                `/` : '/track_history'
            }>
              {
                location.pathname === '/track_history' ?
                  'Artists' : 'History'
              }
            </Link>
            :
            userState.loginFulfilled && <Link to='/'>Artists</Link>
        }
        {
          userState.loginFulfilled &&
            <Link
                to='/login'
                onClick={() => onLogOut()}
            >Logout</Link>
        }
        {
          location.pathname !== '/sign-up' && !userState.loginFulfilled &&
            <Link to='/sign-up'>Sign up</Link>
        }
        {
          location.pathname !== '/login' && !userState.loginFulfilled &&
            <Link to='/login'>Login</Link>
        }
      </div>
    </div>
  );
};

export default Toolbar;