import React from 'react';
import './toolbar.css';
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {logOut} from "../Login/UsersSlice";

const Toolbar = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  return (
    <div className='toolbar'>
      <h1>Music App</h1>
      <h1>1qaz@WSX29</h1>
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
  );
};

export default Toolbar;