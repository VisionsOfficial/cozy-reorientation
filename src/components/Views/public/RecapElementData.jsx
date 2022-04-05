import React from "react";

const RecapElementData = ({ title, document, dataKey, elementKey }) => {
  const getEmptyText = key => {
    switch (key) {
      case "formations":
        return "Aucune formation associée.";
      case "jobCards":
        return "Aucun métier associé.";
      case "softSkills":
        return "Aucune compétence douce associée.";
      case "motivationLetters":
        return "Aucune lettre de motivation.";
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      {!document[dataKey].length && <h5>{getEmptyText(dataKey)}</h5>}
      <ul>
        {document[dataKey].map((element, i) => (
          <li key={i}>{element[elementKey]}</li>
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default RecapElementData;
