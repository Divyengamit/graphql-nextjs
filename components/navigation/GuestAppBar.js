import React from "react";
import { Toolbar, AppBar } from "@mui/material";
import Image from "next/image";

const logo = require("../../assets/logo.png");
const docModeLogo = require("../../assets/Docmode-logo.png");

const GuestAppBar = () => (
  <AppBar position="static">
    <Toolbar>
      {/* <img src={logo} style={{ height: 32 }} />
      <img src={docModeLogo} style={{ height: 32, marginLeft: "auto" }} /> */}
      <div className={"form-header-div"}>
        <div>
          <Image src={logo} height={32} width={118} alt="logo" />
        </div>
        <div>
          <Image src={docModeLogo} height={32} width={150} alt="modeLogo" />
        </div>
      </div>
    </Toolbar>
  </AppBar>
);

export default GuestAppBar;
