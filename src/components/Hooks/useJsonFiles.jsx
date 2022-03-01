import { useContext } from "react";
import JsonFilesContext from "../Context/JsonFilesProvider";

export const useJsonFiles = () => {
  const jsonFilesContext = useContext(JsonFilesContext);
  if (!jsonFilesContext) {
    throw new Error("useJsonFiles must be used within a JsonFilesProvider");
  }
  return jsonFilesContext;
};
