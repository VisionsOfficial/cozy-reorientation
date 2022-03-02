import React from "react";
import Conseiller from "./componentsReo/Conseiller";
import TabNavReo from "./componentsReo/TabNav";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import question from "../../../assets/question.png";

const DetailLm = () => {
  return (
    <div className="Detaillm">
      <div className="flex">
        <h2>Lettre de motivation Stage master</h2>
        <div className="content-lettre">
          <div className="lettre">
            <p>LM - Stage master</p>
          </div>
          <h3>Les soft skills de “LM - Stage master” :</h3>
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
          </div>
        </div>
      </div>
      <Conseiller />
      <TabNavReo />
    </div>
  );
};

export default DetailLm;
