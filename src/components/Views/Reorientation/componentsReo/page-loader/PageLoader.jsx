import React from "react";
import Loader from "../loader/Loader";

const PageLoader = ({ title }) => {
  return (
    <div className="Soft">
      <div className="flex">
        <h2>{title}</h2>
        <Loader />
      </div>
    </div>
  );
};

export default PageLoader;
