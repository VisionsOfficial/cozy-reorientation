import React, { useState, useEffect } from "react";
// import { NavLink as RouterLink } from "react-router-dom";
// import chev from "../../../assets/chev.png";
import vectorTrois from "../../../assets/vector-trois.png";
import vectorUn from "../../../assets/vector-un.png";
// import vectorDeux from "../../../assets/vector-deux.png";
import Conseiller from "./componentsReo/Conseiller";
import TabNavReo from "./componentsReo/TabNav";
// import FileInput from "cozy-ui/transpiled/react/FileInput";
// import upload from "../../../assets/upload-icon.png";
// import Textarea from "cozy-ui/transpiled/react/Textarea";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import question from "../../../assets/question.png";
import { useClient, Q } from "cozy-client";
import { useJsonFiles } from "../../Hooks/useJsonFiles";
import log from "cozy-logger";
import axios from "axios";

const SoftSkills = () => {
  const client = useClient();
  const { jsonFiles } = useJsonFiles();
  const datas = jsonFiles.orientoi.data.jobCards;
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [matchedSoftSkills, setMatchedSoftSkills] = useState([]);

  const [letters, setLetters] = useState([]);
  const [toggleMatch, setToggleMatch] = useState(1);

  useEffect(() => {
    client
      .query(Q("visions.bilanorientation"))
      .then(res => {
        setLetters(res.data);
      })
      .catch(err => {
        alert(err.message);
      });
  }, [client]);

  const toggleSoftSkills = index => {
    // const selectedLetter = letters[selectedLetterIndex];
    const selectedJob = datas.find(element => element.id == selectedJobId);

    let myJobreadySoftSkills = [];
    let jobCardsJobreadySoftSkills = [];

    // Axios LM
    const selectedLetterContent = {
      method: "POST",
      url:
        "https://eb-staging-environment-prediction-api.jobready.fr/predict-softskills/?sXBe8B7Rhqym=S8NrfuZM79bR",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        type: "Alternance",
        mission: selectedJob.description
      }
    };
    const selectedJobContent = {
      method: "POST",
      url:
        "https://eb-staging-environment-prediction-api.jobready.fr/predict-softskills/?sXBe8B7Rhqym=S8NrfuZM79bR",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        type: "Alternance",
        mission: letters.description
      }
    };

    axios
      .request(selectedLetterContent)
      .then(function(response) {
        myJobreadySoftSkills(response);
      })
      .catch(function(error) {
        log("error", error.message);
      });
    axios
      .request(selectedJobContent)
      .then(function(response) {
        jobCardsJobreadySoftSkills(response);
      })
      .catch(function(error) {
        log("error", error.message);
      });

    const match = getMatchedSoftSkills(
      myJobreadySoftSkills,
      jobCardsJobreadySoftSkills
    );
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
        <div className="content-lettre match">
          {letters.map(({ title }, index) => {
            return (
              <div key={index} className="lettre">
                <input
                  type="radio"
                  value={title}
                  name={title}
                  onClick={() => setSelectedLetterIndex(index)}
                />

                <img className="vectorun" src={vectorUn} alt="" />
                <p>LM - {title}</p>
              </div>
            );
          })}
        </div>
        <p>Puis le métier :</p>
        <div className="content-lettre match">
          {datas.map(({ name, id }, index) => (
            <div key={index} className="lettre">
              <input
                type="radio"
                value={name}
                name={name}
                onClick={() => setSelectedJobId(id)}
              />
              <img className="vectortrois" src={vectorTrois} alt="" />
              <p>{name}</p>
            </div>
          ))}
        </div>

        <button onClick={() => setToggleMatch(2)} className="v-btn-next quatre">
          Match les soft skills !
        </button>
      </div>
      <div className={toggleMatch === 2 ? "flex" : "none"}>
        <div className="Detaillm">
          <h2>Match les soft skills !</h2>
          <h3 className="matchh3">Tes soft skills</h3>
          <div className="content-soft">
            <div className="soft">
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
            </div>
            <div className="soft">
              <p>Volontaire</p>
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
            </div>
            <div className="soft">
              <p>Curiosité</p>
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
            </div>
            <div className="soft">
              <p>Rigueur</p>
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
            </div>
            <div className="soft">
              <p>Prise de décisions</p>
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
            </div>
          </div>
          <h3 className="matchh3">Les soft skills métiers</h3>
          <div className="content-soft">
            <div className="soft">
              <p>Organisation</p>
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
            </div>
            <div className="soft">
              <p>Curiosité</p>
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
            </div>
            <div className="soft">
              <p>Prise de décisions</p>
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
            </div>
          </div>
          <h2>Les match !</h2>
          <div className="content-soft-match">
            <div className="soft">
              <p>Curiosité</p>
            </div>
            <div className="soft">
              <p>Prise de décisions</p>
            </div>
          </div>
        </div>
      </div>
      <Conseiller />
      <TabNavReo />
    </div>
  );
};

export default SoftSkills;
