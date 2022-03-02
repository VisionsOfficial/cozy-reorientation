import React from "react";
import conseiller from "../../../../assets/conseiller.svg";
import { NavLink as RouterLink } from "react-router-dom";

const Conseiller = () => {
  return (
    <div>
      <RouterLink to="/Partage-a-ton-conseiller">
        <img className="conseiller" src={conseiller} alt="" />
      </RouterLink>
    </div>
  );
};

export default Conseiller;
