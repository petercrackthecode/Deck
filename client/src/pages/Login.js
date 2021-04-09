import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../utils/common";
import { useHistory } from "react-router-dom";
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