import { Link, NavLink } from "react-router-dom";
import logo from "../../images/icoon.png";
import "./navbar.scss";

const Navbar = () => {
  if (localStorage.length === 0) {
    return (
      <>
        <nav className="navbar has-shadow is-white is-fixed-top">
          <div className="container">
            <div className="navbar-brand">
              <div className="navbar-item">
                <img src={logo} alt="logo" id="logoImg" />
                <p className="title" id="navTitle">
                  CoinGetto
                </p>
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
                <NavLink to="/register" className="navbar-item">
                  Register
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="navbar has-shadow is-white is-fixed-top">
          <div className="container">
            <div className="navbar-brand">
              <div className="navbar-item">
                <img src={logo} alt="logo" id="logoImg" />
                <p className="title" id="navTitle">
                  CoinGetto
                </p>
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

                <button
                  type="button"
                  id="BtnLogOut"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                  className="navbar-item"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
};

export default Navbar;
