import React from 'react';
import {Link} from "react-router-dom";
import './notFoundPage.css';

const NotFoundPage = () => {
  return (
    <div>
      <h3>Sorry, we couldn't recognize you. Please login again</h3>
      <Link className='button' to='/'>Login</Link>
    </div>
  );
};

export default NotFoundPage;