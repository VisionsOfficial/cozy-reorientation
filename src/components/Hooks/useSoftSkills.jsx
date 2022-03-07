import { useEffect, useState } from "react";
import { getSoftSkills } from "../../utils/jobreadyApi";
import log from "cozy-logger";

export const useSoftSkills = dependency => {
  const [softSkills, setSoftSkills] = useState([]);
  const [softSkillsLoaded, setSoftSkillsLoaded] = useState(false);
  const [softSkillsError, setSoftSkillsError] = useState(false);

  useEffect(() => {
    let unmounted = false;
    if (dependency) {
      getSoftSkills(dependency.content)
        .then(res => {
          if (unmounted) return;
          if (res.soft_skills) {
            setSoftSkillsError(false);
            setSoftSkills(res.soft_skills);
          } else {
            setSoftSkillsError(true);
          }
        })
        .catch(err => {
          if (unmounted) return;
          log("error", "Could not get soft skills " + err);
          setSoftSkillsError(true);
        })
        .finally(() => {
          if (unmounted) return;
          setSoftSkillsLoaded(true);
        });
    }

    return () => {
      unmounted = true;
    };
  }, [dependency]);

  return [softSkills, softSkillsLoaded, softSkillsError];
};
