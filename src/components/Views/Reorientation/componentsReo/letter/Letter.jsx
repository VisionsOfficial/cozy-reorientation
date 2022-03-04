import React, { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import Loader from "../loader/Loader";

const Letter = ({ letter, deleteLetter }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const doDeleteLetter = letter => {
    setLoadingDelete(true);
    deleteLetter(letter);
  };

  return (
    <div className="letter">
      <RouterLink
        to={{ pathname: "/detailLm/" + letter.id, state: letter }}
        className="letter-content"
      >
        <span className="letter-content-deco"></span>
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
