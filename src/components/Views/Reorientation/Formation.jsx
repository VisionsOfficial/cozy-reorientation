import React from "react";
import chev from "../../../assets/chev.png";
import vectorMetier from "../../../assets/vector-metier.png";
import Conseiller from "./componentsReo/Conseiller";
import TabNavReo from "./componentsReo/TabNav";
import { useJsonFiles } from "../../Hooks/useJsonFiles";
import FormationCard from "./componentsReo/formation-card/FormationCard";

const Formation = () => {
  const { jsonFiles } = useJsonFiles();
  const datas = jsonFiles.orientoi.data.jobCards;

  const jobCards = datas.filter(el => el.positionnement == "ça me correspond");
  const sectors = [...new Set(jobCards.map(card => card.type))];

  return (
    <div className="formation">
      <h2>Métiers & formations</h2>
      <p>Les métiers sur lesquels je me suis positionné :</p>
      <div className="content-activity">
        {jobCards.map(({ name, id }, index) => (
          <FormationCard
            key={index}
            name={name}
            id={id}
            vectorMetier={vectorMetier}
            chev={chev}
          />
        ))}
      </div>
      <p>Les secteurs sur lesquels je me suis positionné :</p>
      <div className="content-sectors">
        <ul>
          {sectors.map((sector, index) => (
            <li key={index}>{sector}</li>
          ))}
        </ul>
      </div>
      <TabNavReo />
      <Conseiller />
    </div>
  );
};

export default Formation;
