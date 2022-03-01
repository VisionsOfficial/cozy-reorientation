import React from "react";

import Typography from "cozy-ui/transpiled/react/Typography";
import Icon from "cozy-ui/transpiled/react/Icon";

import StarIcon from "../../../assets/icons/icon-star.svg";

const styles = {
  icon: {
    marginBottom: "0.5rem"
  },
  text: {
    textTransform: "capitalize"
  }
};

const SoftSkill = ({ label, value }) => {
  //
  return (
    <div className="u-flex u-flex-column u-flex-items-center">
      <Icon style={styles.icon} icon={StarIcon} size={40} />
      <Typography style={styles.text} variant="h6" component="div">
        {label} : {value}
      </Typography>
    </div>
  );
};

export default SoftSkill;
