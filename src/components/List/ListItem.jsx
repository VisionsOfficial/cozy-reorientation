import React from "react";
import { Link } from "react-router-dom";

import UiListItem from "cozy-ui/transpiled/react/MuiCozyTheme/ListItem";
import ListItemIcon, {
  smallSize
} from "cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon";
import Icon from "cozy-ui/transpiled/react/Icon";
import ListItemText from "cozy-ui/transpiled/react/ListItemText";
import ListItemSecondaryAction from "cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction";
import Divider from "cozy-ui/transpiled/react/MuiCozyTheme/Divider";
import RightIcon from "cozy-ui/transpiled/react/Icons/Right";

const style = {
  link: {
    textDecoration: "none"
  }
};

const ListItem = ({ link, leftIcon, text, noDivider }) => {
  return (
    <>
      <Link style={style.link} to={link}>
        <UiListItem button>
          <ListItemIcon>
            <Icon icon={leftIcon} size={smallSize} />
          </ListItemIcon>
          <ListItemText primary={text} />
          <ListItemSecondaryAction>
            <Icon
              icon={RightIcon}
              size={smallSize}
              className="u-mr-1 u-coolGrey"
            />
          </ListItemSecondaryAction>
        </UiListItem>
      </Link>
      {!noDivider && <Divider variant="inset" />}
    </>
  );
};

ListItem.defaultProps = {
  hasDivider: false
};

export default ListItem;
