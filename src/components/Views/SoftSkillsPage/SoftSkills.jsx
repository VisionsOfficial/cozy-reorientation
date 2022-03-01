import React from "react";

import { useI18n } from "cozy-ui/transpiled/react/I18n";
import Grid from "cozy-ui/transpiled/react/MuiCozyTheme/Grid";

import Accordion from "../../Accordion";
import SoftSkill from "./SoftSkill";
import SoftSkillIcon from "../../../assets/icons/orientoi.svg";
import { useJsonFiles } from "../../Hooks/useJsonFiles";

const SoftSkills = () => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const datas = jsonFiles.orientoi.data?.data?.badges || [];

  return (
    <Accordion icon={SoftSkillIcon} title={t("softSkills")}>
      <Grid className="u-mv-1" container spacing={2}>
        {Object.entries(datas).map(([key, value], index) => (
          <Grid key={index} item xs={12} sm={4}>
            <SoftSkill label={key} value={value} />
          </Grid>
        ))}
      </Grid>
    </Accordion>
  );
};

export default SoftSkills;
