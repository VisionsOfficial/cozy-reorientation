import { useClient, Q } from "cozy-client";
import { useEffect, useState } from "react";
import log from "cozy-logger";

const VISIONS_DOCTYPE = "visions.reorientation";

export const useMotivationLetter = id => {
  const client = useClient();
  const [letter, setLetter] = useState(null);
  const [letterLoaded, setLetterLoaded] = useState(false);
  const [letterError, setLetterError] = useState(false);

  useEffect(() => {
    const queryDef = Q(VISIONS_DOCTYPE).where({
      currentType: "motivation-letter",
      _id: id
    });
    client
      .query(queryDef)
      .then(res => {
        const { data } = res;
        let current;

        if (!data.length) current = data;
        else current = data.find(l => l.id == id);

        setLetter(current);
        setLetterError(false);
      })
      .catch(err => {
        log("error", `Could not fetch motivation letter: ${err.message}`);
        setLetterError(true);
      })
      .finally(() => {
        setLetterLoaded(true);
      });
  }, [client, id]);

  return [letter, letterLoaded, letterError];
};
