import React from 'react';
import './toolbar.css';
import {Link, useLocation} from "react-router-dom";

const Toolbar = () => {
  const location = useLocation();

  return (
    <div className='toolbar'>
      <h1>Music App</h1>
      <Link to={
        location.pathname === '/' ?
          '/sign-up' : '/'
      }>
        <h4>
          {
            location.pathname === '/' ?
              'Sign up' : 'Login'
          }
        </h4>
      </Link>
    </div>
  );
};

export default Toolbar;