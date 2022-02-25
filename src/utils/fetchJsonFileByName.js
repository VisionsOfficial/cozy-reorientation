import log from "cozy-logger";
import { Q, fetchPolicies } from "cozy-client";

const FILES_DOCTYPE = "io.cozy.files";

const fileToArrayBuffer = async file => {
  // if ('arrayBuffer' in file) return await file.arrayBuffer()

  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onerror = reject;
    reader.onload = e => resolve(e.target.result);
    reader.readAsText(file);
  });
};

export const fetchJsonFileByName = async (client, name) => {
  try {
    const fileColl = client.collection(FILES_DOCTYPE);
    const queryDef = Q(FILES_DOCTYPE)
      .where({ name: name })
      .partialIndex({
        type: "file",
        trashed: false
      })
      .indexFields(["name"]);

    const { data } = await client.query(queryDef, {
      as: `fetchJsonFileByName/${name}`,
      fetchPolicy: fetchPolicies.noFetch()
    });
    console.log(data);

    // FIX Data also contains the files flaged "trashed", see https://github.com/cozy/cozy-client/issues/1091
    const result = data ? data.filter(d => !d.trashed) : [];

    const dataBin = await fileColl.fetchFileContentById(result[0]._id);

    // TODO START Currently the fetching of files by connectors is markdown type, we need to convert them to json object
    const dataBlob = await dataBin.blob();
    let test = await fileToArrayBuffer(dataBlob);
    const formatJSON = test
      .replaceAll("```json", '{ "data":')
      .replaceAll("```", "}");

    return JSON.parse(formatJSON);
    // TODO END
  } catch (error) {
    log("error", `Can't fetch data for file ${name}: ${error}`);
    return null;
  }
};
