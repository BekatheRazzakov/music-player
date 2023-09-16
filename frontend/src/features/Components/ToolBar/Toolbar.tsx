import React from 'react';
import './toolbar.css';
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {logOut} from "../Login/UsersSlice";

const Toolbar = () => {
  const location = useLocation();
  const userState = useAppSelector(state => state.userState);
  const dispatch = useAppDispatch();

  return (
    <div className='toolbar'>
      <h1>Music App</h1>
      <div className='buttons'>
        {
          userState.token !== '' &&
            <Link to={`/track_history`}>History</Link>
        }
        <Link to={
          location.pathname !== '/' && location.pathname !== '/sign-up' ?
            '/' :
            location.pathname === '/' ?
              '/sign-up' : '/'
        }
              onClick={() => {
                location.pathname !== '/' && location.pathname !== '/sign-up' &&
                dispatch(logOut());
              }}
        >
          <h4>
            {
              location.pathname !== '/' && location.pathname !== '/sign-up' ?
                'Logout' :
                location.pathname === '/' ?
                  'Sign up' : 'Login'
            }
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default Toolbar;