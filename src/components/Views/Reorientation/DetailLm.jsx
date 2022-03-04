import React from "react";
import Conseiller from "./componentsReo/Conseiller";
import TabNavReo from "./componentsReo/TabNav";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import question from "../../../assets/question.png";
import { NavLink as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "./componentsReo/loader/Loader";
import { useMotivationLetter } from "../../Hooks/useMotivationLetter";
import { useSoftSkills } from "../../Hooks/useSoftSkills";

const DetailLm = () => {
  const { id } = useParams();

  const [letter, letterLoaded, letterError] = useMotivationLetter(id);
  const [letterSkills, letterSkillsLoaded, letterSkillsError] = useSoftSkills(
    letter
  );

  if (!letterLoaded && !letterError) {
    return <Loader />;
  } else if (letterError) {
    return (
      <h3>
        Une erreur est survenue lors du chargement de la lettre de motivation
      </h3>
    );
  } else {
    return (
      <div className="Detaillm">
        <div className="flex">
          <h2>Lettre de motivation</h2>
          <div className="content-lettre">
            <div className="lettre">
              <p>LM - {letter.title}</p>
            </div>
            <h3>Les soft skills de “LM - {letter.title}” :</h3>
            <div className="content-soft">
              {!letterSkillsError && !letterSkillsLoaded && <Loader />}

              {!letterSkillsError &&
                letterSkillsLoaded &&
                letterSkills.length == 0 && <h3>Aucun soft skill trouvé</h3>}

              {!letterSkillsError &&
                letterSkillsLoaded &&
                letterSkills.map((skill, index) => (
                  <div key={index} className="soft">
                    <p>{skill.name}</p>
                    {/* <Accordion className="content-accor">
                      <AccordionSummary className="accor-title-soft">
                        <img src={question} alt="" />
                      </AccordionSummary>
                      <AccordionDetails className="accor-detail-soft">
                        <h3>Curiosité</h3>
                        <p className="p-detail">
                          La curiosité est la valeur de ceux qui ont soif
                          d’apprendre. C’est-à-dire de comprendre, d’en savoir
                          toujours plus. Une personne curieuse est aussi souvent
                          quelqu’un capable de remettre les savoirs en question,
                          de rechercher de nouvelles informations et de les
                          analyser.
                        </p>
                      </AccordionDetails>
                    </Accordion> */}
                  </div>
                ))}

              {letterSkillsError && (
                <h3>
                  Une erreur est survenue en récupérant les soft skills auprès
                  de Jobready
                </h3>
              )}
            </div>
          </div>
        <div className="v-btn-container btnBack">
          <RouterLink to="/SoftSkills" className="v-btn-nav">
            Retour
          </RouterLink>
        </div>
        </div>
        <Conseiller />
        <TabNavReo />
      </div>
    );
  }
};

export default DetailLm;
