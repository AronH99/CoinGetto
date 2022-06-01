import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

import { API_KEY, baseurl } from "../../Helpers/NocoDataFlow";

const Register = () => {
  function signUp(email, password, voornaam, naam) {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "xc-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        "xc-auth":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5haW1lbGhhbW1vdWNoaUBpY2xvdWQuY29tIiwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiaWQiOiJ1c19jbWdhM2M5bHRoZTBqNiIsInJvbGVzIjoidXNlciIsImlhdCI6MTY1MzkxMTYyNX0.P_XTJe0kyi7l4DwYzndTqFtuncC1KP_G-FNTiz_2tDA",

        "Content-Type": "application/json",
      },
      body: `{
        "Voornaam": ${voornaam},
        "Email": ${email},
        "Naam": ${naam},
        "Password": ${password},
      }`,
    };

    return (
      fetch(
        `${baseurl}/api/v1/db/data/noco/groepswerkana/Users/views/Users`,
        requestOptions
      )
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
          console.log("Success:", data);
        })
        //Then with the error genereted...
        .catch((error) => {
          console.error("Error:", error);
        })
    );
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");

  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  };
  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPassword(value);
  };
  const handleChangeLastname = (e) => {
    const { name, value } = e.target;
    setLastname(value);
  };
  const handleChangeFirstname = (e) => {
    const { name, value } = e.target;
    setFirstname(value);
  };

  return (
    <>
      <div
        className="container box p-6
              has-background-light"
      >
        <h1
          className="title has-text-centered
               has-text-black"
        >
          CoinGetto
        </h1>
        <h2 className="subtitle has-text-centered">Sign Up Form</h2>
        <form action="" className="box">
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left">
              <input
                pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                type="email"
                name="email"
                placeholder="e.g. bobsmith@gmail.com"
                className="input"
                value={email}
                onChange={handleChangeEmail}
                required
              />
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Password
            </label>
            <div className="control has-icons-left">
              <input
                type="password"
                name="password"
                placeholder="*******"
                className="input"
                value={password}
                onChange={handleChangePassword}
                required
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              First name
            </label>
            <div className="control has-icons-left">
              <input
                type="firstname"
                name="firstname"
                maxLength="20"
                placeholder="first name"
                className="input"
                value={firstname}
                onChange={handleChangeFirstname}
                required
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Last name
            </label>
            <div className="control has-icons-left">
              <input
                type="lastname"
                name="lastname"
                maxLength="30"
                placeholder="last name"
                className="input"
                value={lastname}
                onChange={handleChangeLastname}
                required
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button
                type="button"
                onClick={() => {
                  signUp(email, password, lastname, firstname);
                }}
                className="button is-black "
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
