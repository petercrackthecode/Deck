import React from "react";
import "../styles/SignIn.css";
import { useState } from "react";
import axios from "axios";
import { setUserSession } from "../utils/common";
import { useHistory } from "react-router-dom";

function SignIn({ setUserid }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleChange = (e) => {
    //       [e.target.name]: e.target.value,
    if (e.target.name === "email") setEmail(e.target.value);
    else setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let token = null,
      user = null;

    console.log("Wassup");

    await axios
      .post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);

        if (res.data.user?._id !== null && res.data.token !== null) {
          token = res.data.token;
          user = res.data.user;
          setUserid(res.data.user._id);
          setUserSession(res.data.token, res.data.user);
          if (res.data.user.admin === true) history.push("/admin");
          else history.push("/user");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .post("http://localhost:5000/api/pass-access-token", {
        accessToken: token,
        user: user,
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(email);

  return (
    <div className="signInContainer">
      <h1>Sign In</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <input
            name="email"
            type=""
            placeholder="Email"
            required
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="form-control"
          />
        </label>
        <br />

        <button type="submit" className="loginButton">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
