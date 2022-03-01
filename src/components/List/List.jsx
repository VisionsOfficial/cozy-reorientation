import React from "react";

import { useI18n } from "cozy-ui/transpiled/react/I18n";
import NavigationList, {
  NavigationListSection
} from "cozy-ui/transpiled/react/NavigationList";
import GraphCircleIcon from "cozy-ui/transpiled/react/icons/GraphCircle";
import StarIcon from "cozy-ui/transpiled/react/icons/Star";
import MagnifierIcon from "cozy-ui/transpiled/react/Icons/Magnifier";

import WorkIcon from "../../assets/icons/icon-work.svg";
import PersonalDataIcon from "../../assets/icons/icon-personal-data.svg";
import SchoolIcon from "../../assets/icons/icon-school.svg";

import ListItem from "./ListItem";

const List = () => {
  const { t } = useI18n();

  return (
    <NavigationList>
      <NavigationListSection>
        <div className="u-bg-white">
          <ListItem
            link="/softSkills"
            leftIcon={GraphCircleIcon}
            text={t("List.softSkills")}
          />
          <ListItem
            link="/wip"
            leftIcon={SchoolIcon}
            text={t("List.schoolReports")}
          />
          <ListItem link="/wip" leftIcon={WorkIcon} text={t("List.skills")} />
          <ListItem
            link="/jobExplorations"
            leftIcon={StarIcon}
            text={t("List.jobExplorations")}
          />
          <ListItem
            link="/wip"
            leftIcon={PersonalDataIcon}
            text={t("List.resumes")}
          />
          <ListItem
            link="/wip"
            leftIcon={MagnifierIcon}
            text={t("List.trainingSearch")}
            noDivider
          />
        </div>
      </NavigationListSection>
    </NavigationList>
  );
};

export default List;
