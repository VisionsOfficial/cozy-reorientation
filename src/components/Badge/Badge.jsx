import React from "react";

import Typography from "cozy-ui/transpiled/react/Typography";
import Icon from "cozy-ui/transpiled/react/Icon";

import IdeaIcon from "../../assets/icons/icon-idea.svg";

const styles = {
  icon: {
    marginBottom: "0.5rem"
  },
  title: {
    textTransform: "capitalize",
    color: "#21BBEF",
    width: "100%",
    textAlign: "center"
  },
  subText: {
    fontWeight: 200
  }
};

const Badge = ({ title, mainText, subText }) => {
  return (
    <div className="u-flex u-flex-column u-flex-items-center">
      <Icon style={styles.icon} icon={IdeaIcon} size={40} />
      <Typography style={styles.title} variant="h6" component="div" noWrap>
        {title}
      </Typography>
      <Typography className="u-mv-half" variant="body1">
        {mainText}
      </Typography>
      <Typography style={styles.subText} variant="body1">
        {subText}
      </Typography>
    </div>
  );
};

export default Badge;
