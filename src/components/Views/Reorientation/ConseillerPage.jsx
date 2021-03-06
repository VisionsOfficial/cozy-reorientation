import React, { useState, useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import chev from "../../../assets/chev.png";
import vectorTrois from "../../../assets/vector-trois.png";
import vectorUn from "../../../assets/vector-un.png";
import vectorDeux from "../../../assets/vector-deux.png";
import TabNavReo from "./componentsReo/TabNav";
import FileInput from "cozy-ui/transpiled/react/FileInput";
import upload from "../../../assets/upload-icon.png";
import Textarea from "cozy-ui/transpiled/react/Textarea";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import question from "../../../assets/question.png";
import Conseiller from "./componentsReo/Conseiller";
import { useJsonFiles } from "../../Hooks/useJsonFiles";
import { useClient, Q } from "cozy-client";
import dynamique from "../../../assets/dynamique.svg";
import rapide from "../../../assets/rapide.svg";
import sensible from "../../../assets/sensible.svg";
import respectueux from "../../../assets/respectueux.svg";
import axios from "axios";

const ConseillerPage = () => {
  const client = useClient();

  const { jsonFiles } = useJsonFiles();
  const [letters, setLetters] = useState([]);
  const [ino, setIno] = useState({});

  const datas = jsonFiles.orientoi.data.jobCards;
  const badges = jsonFiles.orientoi.data.badges;
  console.log(badges);

  const getFormations = (name, index) => {
    axios
      .get(
        `https://api.inokufu.com/learningobject/v2/search-provider?lang=fr&model=strict&sort=popularity&distanceMax=100&max=20&address=cergy pontoise&match=best-effort&page=0&provider=CY Cergy Pontoise&keywords=${name}`,
        {
          headers: {
            "x-api-key": "78HXmwkbulX2oLxRpEh1tzicH4dq524qnO4xgwd0"
          }
        }
      )
      .then(function(response) {
        console.log(response.data);
        setIno(prevIno => {
          prevIno[index] = response.data.response.content;
          return prevIno;
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  };
  useEffect(() => {
    console.log(ino);
  }, [ino]);

  useEffect(() => {
    // for (let i = 0; i < datas.length; i++) {
    //   axios.get(
    //     `https://api.inokufu.com/learningobject/v2/search-provider?lang=fr&model=strict&sort=popularity&distanceMax=100&max=20&address=cergy pontoise&match=best-effort&page=0&provider=CY Cergy Pontoise&keywords=${datas.name}`,
    //     {
    //       headers: {
    //         "x-api-key": "78HXmwkbulX2oLxRpEh1tzicH4dq524qnO4xgwd0"
    //       }
    //     }
    //       .then(function(response) {
    //         console.log(response.data);
    //         setIno(response.data.response.content);
    //       })
    //       .catch(function(error) {
    //         console.error(error);
    //       })
    //   );
    // }
    client
      .query(Q("visions.bilanorientation"))
      .then(res => {
        setLetters(res.data);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div className="Detaillm">
      <div className="flex">
        <h2>Partage ?? ton conseiller</h2>
        <Accordion className="content-accor">
          <AccordionSummary className="accor-title blue">
            R??capitulatif
          </AccordionSummary>
          <AccordionDetails className="accor-detail flex center">
            <div className="contener-info">
              <h3>Les m??tiers sur lesquels tu es positionn?? :</h3>
              <div className="content-lettre">
                {datas.map(({ name, id, positionnement }, index) => (
                  <Accordion className="content-accor">
                    <AccordionSummary
                      className="accor-title"
                      onClick={() => getFormations(name, index)}
                    >
                      {name}
                    </AccordionSummary>
                    <AccordionDetails className="accor-detail">
                      {ino[index] &&
                        ino[index].map((formation, yndex) => (
                          <div key={yndex} className="detail-formation-card">
                            {console.log(formation)}
                            <h2>{formation.title}</h2>
                          </div>
                        ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
              <h3>Les secteurs sur lesquels tu es positionn?? :</h3>
              <div className="content-lettre">
                {/* {datas.map(({ secteur }, index) => (
                  <div key={index} className="lettre">
                    <img className="vectordeux" src={vectorDeux} alt="" />
                    <p>{secteur}</p>
                  </div>
                ))} */}
              </div>

              <h3>Tes lettres de motivations :</h3>
              <div className="content-lettre">
                {letters.map(({ content, title }, index) => {
                  return (
                    <div key={index} className="lettre">
                      <img className="vectordeux" src={vectorDeux} alt="" />
                      <p>{title}</p>
                    </div>
                  );
                })}
              </div>
              <h3>Tes soft skills :</h3>
              <div className="content-soft recap">
                <div className="soft">
                  <p>Autodidacte</p>
                </div>
                <div className="soft">
                  <p>Rigueur</p>
                </div>
                <div className="soft">
                  <p>Volontaire</p>
                </div>
                <div className="soft">
                  <p>Curiosit??</p>
                </div>
                <div className="soft">
                  <p>Prise de d??cisions</p>
                </div>
              </div>

              <h3>Tes badges de personnalit?? :</h3>
              <div className="content-lettre">
                {/* {badges.map(({ name, value, icon }, index) => {
                  return (
                    <div key={index} className="lettre">
                      <img className="vectordeux" src={vectorDeux} alt="" />
                      <p>{name}</p>
                    </div>
                  );
                })} */}
                <div className="content-badge">
                  <div className="badge">
                    <img src={sensible} alt="" />
                    <p>sensible : 20%</p>
                  </div>
                  <div className="badge">
                    <img src={dynamique} alt="" />
                    <p>dynamique : 16%</p>
                  </div>
                  <div className="badge">
                    <img src={rapide} alt="" />
                    <p>rapide : 25%</p>
                  </div>
                  <div className="badge">
                    <img src={respectueux} alt="" />
                    <p>respectueux : 32%</p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <RouterLink to="/" className="v-btn-next">
          Je partage ?? un conseiller
        </RouterLink>
      </div>

      <TabNavReo />
    </div>
  );
};

export default ConseillerPage;
