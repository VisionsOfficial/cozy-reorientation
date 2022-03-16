import React, { useEffect, useState, useRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
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
import { useDataOfType } from "../../Hooks/useDataOfType";
import { getSoftSkills } from "../../../utils/jobreadyApi";
import Loader from "./componentsReo/loader/Loader";
import PageLoader from "./componentsReo/page-loader/PageLoader";
import LettreMatch from "./LetterMatch";

const SoftSkills = () => {
  const letterInputs = useRef();
  const jobInputs = useRef();

  const { jsonFiles } = useJsonFiles();
  const datas = jsonFiles.orientoi.data.jobCards;
  const jobCards = datas.filter(
    job => job.positionnement == "ça me correspond"
  );

  const [letters, lettersLoaded] = useDataOfType("motivation-letter");

  const [selectedLetterIndex, setSelectedLetterIndex] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const [letterSkills, setLetterSkills] = useState([]);
  const [jobcardSkills, setJobcardSkills] = useState([]);

  const [loadingMatchedSkills, setLoadingMatchedSkills] = useState(false);
  const [matchedSoftSkills, setMatchedSoftSkills] = useState([]);

  const [toggleMatch, setToggleMatch] = useState(1);

  const toggleSoftSkills = async () => {
    if (selectedLetterIndex === null || !selectedJobId === null)
      return alert("Veuillez sélectionner une lettre et un métier");

    setLoadingMatchedSkills(true);

    setLetterSkills([]);
    setJobcardSkills([]);

    const selectedLetter = letters[selectedLetterIndex];
    const selectedJob = datas.find(element => element.id == selectedJobId);

    setLetterSkills(selectedLetter.softSkills.map(el => el.name));

    let jobcardSkillsResponse;
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

    setLoadingMatchedSkills(false);

    setToggleMatch(2);
  };

  useEffect(() => {
    if (toggleMatch == 2) {
      const match = getMatchedSoftSkills(jobcardSkills, letterSkills);
      setMatchedSoftSkills(match);
    }
  }, [toggleMatch, jobcardSkills, letterSkills]);

  const getMatchedSoftSkills = (mySoftSkills, jobSoftSkills) => {
    return mySoftSkills.filter(element => jobSoftSkills.includes(element));
  };

  const checkIfAnalyzed = lettersToCheck => {
    for (const l of lettersToCheck) {
      if (!l.softSkills || !l.softSkills.length) return false;
    }
    return true;
  };

  const formValid = () => {
    if (!letterInputs.current) return false;
    if (!jobInputs.current) return false;

    let isValid = false;
    let inputLetter = letterInputs.current.querySelector(
      'input[name="letterSelect"]:checked'
    );
    let inputJob = jobInputs.current.querySelector(
      'input[name="jobcardSelect"]:checked'
    );
    if (inputLetter && inputJob) {
      isValid = true;
    }
    return isValid;
  };

  if (
    (!letters || !letters.length || !checkIfAnalyzed(letters)) &&
    lettersLoaded
  ) {
    return (
      <div className="Soft">
        <div className={toggleMatch === 1 ? "flex" : "none"}>
          <h2>Match les soft skills !</h2>
          <div className="v-card">
            <h2>Oops!</h2>
            <p>
              Tu n&apos;as pas encore rensigné de lettre de motivation, tu ne
              peux donc pas encore comparer de skills.
            </p>
          </div>
          <div className="v-btn-container">
            <RouterLink to="/SoftSkills" className="v-btn-nav">
              Retour
            </RouterLink>
          </div>
        </div>
      </div>
    );
  } else if (!lettersLoaded) {
    return <PageLoader title={"Chargement..."} />;
  } else if (loadingMatchedSkills) {
    return <PageLoader title={"Matching en cours..."} />;
  } else {
    return (
      <div className="Soft">
        <div className={toggleMatch === 1 ? "flex" : "none"}>
          <h2>Match les soft skills !</h2>
          <p>Sélectionne la lettre de motivation que tu souhaites matcher :</p>
          <div ref={letterInputs} className="content-letter match">
            {!lettersLoaded && <Loader />}
            {letters.map(({ title }, index) => {
              return (
                <LettreMatch
                  key={index}
                  title={title}
                  onclick={setSelectedLetterIndex}
                  id={index}
                  name={"letterSelect"}
                />
              );
            })}
          </div>
          <p>Puis le métier :</p>
          <div ref={jobInputs} className="content-letter match">
            {jobCards.map(({ name, id }, index) => (
              <LettreMatch
                key={index}
                title={name}
                onclick={setSelectedJobId}
                id={id}
                name={"jobcardSelect"}
              />
            ))}
          </div>
          {formValid() && (
            <button
              onClick={() => toggleSoftSkills()}
              className="v-btn-next quatre"
            >
              Match les soft skills !
            </button>
          )}
          {!formValid() && (
            <button
              onClick={() => toggleSoftSkills()}
              className="v-btn-next quatre"
              disabled
            >
              Match les soft skills !
            </button>
          )}
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
              <div className="soft">
                {letterSkills.length != 0 &&
                  letterSkills.map((skill, index) => (
                    <p key={index}>{skill}</p>
                  ))}
              </div>

              {letterSkills.length == 0 && (
                <h3>Aucun soft skill pour cette lettre</h3>
              )}
            </div>
            <h3 className="matchh3">Les soft skills métiers</h3>
            <div className="content-soft">
              <div className="soft">
                {jobcardSkills.map((skill, index) => (
                  <p key={index}>{skill}</p>
                ))}
              </div>

              {jobcardSkills.length == 0 && <h3>Aucun soft skill métier</h3>}
            </div>
            {/* Matching soft skills */}
            <h2>Les match !</h2>
            <div className="content-soft-match">
              <div className="soft">
                {matchedSoftSkills &&
                  matchedSoftSkills.map((skill, index) => (
                    <p key={index}>{skill}</p>
                  ))}
              </div>
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
  }
};

export default SoftSkills;
