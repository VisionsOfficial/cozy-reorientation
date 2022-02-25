import React from "react";
import settingReo from "../../../../assets/settingReo.png";
import homeReo from "../../../../assets/homeReo.png";
import { NavLink as RouterLink } from "react-router-dom";

import logoutReo from "../../../../assets/logoutReo.png";

const TabNavReo = () => {
  return (
    <div>
      <div className="content-tab">
        <img src={settingReo} alt="" />
        <img src={homeReo} alt="" />
        <a href="http://home.cozy.localhost:8080/#/connected">
          <img src={logoutReo} alt="" />
        </a>
      </div>
    </div>
  );
};

export default TabNavReo;
