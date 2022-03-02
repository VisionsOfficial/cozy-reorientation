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
  return (
    <div className="formation">
      <h2>Métiers & formations</h2>
      <p>Les métiers sur lesquels je me suis positionné :</p>
      <div className="content-activity">
        {datas.map(({ name, id }, index) => (
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
      <div className="content-activity">
        {/* //! HARDCODED DATA */}
        <FormationCard
          key={1}
          name={"Alternance"}
          id={1}
          vectorMetier={vectorMetier}
          chev={chev}
        />
        <FormationCard
          key={2}
          name={"Marketing"}
          id={2}
          vectorMetier={vectorMetier}
          chev={chev}
        />
      </div>
      <TabNavReo />
      <Conseiller />
    </div>
  );
};

export default Formation;
