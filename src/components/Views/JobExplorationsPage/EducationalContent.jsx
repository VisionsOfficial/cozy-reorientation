import React from "react";

import { Media, Img, Bd } from "cozy-ui/transpiled/react/Media";
import Typography from "cozy-ui/transpiled/react/Typography";
import Icon from "cozy-ui/transpiled/react/Icon";

import EyeIcon from "../../../assets/icons/icon-eye.svg";

const imagebase64 = `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`;

const styles = {
  imgContainer: {
    paddingRight: "1rem"
  },
  img: {
    width: "65px",
    height: "60px"
  },
  keywords: {
    marginLeft: "10px",
    color: "#C4C4C4",
    padding: "8px",
    textTransform: "uppercase",
    backgroundColor: "#18233F",
    borderRadius: "6px",
    fontSize: "12px"
  },
  title: {
    color: "#21BBEF"
  }
};

const EducationalContent = ({ date, keywords, /* picture, */ title, url }) => {
  return (
    <Media>
      <Bd>
        <Media>
          <Img style={styles.imgContainer}>
            <img
              src={`data:image/jpg;base64,${imagebase64}`}
              style={styles.img}
            />
          </Img>
          <Bd>
            <div className="u-flex u-flex-items-center">
              <Typography variant="caption">{date}</Typography>
              <Typography
                style={styles.keywords}
                variant="body1"
                component="span"
              >
                {keywords}
              </Typography>
            </div>
            <Typography style={styles.title} variant="h6" component="div">
              {title}
            </Typography>
          </Bd>
        </Media>
      </Bd>
      <Img style={styles.imgContainer}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Icon icon={EyeIcon} size={40} />
        </a>
      </Img>
    </Media>
  );
};

export default EducationalContent;
