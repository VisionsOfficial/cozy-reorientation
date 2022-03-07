import { useClient, Q } from "cozy-client";
import { useEffect, useState } from "react";
import log from "cozy-logger";

const VISIONS_DOCTYPE = "visions.reorientation";

export const useDataOfId = id => {
  const client = useClient();
  const [data, setData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    let unmounted = false;
    const queryDef = Q(VISIONS_DOCTYPE).where({
      currentType: "motivation-letter",
      _id: id
    });
    client
      .query(queryDef)
      .then(res => {
        if (unmounted) return;
        const { data } = res;
        let current;

        if (!data.length) current = data;
        else current = data.find(l => l.id == id);

        setData(current);
        setDataError(false);
      })
      .catch(err => {
        if (unmounted) return;
        log("error", `Could not fetch motivation data: ${err.message}`);
        setDataError(true);
      })
      .finally(() => {
        if (unmounted) return;
        setDataLoaded(true);
      });

    return () => {
      unmounted = true;
    };
  }, [client, id]);

  return [data, dataLoaded, dataError, setData];
};
