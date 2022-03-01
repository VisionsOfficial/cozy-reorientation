import React from "react";

import MuiAccordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import Typography from "cozy-ui/transpiled/react/Typography";
import Icon from "cozy-ui/transpiled/react/Icon";

const styles = {
  title: {
    textTransform: "none"
  }
};

const Accordion = ({ icon, title, children }) => {
  return (
    <MuiAccordion expanded>
      <AccordionSummary expandIcon={<Icon icon={icon} size={37} />}>
        <Typography variant="h6" component="div" style={styles.title}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
