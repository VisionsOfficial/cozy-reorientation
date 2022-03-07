import React, { useState, useRef, useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import TabNavReo from "./componentsReo/TabNav";
import FileInput from "cozy-ui/transpiled/react/FileInput";
import upload from "../../../assets/upload-icon.png";
import Textarea from "cozy-ui/transpiled/react/Textarea";
import Letter from "./componentsReo/letter/Letter";
import Conseiller from "./componentsReo/Conseiller";
import { useClient } from "cozy-client";
import log from "cozy-logger";

import "../../../styles/buttons/buttons.styl";
import "../../../styles/letters/letters.styl";
import { getPdfText } from "../../../utils/pdfjsStuff";
import Loader from "./componentsReo/loader/Loader";
import { useDataOfType } from "../../Hooks/useDataOfType";
import PageLoader from "./componentsReo/page-loader/PageLoader";

const SoftSkills = () => {
  const client = useClient();
  const [toggleSoft, setToggleSoft] = useState(1);

  const letterContent = useRef();
  const letterTitle = useRef();

  const [
    letters,
    lettersLoaded,
    lettersError,
    setLetters,
    setLettersLoaded
  ] = useDataOfType("motivation-letter");

  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileUploadText, setFileUploadText] = useState(
    "Importer une lettre de motivation (PDF)"
  );

  const saveLetter = async () => {
    if (!letterTitle.current.value)
      return alert("Veuillez donner un nom à votre lettre de motivation");

    if (uploadedFile && letterContent.current.value != "")
      return alert(
        "Veuillez sélectionner une des deux options. Si vous avez importé une lettre de motivation, laissez le champ d'écriture manuscrite vide. Si vous préférez écrire votre lettre à la main, veuillez retirer le fichier importé."
      );

    if (!uploadedFile && !letterContent.current.value)
      return alert("Veuillez rajouter du contenu à votre lettre");

    const setTitle = letterTitle.current.value;

    setLettersLoaded(false);

    const textContent = uploadedFile
      ? await getPdfText(uploadedFile)
      : letterContent.current.value;

    client
      .save({
        _type: "visions.reorientation",
        currentType: "motivation-letter",
        title: setTitle,
        content: textContent,
        softSkills: [],
        softSkillsSaved: false
      })
      .then(res => {
        setLetters([...letters, res.data]);
      })
      .catch(err => {
        log("error", "Could not save letter: " + err);
      })
      .finally(() => {
        setLettersLoaded(true);
      });
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

  const removeFile = () => {
    setUploadedFile(null);
  };

  const doToggle = () => {
    if (letters.length != 0) {
      toggle(3);
    } else {
      toggle(2);
    }
  };

  useEffect(() => {
    if (uploadedFile) {
      setFileUploadText(uploadedFile.name);
    } else {
      setFileUploadText("Importer une lettre de motivation (PDF)");
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (letters.length) {
      toggle(3);
    }
  }, [letters]);

  // useEffect(() => {
  //   if (letters.length) {
  //     sessionStorage.setItem("motivation-letters", JSON.stringify(letters));
  //   }
  // }, [letters]);

  if (!lettersLoaded) {
    return <PageLoader title={"Chargement en cours..."} />;
  } else {
    return (
      <div className="Soft">
        <div className={toggleSoft === 1 ? "flex" : "none"}>
          <h2>Découvre les soft skills !</h2>
          <p>
            Importe ta ou tes lettres de motivations et découvre les soft skills
            qui y sont associés.
          </p>
          <p>Match les ensuite avec les soft skills des fiches métiers !</p>
          <button onClick={() => doToggle()} className="v-btn-nav">
            Continuer
          </button>
        </div>
        <div className={toggleSoft === 2 ? "flex" : "none"}>
          <h2>Ta lettre de motivation</h2>
          <FileInput
            id="pdfInput"
            className="file-selector"
            onChange={alertFileInput}
          >
            <img src={upload} alt="" />
            <span role="button">{fileUploadText}</span>
          </FileInput>
          {uploadedFile && (
            <button className="btnRemoveFile" onClick={() => removeFile()}>
              Retirer le fichier
            </button>
          )}
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
          {letters.length != 0 && (
            <button onClick={() => toggle(3)} className="v-btn-nav">
              Voir mes lettres
            </button>
          )}
        </div>

        {/* Letter list */}
        <div className={toggleSoft === 3 ? "flex" : "none"}>
          <h2>Découvre les soft skills !</h2>
          <p>Sélectionne une lettre pour voir les soft skills associés</p>
          <p>Match les ensuite avec les soft skills des fiches métiers !</p>

          <button onClick={() => toggle(2)} className="v-btn-nav">
            Ecrire ou importer une autre lettre
          </button>

          <div className="letter-container">
            {!lettersError && !lettersLoaded && <Loader />}
            {lettersError && (
              <h3>Une erreur est survenue en récupérant les données</h3>
            )}
            {!lettersError &&
              lettersLoaded &&
              letters.map(letter => (
                <Letter
                  letter={letter}
                  deleteLetter={deleteLetter}
                  key={letter.id}
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
  }
};

export default SoftSkills;
