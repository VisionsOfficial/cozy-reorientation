import React, { useEffect, useState } from "react";
import TabNavReo from "./componentsReo/TabNav";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { useJsonFiles } from "../../Hooks/useJsonFiles";
import axios from "axios";
import { useDataOfType } from "../../Hooks/useDataOfType";
import { sendMail } from "../../../utils/sendMail";
import { useClient, Q } from "cozy-client";
import log from "cozy-logger";
import Loader from "./componentsReo/loader/Loader";
import { Redirect } from "react-router-dom";
import LettreConseillerPage from "./componentsReo/RandomBorderedDesign";

// Assets

import dynamique from "../../../assets/badges/dynamique.svg";
import empathique from "../../../assets/badges/empathique.svg";
import explorateur from "../../../assets/badges/explorateur.svg";
import optimiste from "../../../assets/badges/optimiste.svg";
import organise from "../../../assets/badges/organise.svg";
import pluriactif from "../../../assets/badges/pluriactif.svg";
import pragmatique from "../../../assets/badges/pragmatique.svg";
import rapide from "../../../assets/badges/rapide.svg";
import respectueux from "../../../assets/badges/respectueux.svg";
import sensible from "../../../assets/badges/sensible.svg";

const possibleBadges = {
  dynamique,
  empathique,
  explorateur,
  optimiste,
  organise,
  pluriactif,
  pragmatique,
  rapide,
  respectueux,
  sensible
};

const ConseillerPage = () => {
  const client = useClient();

  const [redirectToEnd, setRedirectToEnd] = useState(false);

  const { jsonFiles } = useJsonFiles();
  const [letters, lettersLoaded, lettersError] = useDataOfType(
    "motivation-letter"
  );
  const [skills, skillsLoaded, skillsError] = useDataOfType("soft-skills");
  const [sortedSkills, setSortedSkills] = useState([]);
  const [ino, setIno] = useState({});

  const datas = jsonFiles.orientoi.data.jobCards;
  const badges = jsonFiles.orientoi.data.badges;
  const jobCards = datas.filter(
    job => job.positionnement == "ça me correspond"
  );
  const sectors = [...new Set(jobCards.map(card => card.type))];
  const filteredBadges = () => {
    let filtered = [];
    for (const key in badges) {
      if (possibleBadges[key.toLowerCase()]) {
        filtered.push({ name: key, value: badges[key] });
      }
    }
    return filtered;
  };

  const shareToConseiller = async () => {
    /* eslint-disable no-console */

    const recapSkills = sortedSkills;
    const recapJobs = jobCards;
    const recapBadges = badges;
    const recapFormations = []; // todo
    const recapLetters = letters.map(el => {
      return {
        title: el.title,
        content: el.content
      };
    });

    let existingRecap = null;

    try {
      const queryDef = Q("visions.general").where({
        category: "reorientation_recap"
      });
      existingRecap = await client.query(queryDef);
    } catch (err) {
      console.log(err);
      return;
    }

    let documentId;

    console.log(existingRecap);

    if (existingRecap.data.length === 0) {
      // Create
      try {
        const createResponse = await client.save({
          _type: "visions.general",
          jobCards: recapJobs,
          softSkills: recapSkills,
          motivationLetters: recapLetters,
          badges: recapBadges,
          formations: recapFormations
        });
        console.log(createResponse);
        documentId = createResponse.data.id;
      } catch (err) {
        console.log(err);
      }
    } else {
      // Update
      const existingDocument = existingRecap.data[0];
      existingDocument.jobCards = recapJobs;
      existingDocument.softSkills = recapSkills;
      existingDocument.motivationLetters = recapLetters;
      existingDocument.badges = recapBadges;
      existingDocument.formations = recapFormations;
      await client.save(existingDocument);
      documentId = existingDocument.id;
    }

    const shareObject = await client
      .collection("io.cozy.permissions")
      .createSharingLink({
        _id: documentId,
        _type: "visions.general"
      });

    const shortCode = shareObject.data.attributes.shortcodes.email;
    const url = `${location.protocol}//${location.host}/public?sharecode=${shortCode}`;
    console.log(url);

    try {
      const mailJob = await sendMail(client, {
        mode: "from",
        to: [{ name: "Conseiller", email: "felix@visionspol.eu" }],
        subjects: "Bilan de Réorientation",
        parts: [{ type: "text/plain", html: "Bilan de Réorientation: " + url }] // TODO Add body
      });
      console.log(mailJob);
    } catch (err) {
      log("error", `Failed to send email: ${err}`);
    }

    setRedirectToEnd(true);
  };

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
        setIno(prevIno => {
          prevIno[index] = response.data.response.content;
          return prevIno;
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (skills.length > 0) {
      let sorted = [];
      for (const s of skills[0].skills) {
        const existingIndex = sorted.findIndex(el => el.name == s.name);
        if (existingIndex == -1) {
          sorted.push({
            name: s.name,
            value: s.value,
            times: 1
          });
        } else {
          sorted[existingIndex].times++;
          if (sorted[existingIndex] < s.value) sorted[existingIndex] = s.value;
        }
      }
      setSortedSkills(sorted);
    }
  }, [skills]);

  if (redirectToEnd) {
    return <Redirect to="/end" />;
  } else {
    return (
      <div className="Detaillm">
        <div className="flex">
          <h2>Partage à ton conseiller</h2>
          <Accordion className="content-accor">
            <AccordionSummary className="accor-title blue summary">
              Récapitulatif
            </AccordionSummary>
            <AccordionDetails className="accor-detail flex center">
              <div className="summaryContainer">
                <h3>Les métiers sur lesquels tu es positionné :</h3>
                <div className="content-letter">
                  {jobCards.map(({ name }, index) => {
                    return (
                      <div key={index} className="summaryJob Sector">
                        <LettreConseillerPage
                          onClick={() => getFormations(name, index)}
                        />
                        <p>{name}</p>
                      </div>
                    );
                    {
                      /* <Accordion key={index} className="summaryJobContainer">
                      <AccordionSummary
                        className="summaryJob"
                        onClick={() => getFormations(name, index)}
                      >
                        <LettreConseillerPage />
                        {name}
                      </AccordionSummary>
                      <AccordionDetails className="accor-detail">
                        {ino[index] &&
                          ino[index].map((formation, yndex) => (
                            <div key={yndex} className="detail-formation-card">
                              <h2>{formation.title}</h2>
                            </div>
                          ))}
                      </AccordionDetails>
                    </Accordion> */
                    }
                  })}
                </div>
                <h3>Les secteurs sur lesquels tu es positionné :</h3>
                <div className="content-letter">
                  {sectors.map((sector, index) => (
                    <div key={index} className="letter summaryJob Sector">
                      <LettreConseillerPage />
                      <p>{sector}</p>
                    </div>
                  ))}
                </div>

                <h3>Tes lettres de motivations :</h3>
                <div className="content-letter">
                  {!lettersLoaded && <Loader />}
                  {!lettersError &&
                    letters.map((letter, index) => {
                      return (
                        <div key={index} className="letter summaryJob Sector">
                          <LettreConseillerPage />
                          <p>{letter.title}</p>
                        </div>
                      );
                    })}
                </div>
                <h3>Tes soft skills :</h3>
                <div className="content-soft recap">
                  {!skillsLoaded && <Loader />}
                  <div className="soft">
                    {!skillsError &&
                      sortedSkills.length > 0 &&
                      sortedSkills.map((skill, index) => (
                        <p key={index} className="summarySoftSkill">
                          {skill.name.charAt(0).toUpperCase() +
                            skill.name.slice(1)}
                        </p>
                      ))}
                  </div>
                </div>

                <h3>Tes badges de personnalité :</h3>
                <div className="content-badge">
                  {filteredBadges().map(({ name, value }, index) => {
                    return (
                      <div key={index} className="badge">
                        <img
                          src={possibleBadges[name.toLowerCase()]}
                          alt={name}
                        />
                        <p>
                          {name} : {value}%
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <button className="v-btn-next" onClick={() => shareToConseiller()}>
            Je partage à un conseiller
          </button>
        </div>
        <TabNavReo />
      </div>
    );
  }
};

export default ConseillerPage;
