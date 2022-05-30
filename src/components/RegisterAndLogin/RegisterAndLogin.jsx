import React from "react";
import Navbar from "../Navbar/Navbar";
import "./registerandlogin.scss";

const RegisterAndLogin = () => {
  return (
    <>
      <section class="hero is-primary is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="container has-text-centered">
              <div class="column is-8 is-offset-2">
                <h3 class="title has-text-white">Login</h3>
                <hr class="login-hr" />
                <p class="subtitle has-text-white">Please login !</p>
                <div class="box">
                  <div class="box">
                    <img src="" alt="Photo of the logo" />
                  </div>
                </div>
                <form action="" class="box">
                  <div class="field">
                    <label for="" class="label">
                      Email
                    </label>
                    <div class="control has-icons-left">
                      <input
                        type="email"
                        placeholder="e.g. bobsmith@gmail.com"
                        class="input"
                        required
                      />
                      <span class="icon is-small is-left">
                        <i class="fa fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                  <div class="field">
                    <label for="" class="label">
                      Password
                    </label>
                    <div class="control has-icons-left">
                      <input
                        type="password"
                        placeholder="*******"
                        class="input"
                        required
                      />
                      <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <div class="field">
                    <label for="" class="checkbox">
                      <input type="checkbox" />
                      Remember me
                    </label>
                  </div>
                  <div class="field">
                    <button class="button is-success">Login</button>
                  </div>
                </form>
                <p class="has-text-grey">
                  <a href="">Sign Up</a>
                  <a href="">Forgot Password</a>
                  <a href="">Need Help?</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterAndLogin;
