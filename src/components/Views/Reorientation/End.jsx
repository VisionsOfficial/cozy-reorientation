import React from "react";
import { NavLink as RouterLink } from "react-router-dom";

const End = () => {
  return (
    <div className="endContainer">
      <div className="svgContainer"></div>
      <p>Votre Bilan a bien été transmis à votre conseiller</p>
      <RouterLink to="/home">
        <button className="v-btn-nav btnBack">Accueil</button>
      </RouterLink>
    </div>
  );
};

export default End;
