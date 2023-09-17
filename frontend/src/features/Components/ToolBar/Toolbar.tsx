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
    location.pathname !== '/' && location.pathname !== '/sign-up' &&
    dispatch(logOut());
    dispatch(setShowPlayer(false));
    dispatch(setCurrentTrack(null));
  };

  return (
    <div className='toolbar'>
      <h1>Music App</h1>
      <div className='buttons'>
        {
          userState.loginFulfilled && location.pathname !== '/' && location.pathname !== '/sign-up' ?
            <Link to={
              location.pathname === '/track_history' ?
                `/artists` : '/track_history'
            }>
              {
                location.pathname === '/track_history' ?
                  'Artists' : 'History'
              }
            </Link>
            :
            userState.loginFulfilled && <Link to='/artists'>Artists</Link>
        }
        {
          userState.loginFulfilled &&
            <Link
                to='/'
                onClick={() => onLogOut()}
            >Logout</Link>
        }
        {
          location.pathname === '/' && !userState.loginFulfilled &&
            <Link to='/sign-up'>Sign up</Link>
        }
        {
          location.pathname === '/sign-up' && !userState.loginFulfilled &&
            <Link to='/'>Login</Link>
        }
      </div>
    </div>
  );
};

export default Toolbar;