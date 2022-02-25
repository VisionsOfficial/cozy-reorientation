import React, { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import chev from "../../../assets/chev.png";
import vector from "../../../assets/vector-formation.png";
import vectorSoft from "../../../assets/vector-soft.png";
import vectorBilan from "../../../assets/vector-bilan.png";
import TabNavReo from "./componentsReo/TabNav";
import Conseiller from "./componentsReo/Conseiller";

const Home = () => {
  return (
    <div className="home">
      <h1>RéOrientation</h1>
      <p>
        Le bilan qui met à ta disposition une boite à outil pour t’aider dans
        ton projet
      </p>
      <div className="content-activity">
        <div className="v-card">
          <h3>Les formations</h3>
          <p>
            Découvre les formations associés aux métiers sur lesquels tu t’es
            positionné.
          </p>
          <img src={vector} alt="" />
          <div className="redirect">
            <RouterLink to="/formation">
              <img src={chev} alt="" />
            </RouterLink>
          </div>
        </div>
        <div className="v-card softSkills">
          <h3>Les soft skills !</h3>
          <p>
            Découvre tes soft skills et match les avec les soft skills métier
            qui t’intéresse.
          </p>
          <img className="soft" src={vectorSoft} alt="" />
          <div className="redirect">
            <RouterLink to="/SoftSkills">
              <img src={chev} alt="" />
            </RouterLink>
          </div>
        </div>
        <div className="v-card bilan">
          <h3>Ton bilan de RéOrientation</h3>
          <p>
            Retrouve toutes les données de ton bilan et partage-le à ton
            conseiller !
          </p>
          <img src={vector} alt="" />
          <div className="redirect">
            <RouterLink to="/Partage-a-ton-conseiller">
              <img src={chev} alt="" />
            </RouterLink>
          </div>
        </div>
      </div>
      <TabNavReo />
      <Conseiller />
    </div>
  );
};

export default Home;
