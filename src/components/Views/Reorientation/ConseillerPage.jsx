import React, { useEffect, useState } from "react";
import TabNavReo from "./componentsReo/TabNav";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { useJsonFiles } from "../../Hooks/useJsonFiles";
import axios from "axios";
import { useDataOfType } from "../../Hooks/useDataOfType";
import { sendMail } from "../../../utils/sendMail";
import { useClient } from "cozy-client";
import log from "cozy-logger";
import Loader from "./componentsReo/loader/Loader";

const possibleBadges = [
  "dynamique",
  "empathique",
  "explorateur",
  "optimiste",
  "organise",
  "pluriactif",
  "pragmatique",
  "rapide",
  "respectueux",
  "sensible"
];

const getSVGPathForBadge = badgeName => {
  return `/img/${badgeName.toLowerCase()}.svg`;
};

const ConseillerPage = () => {
  const client = useClient();
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
  const filteredBadges = badges.filter(badge =>
    possibleBadges.includes(badge.name)
  );

  const shareToConseiller = async () => {
    /* eslint-disable no-console */
    console.log({ jobs: datas.map(el => el.name) });
    console.log({ sector: datas.map(el => el.secteur || "no data") });
    console.log({
      letters: letters.map(el => {
        return {
          title: el.title,
          content: el.content
        };
      })
    });
    console.log({ skills: sortedSkills });

    try {
      await sendMail(client, {
        mode: "from",
        to: [{ name: "NAME", email: "EMAIL" }],
        subjects: "SUBJECT",
        parts: [{ type: "text/plain", body: "STRING_BODY" }]
      });
    } catch (err) {
      log("error", `Failed to send email: ${err}`);
    }
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

  return (
    <div className="Detaillm">
      <div className="flex">
        <h2>Partage à ton conseiller</h2>
        <Accordion className="content-accor">
          <AccordionSummary className="accor-title blue">
            Récapitulatif
          </AccordionSummary>
          <AccordionDetails className="accor-detail flex center">
            <div className="contener-info">
              <h3>Les métiers sur lesquels tu es positionné :</h3>
              <div className="content-letter">
                {jobCards.map(({ name }, index) => (
                  <Accordion key={index} className="content-accor">
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
                            <h2>{formation.title}</h2>
                          </div>
                        ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
              <h3>Les secteurs sur lesquels tu es positionné :</h3>
              <div className="content-letter">
                {datas.map(({ secteur }, index) => (
                  <div key={index} className="letter">
                    <p>
                      {secteur ||
                        "Secteur non spécifié par Orientoi pour le moment"}
                    </p>
                  </div>
                ))}
              </div>

              <h3>Tes lettres de motivations :</h3>
              <div className="content-letter">
                {!lettersLoaded && <Loader />}
                {!lettersError &&
                  letters.map((letter, index) => {
                    return (
                      <div key={index} className="letter">
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
                      <p key={index}>
                        {skill.name.charAt(0).toUpperCase() +
                          skill.name.slice(1)}
                      </p>
                    ))}
                </div>
              </div>

              <h3>Tes badges de personnalité :</h3>
              <div className="content-badge">
                {filteredBadges.map(({ name, valeur, icon }, index) => {
                  return (
                    <div key={index} className="badge">
                      <img src={icon || getSVGPathForBadge(name)} alt={name} />
                      <p>
                        {name} : {valeur}%
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
        {/* <RouterLink to="/" className="v-btn-next">
          Je partage à un conseiller
        </RouterLink> */}
      </div>
      <TabNavReo />
    </div>
  );
};

export default ConseillerPage;
