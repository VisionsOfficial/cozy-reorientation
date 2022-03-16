import React, { useEffect } from "react";
import { useState } from "react";

const LettreMatch = ({ title, name, onclick, id }) => {
  const [style, setStyle] = useState(null);

  useEffect(() => {
    const randomBorderRadius = (min, max) => {
      return (
        (
          Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
          Math.ceil(min)
        ).toString() + "px"
      );
    };
    setStyle({
      borderTopRightRadius: randomBorderRadius(20, 100),
      borderBottomRightRadius: randomBorderRadius(20, 100)
    });
  }, []);

  return (
    <div className="letter">
      <div className="inputContainer" style={style}>
        <input
          type="radio"
          value={title}
          name={name}
          onClick={() => onclick(id)}
        />
      </div>
      <p>{title}</p>
    </div>
  );
};

export default LettreMatch;
