import React, { useEffect, useState } from "react";
import Conseiller from "./componentsReo/Conseiller";
import TabNavReo from "./componentsReo/TabNav";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import question from "../../../assets/question.png";
import { NavLink as RouterLink } from "react-router-dom";
import Loader from "./componentsReo/loader/Loader";
import { useClient } from "cozy-client";
import { getSoftSkills } from "../../../utils/jobreadyApi";
import { useDataOfType } from "../../Hooks/useDataOfType";
import { useLocation } from "react-router-dom";
import log from "cozy-logger";

const DetailLm = () => {
  const client = useClient();

  const location = useLocation();
  const letter = location.state;

  const [allSkills, allSkillsLoaded, allSkillsError] = useDataOfType(
    "soft-skills"
  );

  const [letterSkills, setSoftSkills] = useState([]);
  const [letterSkillsLoaded, setSoftSkillsLoaded] = useState(false);
  const [letterSkillsError, setSoftSkillsError] = useState(false);
  const [updatedLetter, setUpdatedLetter] = useState(false);

  useEffect(() => {
    if (!letter.content) return;
    if (letterSkillsLoaded) return;

    if (letter.softSkillsSaved) {
      setSoftSkills(letter.softSkills);
      setSoftSkillsError(false);
      setSoftSkillsLoaded(true);
      return;
    } else {
      getSoftSkills(letter.content)
        .then(res => {
          if (res.soft_skills) {
            setSoftSkillsError(false);
            setSoftSkills(res.soft_skills);
            // Save
            setUpdatedLetter(true);
          } else {
            setSoftSkillsError(true);
          }
        })
        .catch(err => {
          log("error", "Could not get soft skills: " + err);
          setSoftSkillsError(true);
        })
        .finally(() => {
          setSoftSkillsLoaded(true);
        });
    }
  }, [letter, letterSkillsLoaded]);

  useEffect(() => {
    if (updatedLetter) {
      client
        .save({
          ...letter,
          softSkillsSaved: true,
          softSkills: letterSkills
        })
        .then(() => {
          if (!allSkillsError && allSkillsLoaded) {
            if (!allSkills.length) {
              client
                .save({
                  _type: "visions.reorientation",
                  currentType: "soft-skills",
                  skills: letterSkills
                })
                .catch(err =>
                  log("error", "Could not save new soft skills: " + err)
                );
            } else {
              let existingSkills = allSkills[0];
              let skillsToSave = [
                ...new Set(existingSkills.skills.concat(letterSkills))
              ];
              existingSkills.skills = skillsToSave;
              client
                .save(existingSkills)
                .catch(err =>
                  log("error", "Could not save new soft skills: " + err)
                );
            }
          }
        })
        .catch(err => {
          log("error", "Could not save new letter: " + err);
        });
    }
  }, [
    allSkills,
    allSkillsLoaded,
    allSkillsError,
    updatedLetter,
    client,
    letter,
    letterSkills
  ]);

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
                Une erreur est survenue en récupérant les soft skills auprès de
                Jobready
              </h3>
            )}
          </div>
        </div>
      </div>
      <div className="v-btn-container btnBack">
        <RouterLink to="/SoftSkills" className="v-btn-nav">
          Retour
        </RouterLink>
      </div>
      <Conseiller />
      <TabNavReo />
    </div>
  );
};

export default DetailLm;
