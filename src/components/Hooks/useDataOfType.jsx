import { useState, useEffect } from "react";
import { useClient, Q } from "cozy-client";
import log from "cozy-logger";

export const useDataOfType = currentType => {
  const client = useClient();
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    let unmounted = false;
    const queryDef = Q("visions.reorientation").where({
      currentType: currentType
    });
    client
      .query(queryDef)
      .then(res => {
        if (unmounted) return;
        setData(res.data);
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
  }, [client, currentType]);

  return [data, dataLoaded, dataError, setData, setDataLoaded];
};
