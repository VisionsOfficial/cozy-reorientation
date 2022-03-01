import React, { useState, useRef, useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";
// import chev from "../../../assets/chev.png";
import vectorTrois from "../../../assets/vector-trois.png";
import vectorUn from "../../../assets/vector-un.png";
import vectorDeux from "../../../assets/vector-deux.png";
import TabNavReo from "./componentsReo/TabNav";
import FileInput from "cozy-ui/transpiled/react/FileInput";
import upload from "../../../assets/upload-icon.png";
import Textarea from "cozy-ui/transpiled/react/Textarea";
import Conseiller from "./componentsReo/Conseiller";
import { useClient } from "cozy-client";
// import log from "cozy-logger";

const SoftSkills = () => {
  const client = useClient();
  const [toggleSoft, setToggleSoft] = useState(1);
  const [letters, setLetters] = useState([
    { title: "Stage Master", content: "Tmp" },
    { title: "Contrat alternance", content: "Tmp" },
    { title: "Entretien", content: "Tmp" }
  ]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileUploadText, setFileUploadText] = useState(
    "Importer une lettre de motivation (pdf, word)"
  );

  const letterContent = useRef();
  const letterTitle = useRef();

  const styleVectors = [vectorUn, vectorDeux, vectorTrois];

  const saveLetter = () => {
    if (uploadedFile) {
      client
        .save({
          _type: "visions.reorientation",
          title: uploadedFile.name
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      client
        .save({
          _type: "visions.reorientation",
          title: letterTitle.current.value,
          content: letterContent.current.value
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    toggle(3);
  };

  const toggle = index => {
    setToggleSoft(index);
  };

  const alertFileInput = fileData => {
    setUploadedFile(fileData);
  };

  useEffect(() => {
    if (uploadedFile) {
      setFileUploadText(uploadedFile.name);
    }
  }, [uploadedFile]);

  return (
    <div className="Soft">
      <div className={toggleSoft === 1 ? "flex" : "none"}>
        <h2>Découvre les soft skills !</h2>
        <p>
          Importe ta ou tes lettres de motivations et découvre les soft skills
          qui y sont associés.
        </p>
        <p>Match les ensuite avec les soft skills des fiches métiers !</p>

        <button onClick={() => toggle(2)} className="v-btn-next">
          Continuer
        </button>
      </div>
      <div className={toggleSoft === 2 ? "flex" : "none"}>
        <h2>Ta lettre de motivation</h2>
        <FileInput className="file-selector" onChange={alertFileInput}>
          <img src={upload} alt="" />
          <span role="button">{fileUploadText}</span>
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

        <FileInput className="file-selector" onChange={alertFileInput}>
          <img src={upload} alt="" />
          <span role="button">{fileUploadText}</span>
        </FileInput>

        {/* //! Hardcoded letters */}
        <div className="content-lettre">
          {letters.map((letter, index) => (
            <RouterLink key={index} to={"/detailLm" + index} className="lettre">
              <img className={"vector" + index} src={styleVectors[index]} />
              <p>LM - {letter.title}</p>
            </RouterLink>
          ))}
          {/* 
          <div className="lettre">
            <img className="vectordeux" src={vectorDeux} alt="" />
            <p>LM - Contrat alternance</p>
          </div>
          <div className="lettre">
            <img className="vectortrois" src={vectorTrois} alt="" />
            <p>LM - Entretien</p>
          </div> */}
        </div>

        <RouterLink
          to="/matchSoft"
          className={toggleSoft === 3 ? "v-btn-next trois" : "none"}
        >
          Choisis la lettre et le métier à matcher
        </RouterLink>

        <Conseiller />
      </div>
      <TabNavReo />
    </div>
  );
};

export default SoftSkills;
