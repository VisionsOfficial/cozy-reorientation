import React from "react";
import settingReo from "../../../../assets/settingReo.png";
import homeReo from "../../../../assets/img/homeReo.png";
import { NavLink as RouterLink } from "react-router-dom";

import logoutReo from "../../../../assets/logoutReo.png";

const TabNavReo = () => {
  return (
    <div>
      <div className="content-tab">
        <RouterLink to="/#">
          <img src={settingReo} alt="settings" />
        </RouterLink>
        <RouterLink to="/home">
          <img src={homeReo} alt="home" />
        </RouterLink>
        <a href="http://home.cozy.localhost:8080/#/connected">
          <img src={logoutReo} alt="logout" />
        </a>
      </div>
    </div>
  );
};

export default TabNavReo;
