import { useState, useEffect } from "react";
import { useClient, Q } from "cozy-client";
import log from "cozy-logger";

export const useDataOfType = currentType => {
  const client = useClient();
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    const queryDef = Q("visions.reorientation").where({
      currentType: currentType
    });
    client
      .query(queryDef)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        log("error", `Could not fetch motivation data: ${err.message}`);
        setDataError(true);
      })
      .finally(() => {
        setDataLoaded(true);
      });
  }, [client, currentType]);

  return [data, dataLoaded, dataError, setData, setDataLoaded];
};
