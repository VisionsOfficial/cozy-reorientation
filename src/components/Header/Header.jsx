import React, { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";

import useBreakpoints from "cozy-ui/transpiled/react/hooks/useBreakpoints";
import { useI18n } from "cozy-ui/transpiled/react/I18n";
import Typography from "cozy-ui/transpiled/react/Typography";
import IconButton from "cozy-ui/transpiled/react/IconButton";
import Icon from "cozy-ui/transpiled/react/Icon";
import PerviousIcon from "cozy-ui/transpiled/react/Icons/Previous";

const styles = {
  header: {
    paddingLeft: "2rem",
    paddingTop: "40px",
    height: "144px" // full height should be 184px
  },
  backButton: {
    color: "white"
  }
};

// TODO: should be in App.jsx
// <Route /> can pass prop to the mounted component directly
const Title = () => {
  const { pathname } = useLocation();
  const { t } = useI18n();

  let title = t("orientationReport");
  if (pathname === "/softSkills") {
    title = t("List.softSkills");
  } else if (pathname === "/jobExplorations") {
    title = t("List.jobExplorations");
  } else if (pathname === "/wip") {
    title = t("Travaux en cours");
  }

  return <>{title}</>;
};

const Header = () => {
  const { isMobile } = useBreakpoints();
  const { pathname } = useLocation();
  const history = useHistory();

  const showBackButton = pathname !== "/index" ? true : false;

  const goBack = useCallback(() => history.goBack(), [history]);
  if (isMobile) return null;

  return (
    <div style={styles.header} className="headerBackground">
      <div className="u-flex">
        {showBackButton && (
          <IconButton
            className="u-mr-1"
            style={styles.backButton}
            onClick={goBack}
          >
            <Icon icon={PerviousIcon} />
          </IconButton>
        )}
        <Typography variant="h2" className="u-white">
          <Title />
        </Typography>
      </div>
    </div>
  );
};

export default Header;
