import { React, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import DisplayTopCoins from "./components/DisplayTopCoins/DisplayTopCoins";
import RegisterAndLogin from "./components/RegisterAndLogin/RegisterAndLogin";
import Portfolio from "./components/Portfolio/Portfolio";
import "./reset.scss";
import "./style.scss";

const App = () => {
  return (
    <>
      <DisplayTopCoins />
    </>
  );
};

export default App;
