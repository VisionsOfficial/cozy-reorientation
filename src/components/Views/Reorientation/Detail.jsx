import React, { useState, useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import chev from "../../../assets/chev.png";
import Conseiller from "./componentsReo/Conseiller";
import TabNavReo from "./componentsReo/TabNav";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import FetchIno from "./componentsReo/FetchIno";
import ot from "../../../datas/orientoi.json";
import axios from "axios";

const Detail = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState(useParams().id);
  const [slug, setSlug] = useState("");
  const [ino, setIno] = useState([]);
  const [jobready, setJobready] = useState([]);
  const [description, setDescription] = useState("");
  const [jobreadyApiError, setJobreadyApiError] = useState(false);

  useEffect(() => {
    for (let i = 0; i < ot.jobCards.length; i++) {
      const obj = ot.jobCards[i];
      if (obj.id == id) {
        setName(obj.name);
        setSlug(obj.slug);
        setDescription(obj.description);
      }
    }
    const optionJob = {
      method: "POST",
      url:
        "https://eb-staging-environment-prediction-api.jobready.fr/predict-softskills/?sXBe8B7Rhqym=S8NrfuZM79bR",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        type: "Alternance",
        mission: description
      }
    };
    const options = {
      method: "GET",
      url: `https://api.inokufu.com/learningobject/v2/search-provider?lang=fr&model=strict&sort=popularity&distanceMax=100&max=20&address=cergy pontoise&match=best-effort&page=0&provider=CY Cergy Pontoise&keywords=${name}`,
      headers: {
        "x-api-key": "78HXmwkbulX2oLxRpEh1tzicH4dq524qnO4xgwd0"
      }
    };

    axios
      .request(options)
      .then(function(response) {
        console.log(response.data);
        setIno(response.data.response.content);
      })
      .catch(function(error) {
        console.error(error);
      });
    axios
      .request(optionJob)
      .then(function(response) {
        console.log(response);
        setJobready(response.soft_skills);
      })
      .catch(function(error) {
        setJobreadyApiError(true);
        console.error(error);
      });
  }, [name]);

  return (
    <div className="formation">
      <h2>{name}</h2>
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
              La pratique d'une langue étrangère est requise.
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
              L'activité de cet emploi/métier s'exerce au sein d'agences de
              publicité, de communication, de promotion des ventes, ou en
              indépendant, en relation avec différents services (direction,
              service informatique, communication, ...) et intervenants
              (clients, responsables de la production, imprimeurs, photographes,
              réalisateurs de films, ...).
              <br />
              <br />
              Elle varie selon le type de support (print, web, ...) et de média.
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
          {ino.map(data => {
            if (data.length != 0)
              return (
                <div key={data.id} className="detail-formation-card">
                  <h2>{data.title}</h2>
                  <div className="content-formation-detail">
                    <a target className="picture-detail">
                      <img src={data.picture} alt={data.name} />
                    </a>

                    <h2>Adresse</h2>
                    <p>{data.address}</p>
                    <h2>Durée</h2>
                    <h2>Description</h2>
                    <p>{data.description}</p>
                    <h2> Aller en lire plus</h2>
                    <p>
                      <a href={data.url}>{data.url}</a>{" "}
                    </p>
                  </div>
                </div>
              );
            return <h2>Aucune formation n'a été trouvé</h2>;
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion className="content-accor ">
        <AccordionSummary className="accor-title yel">
          Compétences associés
        </AccordionSummary>
        <AccordionDetails className="accor-detail">
          <div className="content-soft">
            {!jobreadyApiError &&
              jobready.map((softSkill, index) => {
                return (
                  <div key={index} className="soft">
                    <p>{softSkill.name}</p>
                  </div>
                );
              })}
            {jobreadyApiError && <div>Aucun softskills n'est trouvé </div>}
          </div>
        </AccordionDetails>
      </Accordion>
      <RouterLink to="/SoftSkills" className="v-btn-next">
        Match avec tes soft skills
      </RouterLink>
      <Conseiller />
    </div>
  );
};

export default Detail;
