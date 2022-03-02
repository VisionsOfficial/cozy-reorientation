import React from "react";

const SliderDots = ({ toggleTab, toggleState }) => {
  return (
    <div className="contener-dot">
      <div
        onClick={() => toggleTab(1)}
        className={toggleState === 1 ? "dot dot-active" : "dot"}
      ></div>
      <div
        onClick={() => toggleTab(2)}
        className={toggleState === 2 ? "dot dot-active" : "dot"}
      ></div>
      <div
        onClick={() => toggleTab(3)}
        className={toggleState === 3 ? "dot dot-active" : "dot"}
      ></div>
      <div
        onClick={() => toggleTab(4)}
        className={toggleState === 4 ? "dot dot-active" : "dot"}
      ></div>
      <div
        onClick={() => toggleTab(5)}
        className={toggleState === 5 ? "dot dot-active" : "dot"}
      ></div>
    </div>
  );
};

export default SliderDots;
