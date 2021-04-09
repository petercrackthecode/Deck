import React, {useState} from 'react'
import axios from 'axios'
import { setUserSession } from '../utils/common';
import {useHistory} from 'react-router-dom'
import Layout from '../components/Layout';
import logo from '../assets/logo.png'
import Register from '../components/Register';
import '../styles/Login.css'
import GreetingTwo from '../components/GreetingTwo';

function SignUp({setUserid}) {
    return (
      <Layout>
        <div className="Login">
             <img className="logo" src={logo} alt="Deck logo"/>
             <div className="row">
               <GreetingTwo />
               <Register setUserid={setUserid}/>
             </div>
        </div>
      </Layout>
    )
}

export default SignUp