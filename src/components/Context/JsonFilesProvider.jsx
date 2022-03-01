import React, { createContext, useEffect, useState } from "react";

import { useClient } from "cozy-client";

import { fetchJsonFileByName } from "../../utils/fetchJsonFileByName";

const JsonFilesContext = createContext();
// TODO Change the "name" attribute when connectors return JSON files instead of markdowns and check TODO on the fetchJsonFileByName file
// Best idea: see "getReferencedFolder" in "cozy-client/models/folder"
const jsonFilesDefault = {
  inokufu: {
    name: "Inokufu.json",
    data: [],
    dataLoaded: false
  },
  jobready: {
    name: "jobready.json",
    data: [],
    dataLoaded: false
  },
  orientoi: {
    name: "orientoi.json",
    data: [],
    dataLoaded: false
  }
};

const JsonFilesProvider = ({ children }) => {
  const client = useClient();
  const [allDataStatus, setAllDataStatus] = useState({
    isLoading: false,
    isLoaded: false
  });
  const [jsonFiles, setJsonFiles] = useState(jsonFilesDefault);

  useEffect(() => {
    (async () => {
      try {
        setAllDataStatus({ isLoading: true, isLoaded: false });
        for (const [key, value] of Object.entries(jsonFilesDefault)) {
          const jsonData = await fetchJsonFileByName(client, value.name);
          setJsonFiles(prev => ({
            ...prev,
            [key]: {
              ...prev[key],
              data: jsonData ? jsonData : [],
              dataLoaded: !!jsonData
            }
          }));
        }

        setAllDataStatus({ isLoading: false, isLoaded: true });
      } catch (error) {
        setAllDataStatus({ isLoading: false, isLoaded: false });
      }
    })();
  }, [client]);

  return (
    <JsonFilesContext.Provider value={{ jsonFiles, allDataStatus }}>
      {children}
    </JsonFilesContext.Provider>
  );
};

export default JsonFilesContext;

export { JsonFilesProvider };
