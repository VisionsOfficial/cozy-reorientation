import React, { useState } from "react";
import svg from "../../../assets/bg-info.svg";
import conseiller from "../../../assets/conseiller.svg";
import { NavLink as RouterLink } from "react-router-dom";

import TabNavReo from "./componentsReo/TabNav";

const ReoSlider = () => {
  const [toggleState, setToggleState] = useState(1);

  const incrementState = () => {
    setToggleState(toggleState + 1);
  };
  const toggleTab = index => {
    setToggleState(index);
  };

  return (
    <div>
      <img className="svg" src={svg} alt="" />
      <div className="text">
        <div className="content-text">
          <p className={toggleState === 1 ? "list-active" : ""}>
            Découvre les formations associés aux métiers sur lequels tu t’es
            possitionné avec Orientoi
          </p>
          <p className={toggleState === 2 ? "list-active" : ""}>
            Découvre les soft skills associés aux fiches métiers
          </p>
          <p className={toggleState === 3 ? "list-active" : ""}>
            Importe ta lettre de motivation et analyse-là pour découvrir les
            soft skills qui y sont associés !
          </p>
          <p className={toggleState === 4 ? "list-active" : ""}>
            Fais matcher les soft skills entre-eux pour mieux visualiser ceux
            que tu as déjà acquis
          </p>
          <p className={toggleState === 5 ? "list-active pb-none" : ""}>
            Et enfin partage ton bilan à ton conseiller !
            <img src={conseiller} alt="" />
          </p>
        </div>
      </div>
      <button
        className={toggleState === 5 ? "btn-disable" : "v-btn-next btn-slide"}
        onClick={incrementState}
      >
        Suivant
      </button>
      <RouterLink
        to="/home"
        className={
          toggleState === 5 ? " v-btn-next-home btn-slide" : "btn-disable"
        }
      >
        C'est parti !
      </RouterLink>
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

      <RouterLink className="v-pass" to="/home">
        Je passe l’explication
      </RouterLink>
      <TabNavReo />
    </div>
  );
};

export default ReoSlider;
