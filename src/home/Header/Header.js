import React, { Fragment } from "react";

import Logo from "../../Utility/Logo/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <Fragment>
      <div className="header ">
        <img
          src={Logo}
          alt="WSO2"
          width="60"
          height="30"
          className="header-logo"
        />
        <h5 className="header-logo">
          <b>Ballerina MIT IAP</b>
        </h5>
      </div>
    </Fragment>
  );
};

export default Header;
