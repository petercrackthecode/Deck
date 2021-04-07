import React from "react";
import Layout from "../components/Layout";
import logo from "../assets/logo.png";
import SignIn from "../components/SignIn";
import "../styles/Login.css";
import Greeting from "../components/Greeting";

function Login({ setUserid }) {
  return (
    <Layout>
      <div className="Login">
        <img className="logo" src={logo} alt="Deck logo" />
        <div className="row">
          <SignIn setUserid={setUserid} />
          <Greeting />
        </div>
      </div>
    </Layout>
  );
}

export default Login;

{
  /* <form  onSubmit={handleSubmit}>
            <label>
              <b>Email:</b>
              <input
                name="email"
                type=""
                placeholder="Email"
                required
                onChange={handleChange}
                className="form-control"
              />
            </label><br />
            <label>
              <b>Password:</b>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="form-control"
              />
            </label><br />
            <button
              type="submit"
              className="btn btn-light btn-outline-secondary text-center btn-style"
            >
              Sign In
            </button>
            </form> */
}
