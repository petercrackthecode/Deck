import React, { useState } from "react";
import axios from "axios";

function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    //       [e.target.name]: e.target.value,
    if (e.target.name === "email") setEmail(e.target.value);
    else setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = "",
        user = {};
    await axios
      .post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        // token is in res.data.token
        console.log(res);
        token = res.data.token;
        user = res.data.user;
      })
      .catch((err) => {
        console.log(err);
      });

      console.log(`Token at client is ${token}`);

    await axios
      .post("http://localhost:5000/api/pass-access-token", {
        "accessToken": token,
        "user": user
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <b>Email:</b>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
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
        </label>
        <br />
        <button
          type="submit"
          className="btn btn-light btn-outline-secondary text-center btn-style"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Landing;
