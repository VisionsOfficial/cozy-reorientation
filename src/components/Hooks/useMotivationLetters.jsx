import { useState, useEffect } from "react";
import { useClient, Q } from "cozy-client";
import log from "cozy-logger";

export const useMotivationLetters = () => {
  const client = useClient();
  const [letters, setLetters] = useState([]);
  const [lettersLoaded, setLettersLoaded] = useState(false);
  const [lettersError, setLettersError] = useState(false);

  useEffect(() => {
    const queryDef = Q("visions.reorientation").where({
      currentType: "motivation-letter"
    });
    client
      .query(queryDef)
      .then(res => {
        setLetters(res.data);
      })
      .catch(err => {
        log("error", `Could not fetch motivation letters: ${err.message}`);
        setLettersError(true);
      })
      .finally(() => {
        setLettersLoaded(true);
      });
  }, [client]);

  return [letters, lettersLoaded, lettersError, setLetters, setLettersLoaded];
};
