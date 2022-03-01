import React from "react";

import { useI18n } from "cozy-ui/transpiled/react/I18n";
import Grid from "cozy-ui/transpiled/react/MuiCozyTheme/Grid";

import Accordion from "../../Accordion";
import Badge from "../../Badge";
import JobReadyIcon from "../../../assets/icons/jobready.svg";
import { useJsonFiles } from "../../Hooks/useJsonFiles";

const JobReady = () => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const datas = jsonFiles.jobready.data?.data?.[0]?.fields || [];

  return (
    <Accordion icon={JobReadyIcon} title={t("badges")}>
      <Grid className="u-mv-1" container spacing={2}>
        {datas.map(({ context: contexts, level, skill }, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <Badge
              title={skill}
              mainText={t("context") + ` : ${contexts.join(", ")}`}
              subText={t("level") + ` : ${level}`}
            />
          </Grid>
        ))}
      </Grid>
    </Accordion>
  );
};

export default JobReady;
