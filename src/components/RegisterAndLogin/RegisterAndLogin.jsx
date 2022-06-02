import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./registerandlogin.scss";
import login from "../Service/userservice";
import logo from "../../images/icoon.png";

const RegisterAndLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  };
  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPassword(value);
  };

  return (
    <>
      <section className="hero is-primary is-fullheight has-background-light	">
        <div className="hero-body">
          <div className="container">
            <div className="container has-text-centered">
              <div className="column is-8 is-offset-2">
                <h3 className="title    has-text-black	">Login</h3>
                <hr className="login-hr" />
                <p className="subtitle has-text-black	">Please login !</p>
                <form action="" className="box">
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                      <input
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
                    <button
                      type="button"
                      onClick={() => {
                        login(email, password);
                      }}
                      className="button is-black"
                    >
                      Login{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterAndLogin;
