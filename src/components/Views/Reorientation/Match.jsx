import React, { useState } from "react";
// import { NavLink as RouterLink } from "react-router-dom";
// import chev from "../../../assets/chev.png";
// import vectorTrois from "../../../assets/vector-trois.png";
// import vectorUn from "../../../assets/vector-un.png";
// import vectorDeux from "../../../assets/vector-deux.png";
import Conseiller from "./componentsReo/Conseiller";
import TabNavReo from "./componentsReo/TabNav";
// import FileInput from "cozy-ui/transpiled/react/FileInput";
// import upload from "../../../assets/upload-icon.png";
// import Textarea from "cozy-ui/transpiled/react/Textarea";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import question from "../../../assets/question.png";
import { useJsonFiles } from "../../Hooks/useJsonFiles";
import log from "cozy-logger";
import { useMotivationLetters } from "../../Hooks/useMotivationLetters";
import { getSoftSkills } from "../../../utils/jobreadyApi";
import Loader from "./componentsReo/loader/Loader";

const SoftSkills = () => {
  const { jsonFiles } = useJsonFiles();
  const datas = jsonFiles.orientoi.data.jobCards;

  const [letters, lettersLoaded] = useMotivationLetters();

  const [selectedLetterIndex, setSelectedLetterIndex] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const [letterSkills, setLetterSkills] = useState([]);
  const [jobcardSkills, setJobcardSkills] = useState([]);

  const [matchedSoftSkills, setMatchedSoftSkills] = useState([]);

  const [toggleMatch, setToggleMatch] = useState(1);

  const toggleSoftSkills = async index => {
    if (selectedLetterIndex === null || !selectedJobId === null)
      return alert("Veuillez sélectionner une lettre et un métier");

    setLetterSkills([]);
    setJobcardSkills([]);

    const selectedLetter = letters[selectedLetterIndex];
    const selectedJob = datas.find(element => element.id == selectedJobId);

    let letterSkillsResponse, jobcardSkillsResponse;
    try {
      letterSkillsResponse = await getSoftSkills(selectedLetter.content);
      if (letterSkillsResponse.soft_skills)
        setLetterSkills(letterSkillsResponse.soft_skills.map(el => el.name));
    } catch (err) {
      log(
        "error",
        "Could not get Jobready skills for selected jobcard: " + err
      );
    }

    try {
      jobcardSkillsResponse = await getSoftSkills(selectedJob.description);
      if (jobcardSkillsResponse.soft_skills)
        setJobcardSkills(jobcardSkillsResponse.soft_skills.map(el => el.name));
    } catch (err) {
      log(
        "error",
        "Could not get Jobready skills for selected jobcard: " + err
      );
    }

    const match = getMatchedSoftSkills(jobcardSkills, letterSkills);

    setMatchedSoftSkills(match);

    setToggleMatch(index);
    log("debug", index);
  };

  const getMatchedSoftSkills = (mySoftSkills, jobSoftSkills) => {
    return mySoftSkills.filter(element => jobSoftSkills.includes(element));
  };

  return (
    <div className="Soft">
      <div className={toggleMatch === 1 ? "flex" : "none"}>
        <h2>Match les soft skills !</h2>
        <p>Sélectionne la lettre de motivation que tu souhaites matcher :</p>
        <div className="content-letter match">
          {!lettersLoaded && <Loader />}
          {letters.map(({ title }, index) => {
            return (
              <div key={index} className="letter">
                <input
                  type="radio"
                  value={title}
                  name={"letterSelect"}
                  onClick={() => setSelectedLetterIndex(index)}
                />
                <p>LM - {title}</p>
              </div>
            );
          })}
        </div>
        <p>Puis le métier :</p>
        <div className="content-letter match">
          {datas.map(({ name, id }, index) => (
            <div key={index} className="letter">
              <input
                type="radio"
                value={name}
                name={"jobcardSelect"}
                onClick={() => setSelectedJobId(id)}
              />
              <p>{name}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => toggleSoftSkills(2)}
          className="v-btn-next quatre"
        >
          Match les soft skills !
        </button>
      </div>
      <div className={toggleMatch === 2 ? "flex" : "none"}>
        <div className="Detaillm">
          <h2>Match les soft skills !</h2>
          <h3 className="matchh3">Tes soft skills</h3>
          <div className="content-soft">
            {/* <div className="soft">
              <p>Autodidacte</p>
              <Accordion className="content-accor">
                <AccordionSummary className="accor-title-soft">
                  <img src={question} alt="" />
                </AccordionSummary>
                <AccordionDetails className="accor-detail-soft">
                  <h3>Curiosité</h3>
                  <p className="p-detail">
                    La curiosité est la valeur de ceux qui ont soif d’apprendre.
                    C’est-à-dire de comprendre, d’en savoir toujours plus. Une
                    personne curieuse est aussi souvent quelqu’un capable de
                    remettre les savoirs en question, de rechercher de nouvelles
                    informations et de les analyser.
                  </p>
                </AccordionDetails>
              </Accordion>
            </div> */}
            {letterSkills.length != 0 &&
              letterSkills.map((skill, index) => (
                <div key={index} className="soft">
                  <p>{skill}</p>
                </div>
              ))}

            {letterSkills.length == 0 && (
              <h3>Aucun soft skill pour cette lettre</h3>
            )}
          </div>
          <h3 className="matchh3">Les soft skills métiers</h3>
          <div className="content-soft">
            {jobcardSkills.map((skill, index) => (
              <div key={index} className="soft">
                <p>{skill}</p>
              </div>
            ))}

            {jobcardSkills.length == 0 && <h3>Aucun soft skill métier</h3>}
          </div>
          {/* Matching soft skills */}
          <h2>Les match !</h2>
          <div className="content-soft-match">
            {matchedSoftSkills &&
              matchedSoftSkills.map((skill, index) => (
                <div key={index} className="soft">
                  <p>{skill}</p>
                </div>
              ))}

            {matchedSoftSkills.length == 0 && (
              <h3>Aucun soft skill correspondant</h3>
            )}
          </div>
          <button
            onClick={() => setToggleMatch(1)}
            className="v-btn-next quatre"
          >
            Retour au match
          </button>
        </div>
      </div>
      <Conseiller />
      <TabNavReo />
    </div>
  );
};

export default SoftSkills;
