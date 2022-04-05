import React, { useEffect, useState } from "react";
import CozyClient from "cozy-client";
import getSharedDocument from "cozy-sharing/dist/getSharedDocument";
import log from "cozy-logger";
import RecapElementData from "./RecapElementData";

function getParameterByName(paramName, url = window.location.href) {
  // eslint-disable-next-line
  const name = paramName.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const getDataset = function() {
  const root = document.querySelector("[role=application]");
  return JSON.parse(root.dataset.cozy);
};

const RecapPage = () => {
  const [document, setDocument] = useState();
  const [error, setError] = useState(false);

  const shareCode = getParameterByName("sharecode");
  const dataset = getDataset();

  const protocol = window.location ? window.location.protocol : "https:";
  const cozyUrl = `${protocol}//${dataset.domain}`;

  const client = new CozyClient({
    uri: cozyUrl,
    token: shareCode,
    store: false
  });

  useEffect(() => {
    getSharedDocument(client)
      .then(sharedDocument => {
        client
          .collection("visions.general")
          .get(sharedDocument)
          .then(doc => {
            setDocument(doc.data);
          })
          .catch(err => {
            log("error", err);
            setError(true);
          });
      })
      .catch(err => log("error", err));
    // eslint-disable-next-line
  }, []);

  console.log(document);

  if (document && !error) {
    return (
      <div className="publicRecapContainer">
        <h4>Récapitulatif du bilan de Réorientation</h4>
        <RecapElementData
          title={"Formations"}
          document={document}
          dataKey={"formations"}
          elementKey={"name"}
        />
        <RecapElementData
          title={"Métiers"}
          document={document}
          dataKey={"jobCards"}
          elementKey={"name"}
        />
        <RecapElementData
          title={"Lettres de motivation"}
          document={document}
          dataKey={"motivationLetters"}
          elementKey={"title"}
        />
        <RecapElementData
          title={"Soft Skills"}
          document={document}
          dataKey={"softSkills"}
          elementKey={"name"}
        />

        <h3>Badges de personnalité</h3>
        {Object.keys(document.badges).map((key, i) => (
          <div key={i}>
            {key} : {document.badges[key]}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="endContainer">
        <p>Aucune information trouvée</p>
      </div>
    );
  }
};

export default RecapPage;
