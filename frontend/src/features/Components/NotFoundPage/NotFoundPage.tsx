import React from "react";
import { Link } from "react-router-dom";
import "./notFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <h3>Sorry, we can{"'"}t recognize you. Please try again</h3>
      <Link className="white-btn" to="/login">
        Login
      </Link>
    </div>
  );
};

export default NotFoundPage;
