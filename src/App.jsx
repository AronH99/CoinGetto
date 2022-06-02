import { React, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import DisplayTopCoins from "./components/DisplayTopCoins/DisplayTopCoins";
import RegisterAndLogin from "./components/RegisterAndLogin/RegisterAndLogin";
import Register from "./components/Register/Register";
import Portfolio from "./components/Portfolio/Portfolio";
import Detail from "./components/Detail/Detail";
import "./reset.scss";
import "./style.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";

const App = () => {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<DisplayTopCoins />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="login" element={<RegisterAndLogin />} />
          <Route path="register" element={<Register />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
