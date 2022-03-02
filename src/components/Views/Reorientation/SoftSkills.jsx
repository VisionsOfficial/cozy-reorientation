import React, { useState, useRef, useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";
// import chev from "../../../assets/chev.png";
import TabNavReo from "./componentsReo/TabNav";
import FileInput from "cozy-ui/transpiled/react/FileInput";
import upload from "../../../assets/upload-icon.png";
import Textarea from "cozy-ui/transpiled/react/Textarea";
import Letter from "./componentsReo/letter/Letter";
import Conseiller from "./componentsReo/Conseiller";
import { useClient, Q } from "cozy-client";
import log from "cozy-logger";

import "../../../styles/buttons/buttons.styl";
import "../../../styles/letters/letters.styl";

const VISIONS_DOCTYPE = "visions.reorientation";

const SoftSkills = () => {
  const client = useClient();
  const [toggleSoft, setToggleSoft] = useState(1);
  const [letters, setLetters] = useState([]);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [fileUploadText, setFileUploadText] = useState(
    "Importer une lettre de motivation (pdf, word)"
  );

  const letterContent = useRef();
  const letterTitle = useRef();

  useEffect(() => {
    const queryDef = Q(VISIONS_DOCTYPE).where({
      currentType: "motivation-letter"
    });
    client
      .query(queryDef)
      .then(res => {
        setLetters(res.data);
      })
      .catch(err => {
        log("error", `Could not fetch motivation letters: ${err.message}`);
      });
  }, [client]);

  const saveLetter = () => {
    if (!letterTitle.current.value)
      return alert("Veuillez donner un nom à votre lettre de motivation");

    if (uploadedFile) {
      client
        .save({
          _type: "io.cozy.files",
          currentType: "motivation-letter",
          title: letterTitle.current.value
        })
        .then(res => {
          setLetters([...letters, res.data]);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      client
        .save({
          _type: "visions.reorientation",
          currentType: "motivation-letter",
          title: letterTitle.current.value,
          content: letterContent.current.value
        })
        .then(res => {
          setLetters([...letters, res.data]);
        })
        .catch(err => {
          console.log(err);
        });
    }
    toggle(3);
  };

  const deleteLetter = letter => {
    client
      .destroy(letter)
      .then(res => {
        log("info", `deleter letter ${res.data.title} of id ${res.data.id}`);
        setLetters(letters.filter(l => l.id != res.data.id));
      })
      .catch(err => {
        log("error", `Failed to delete letter: ${err.message}`);
      });
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
        <button onClick={() => toggle(2)} className="v-btn-nav">
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
        <button onClick={() => saveLetter()} className="v-btn-nav">
          Confirmer
        </button>
        <button onClick={() => toggle(3)} className="v-btn-nav">
          Voir mes lettres
        </button>
      </div>
      <div className={toggleSoft === 3 ? "flex" : "none"}>
        <h2>Découvre les soft skills !</h2>
        <p>
          Importe ta ou tes lettres de motivations et découvre les soft skills
          qui y sont associés.
        </p>
        <p>Match les ensuite avec les soft skills des fiches métiers !</p>

        <button onClick={() => toggle(2)} className="v-btn-nav">
          Ecrire ou importer une lettre
        </button>

        <div className="letter-container">
          {letters.map((letter, index) => (
            <Letter
              letter={letter}
              index={index}
              deleteLetter={deleteLetter}
              key={index}
            />
          ))}
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
