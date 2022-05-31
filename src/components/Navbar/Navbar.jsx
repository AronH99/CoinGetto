import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  return (
    <>
      <nav className="navbar has-shadow is-white is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item">
              <img src="/src/images/icoon.png" alt="logo" id="logoImg" />
              <p className="title" id="navTitle">
                Coin Getto
              </p>
            </div>

            <div className="navbar-item">
              <form action="" className="field is-grouped" id="search">
                <p className="control is-expanded">
                  <input
                    className="input is-small"
                    type="text"
                    placeholder="e.g. Bitcoin, ETH"
                  />
                </p>
                <div className="control">
                  <a className="button has-background-light" id="searchBtn">
                    Search
                  </a>
                </div>
              </form>
            </div>
            <div
              className="navbar-burger"
              id="burger"
              onClick={() => {
                const navbarMenu = document.querySelector("#nav-links");
                navbarMenu.classList.toggle("is-active");
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="nav-links" className="navbar-menu">
            <div className="navbar-end">
              <NavLink to="/" className="navbar-item">
                Home
              </NavLink>
              <NavLink to="/portfolio" className="navbar-item">
                Portfolio
              </NavLink>
              <NavLink to="/login" className="navbar-item">
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
