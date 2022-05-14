import { React, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import DisplayTopCoins from "./components/DisplayTopCoins/DisplayTopCoins";
import RegisterAndLogin from "./components/RegisterAndLogin/RegisterAndLogin";
import Portfolio from "./components/Portfolio/Portfolio";
import "./reset.scss";
import "./style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DisplayTopCoins />} />
          <Route path="portfolio" element={<Portfolio />} />
          {/* <Route path="login" element={<RegisterAndLogin />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
