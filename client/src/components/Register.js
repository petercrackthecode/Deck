import React from 'react'
import '../styles/SignIn.css'
import {useState} from 'react'
import axios from 'axios'
import { setUserSession } from '../utils/common';
import {useHistory} from 'react-router-dom'

function Register({setUserid}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    let history = useHistory();

    const handleChange = (e) => {
    //       [e.target.name]: e.target.value,
    if(e.target.name === 'email')
        setEmail(e.target.value)
    else if (e.target.name == "password")
    setPassword(e.target.value)
    else{
        setName(e.target.value)
    }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
          .post("http://localhost:5000/api/auth/login", {
            email: email,
            password: password,
          })
          .then((res) => {
            console.log(res)
           setUserid(res.data.user?._id)
           setUserSession(res.data.token, res.data.user)
           history.push('/user')
          })
          .catch((err) => {
            console.log(err);
          });
      };


    return (
        <div className="signInContainer">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
            <label>
                    <input
                        name="name"
                        type=""
                        placeholder="Name"
                        required
                        onChange={handleChange}
                        className="form-control"
                    />
                </label><br />
                <label>
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
                    className="loginButton"
                >
                    Sign Up
            </button>
            </form>
        </div>
    )
}

export default Register
