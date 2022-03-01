import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import chev from "../../../assets/chev.png";
// import vector from "../../../assets/vector-formation.png";
import vectorMetier from "../../../assets/vector-metier.png";
// import vectorBilan from "../../../assets/vector-bilan.png";
import Conseiller from "./componentsReo/Conseiller";
import TabNavReo from "./componentsReo/TabNav";
import { useJsonFiles } from "../../Hooks/useJsonFiles";

const Home = () => {
  const { jsonFiles } = useJsonFiles();
  const datas = jsonFiles.orientoi.data.jobCards;
  return (
    <div className="formation">
      <h2>Métiers & formations</h2>
      <p>Les métiers sur lesquels je me suis positionné :</p>
      <div className="content-activity">
        {datas.map(({ name, id }, index) => (
          <div key={index} className="v-card">
            <h3>{name}</h3>
            <img className="vectorMetier" src={vectorMetier} alt="" />
            <div className="redirect">
              <RouterLink key={index} to={`/detail/${id}`}>
                <img src={chev} alt="" />
              </RouterLink>
            </div>
          </div>
        ))}
      </div>
      <p>Les secteurs sur lesquels je me suis positionné :</p>
      <div className="content-activity">
        <div className="v-card">
          <h3>Alternance</h3>

          <img className="vectorMetier" src={vectorMetier} alt="" />
          <div className="redirect">
            <RouterLink to="/">
              <img src={chev} alt="" />
            </RouterLink>
          </div>
        </div>
        <div className="v-card">
          <h3>Marketing</h3>

          <img className="vectorMetier" src={vectorMetier} alt="" />
          <div className="redirect">
            <RouterLink to="/">
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
