import React, { useState, useRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import chev from "../../../assets/chev.png";
import vectorTrois from "../../../assets/vector-trois.png";
import vectorUn from "../../../assets/vector-un.png";
import vectorDeux from "../../../assets/vector-deux.png";
import TabNavReo from "./componentsReo/TabNav";
import FileInput from "cozy-ui/transpiled/react/FileInput";
import upload from "../../../assets/upload-icon.png";
import Textarea from "cozy-ui/transpiled/react/Textarea";
import Conseiller from "./componentsReo/Conseiller";
import { useClient } from "cozy-client";

const SoftSkills = () => {
  const client = useClient();

  const saveLetter = async () => {
    const response = await client.save({
      _type: "visions.bilanorientation",
      title: letterTitle.current.value,
      content: letterContent.current.value
    });
    toggle(3);
  };
  const [toggleSoft, setToggleSoft] = useState(1);
  const letterContent = useRef();
  const letterTitle = useRef();

  const toggle = index => {
    setToggleSoft(index);
    console.log(index);
  };

  return (
    <div className="Soft">
      <div className={toggleSoft === 1 ? "flex" : "none"}>
        <h2>Découvre les soft skills !</h2>
        <p>
          Importe ta ou tes lettres de motivations et découvre les soft skills
          qui y sont associés.
        </p>
        <p>Match les ensuite avec les soft skills des fiches métiers !</p>

        <FileInput className="file-selector" onChange={console.log}>
          <img src={upload} alt="" />
          <span role="button">Importe une lettre de motivation</span>
        </FileInput>

        <button onClick={() => toggle(2)} className="v-btn-next">
          Confirmer
        </button>
      </div>
      <div className={toggleSoft === 2 ? "flex" : "none"}>
        <h2>Ta lettre de motivation</h2>
        <FileInput className="file-selector" onChange={console.log}>
          <img src={upload} alt="" />
          <span role="button">Importe une lettre de motivation</span>
        </FileInput>
        <h3>Ecris ta lettre de motivation :</h3>
        <Textarea className="textArea" ref={letterContent}></Textarea>
        <h3>Nomme ta lettre de motivation :</h3>
        <Textarea
          className="textAreaTiny"
          size="tiny"
          ref={letterTitle}
        ></Textarea>
        <button onClick={() => saveLetter()} className="v-btn-next softbtn">
          Confirmer
        </button>
      </div>
      <div className={toggleSoft === 3 ? "flex" : "none"}>
        <h2>Découvre les soft skills !</h2>
        <p>
          Importe ta ou tes lettres de motivations et découvre les soft skills
          qui y sont associés.
        </p>
        <p>Match les ensuite avec les soft skills des fiches métiers !</p>

        <FileInput className="file-selector" onChange={console.log}>
          <img src={upload} alt="" />
          <span role="button">Importe une lettre de motivation</span>
        </FileInput>

        <div className="content-lettre">
          <RouterLink to="/detailLm" className="lettre">
            <img className="vectorun" src={vectorUn} alt="" />
            <p>LM - Stage master</p>
          </RouterLink>

          <div className="lettre">
            <img className="vectordeux" src={vectorDeux} alt="" />
            <p>LM - Contrat alternance</p>
          </div>
          <div className="lettre">
            <img className="vectortrois" src={vectorTrois} alt="" />
            <p>LM - Entretien</p>
          </div>
        </div>

        <RouterLink
          to="/matchSoft"
          className={toggleSoft === 3 ? "v-btn-next trois" : "none"}
        >
          Choisi la lettre et le métier à matcher
        </RouterLink>

        <Conseiller />
      </div>
      <TabNavReo />
    </div>
  );
};

export default SoftSkills;
