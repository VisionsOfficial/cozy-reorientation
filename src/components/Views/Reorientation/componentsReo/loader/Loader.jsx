import React from "react";
import "../../../../../styles/loaders/v-loader-reo.styl";

const Loader = ({ small }) => {
  return <div className={`vt-loader-${small ? "small-" : ""}reo`}></div>;
};

export default Loader;
