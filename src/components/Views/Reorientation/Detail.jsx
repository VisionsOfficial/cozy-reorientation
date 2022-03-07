import React, { useState, useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Conseiller from "./componentsReo/Conseiller";
import TabNavReo from "./componentsReo/TabNav";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ot from "../../../datas/orientoi.json";
import axios from "axios";
import log from "cozy-logger";
import InokufuCard from "./componentsReo/inokufu-card/InokufuCard";
import Loader from "./componentsReo/loader/Loader";

import "../../../styles/buttons/buttons.styl";
// import { getSoftSkills } from "../../../utils/jobreadyApi";
import { useSoftSkills } from "../../Hooks/useSoftSkills";

const Detail = () => {
  const { id } = useParams();

  // Inokufu Api / data handling
  const [inokufuData, setInokufuData] = useState([]);
  const [inokufuDataLoaded, setInokufuDataLoaded] = useState(false);
  const [inokufuApiError, setInokufuApiError] = useState(false);

  const selectedJobcard = ot.jobCards.find(element => element.id == id);
  const dataForCustomJRHook = { content: selectedJobcard.description };

  const [jobready, jobreadyDataLoaded, jobreadyApiError] = useSoftSkills(
    dataForCustomJRHook
  );

  useEffect(() => {
    const inokufuOptions = {
      method: "GET",
      url: `https://api.inokufu.com/learningobject/v2/search-provider?lang=fr&model=strict&sort=popularity&distanceMax=100&max=20&address=cergy pontoise&match=best-effort&page=0&provider=CY Cergy Pontoise&keywords=${selectedJobcard.name}`,
      headers: {
        "x-api-key": "78HXmwkbulX2oLxRpEh1tzicH4dq524qnO4xgwd0"
      }
    };

    axios
      .request(inokufuOptions)
      .then(function(response) {
        log("info", `Data from inokufu: ${response.data.response.content}`);
        setInokufuData(response.data.response.content);
        setInokufuDataLoaded(true);
      })
      .catch(function(error) {
        setInokufuApiError(true);
        log("error", `Failed to get data from Inokufu: ${error}`);
      });
  }, [selectedJobcard]);

  if (selectedJobcard) {
    return (
      <div className="formation">
        <h2>{selectedJobcard.name}</h2>
        <div className="detailFormation">
          <TabNavReo />
          <Accordion className="content-accor">
            <AccordionSummary className="accor-title">
              Fiche métier
            </AccordionSummary>
            <AccordionDetails className="accor-detail">
              <div className="contener-info">
                <p>Type d’information : Métier</p>
              </div>
              <div className="contener-info">
                <h3>Définition</h3>
                <p>
                  Recherche et définit les concepts créatifs de projets multimédia
                  (communication, jeux vidéo, ...), supervise la réalisation des
                  projets retenus (maquette, rough, story-board) en cohérence avec
                  la stratégie commerciale. <br />
                  Peut coordonner une équipe.
                </p>
              </div>
              <div className="contener-info">
                <h3>Accès au métier</h3>
                <p>
                  Cet emploi/métier est accessible avec un diplôme de niveau Bac+2
                  (BTS, DUT, ...) à Master (Master professionnel, ...) dans les
                  secteurs de la communication, du multimédia, du marketing, du
                  commerce et de la publicité. <br />
                  <br />
                  Une formation artistique (École des beaux-arts, des arts
                  décoratifs...) peut être demandée.
                  <br />
                  <br />
                  {"La pratique d'une langue étrangère est requise."}
                  <br />
                  <br />
                  La maîtrise des outils de création informatique (publication
                  assistée par ordinateur -PAO-, palette graphique, image de
                  synthèse) est requise.
                </p>
              </div>
              <div className="contener-info">
                <h3>Condition du métier</h3>
                <p>
                  L&apos;activité de cet emploi/métier s&apos;exerce au sein
                  d&apos;agences de publicité, de communication, de promotion des
                  ventes, ou en indépendant, en relation avec différents services
                  (direction, service informatique, communication, ...) et
                  intervenants (clients, responsables de la production,
                  imprimeurs, photographes, réalisateurs de films, ...).
                  <br />
                  <br />
                  Elle varie selon le type de support (print, web, ...) et de
                  média.
                </p>
              </div>
              <div className="contener-info">
                <h3>Environnement de travail</h3>
                <p>
                  <b>Structure :</b>
                </p>
                <ul>
                  <li>Agence de communication</li>
                  <li>Agence de promotion et de marketing direct</li>
                  <li>Agence de publicité</li>
                  <li>Entreprise</li>
                  <li>Organe de presse</li>
                  <li>Studio de création graphique</li>
                  <li>Studio de développement de jeux vidéo</li>
                  <li>Studio de films d’animation</li>
                </ul>
                <p>
                  <b>Secteurs :</b>
                </p>
                <ul>
                  <li>Administration/Services de l’état</li>
                  <li>Editeur multimédia</li>
                </ul>
                <p>
                  <b>Conditions :</b>
                </p>
                <ul>
                  <li>Travail en indépedant</li>
                </ul>
              </div>
              <div className="contener-info">
                <h3>Compétences de base attendues :</h3>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion className="content-accor ">
            <AccordionSummary className="accor-title red">
              Formations associés
            </AccordionSummary>
            <AccordionDetails className="accor-detail">
              {!inokufuApiError &&
                inokufuDataLoaded &&
                inokufuData.length != 0 &&
                inokufuData.map(
                  (
                    { title, name, url, picture, description, address },
                    index
                  ) => (
                    <InokufuCard
                      key={index}
                      title={title}
                      name={name}
                      url={url}
                      picture={picture}
                      description={description}
                      address={address}
                    />
                  )
                )}
              {!inokufuApiError &&
                inokufuDataLoaded &&
                inokufuData.length == 0 && <h3>Aucune formation associée</h3>}
              {!inokufuApiError && !inokufuDataLoaded && <Loader />}
              {inokufuApiError && <h3>Erreur lors du chargement des données</h3>}
            </AccordionDetails>
          </Accordion>
          <Accordion className="content-accor ">
            <AccordionSummary className="accor-title yel">
              Compétences associés
            </AccordionSummary>
            <AccordionDetails className="accor-detail">
              <div className="content-soft">
                {!jobreadyApiError &&
                  jobreadyDataLoaded &&
                  jobready.map((softSkill, index) => {
                    return (
                      <div key={index} className="soft">
                        <p>{softSkill.name}</p>
                      </div>
                    );
                  })}
                {!jobreadyApiError && !jobreadyDataLoaded && <Loader />}
                {jobreadyApiError && (
                  <div className="soft">
                    Une erreur est survenue lors de la récupération des
                    compétences associées auprès de Jobready
                  </div>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="v-btn-container">
          <RouterLink to="/SoftSkills" className="v-btn-nav">
            Match avec tes soft skills
          </RouterLink>
          <RouterLink to="/Formation" className="v-btn-nav">
            Retour aux formations
          </RouterLink>
        </div>
        <Conseiller />
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Detail;
