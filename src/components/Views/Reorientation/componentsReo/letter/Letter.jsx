import React, { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import vector1 from "../../../../../assets/vector-un.png";
import vector2 from "../../../../../assets/vector-deux.png";
import vector3 from "../../../../../assets/vector-trois.png";
import Loader from "../loader/Loader";

const styleVectors = [vector1, vector2, vector3];

const getRandomIndex = () => {
  return Math.floor(Math.random() * styleVectors.length);
};

const Letter = ({ index, letter, deleteLetter }) => {
  const rndIndex = getRandomIndex();

  const [loadingDelete, setLoadingDelete] = useState(false);

  const doDeleteLetter = letter => {
    setLoadingDelete(true);
    deleteLetter(letter);
  };

  return (
    <div className="letter">
      <RouterLink to={"/detailLm/" + index} className="letter-content">
        <img
          className={"vector" + (rndIndex + 1)}
          src={styleVectors[rndIndex]}
        />
        <p>LM - {letter.title}</p>
      </RouterLink>
      {!loadingDelete && (
        <span onClick={() => doDeleteLetter(letter)} className="letter-delete">
          X
        </span>
      )}
      {loadingDelete && (
        <span className="letter-loader">
          <Loader small={true} />
        </span>
      )}
    </div>
  );
};

export default Letter;
