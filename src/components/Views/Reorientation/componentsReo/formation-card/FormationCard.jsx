import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import "../../../../../styles/cards/formation-card.styl";

const FormationCard = ({ name, vectorMetier, id, chev }) => {
  return (
    <div className="v-card">
      <h3>{name}</h3>
      <img className="vectorMetier" src={vectorMetier} alt="" />
      <div className="redirect">
        <RouterLink to={`/detail/${id}`}>
          <img src={chev} alt="" />
        </RouterLink>
      </div>
    </div>
  );
};

export default FormationCard;
