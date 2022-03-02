import axios from "axios";

// const CURRENT_ENDPOINT =
//   "https://eb-staging-environment-prediction-api.jobready.fr/predict-softskills/?sXBe8B7Rhqym=S8NrfuZM79bR";
const CURRENT_ENDPOINT = "http://localhost:9513/jobready";

export const getSoftSkills = async mission => {
  try {
    const response = await axios.request({
      method: "POST",
      url: CURRENT_ENDPOINT,
      header: {
        "Content-Type": "application/json"
      },
      data: {
        type: "Alternance",
        mission: mission
      }
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};
