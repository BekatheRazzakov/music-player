import React from "react";
import { Link } from "react-router-dom";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <h1>
        <Link to="/">Music App</Link>
      </h1>
    </div>
  );
};

export default Toolbar;
