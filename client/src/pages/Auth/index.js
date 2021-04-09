import React, { useContext, useState } from 'react';
import { AuthContext, AuthContextProvider } from '../../Context/AuthContext';
import Logo from '../../assets/logo.png';

import './style.css';

export default function Auth() {
    const auth = useContext(AuthContext);
    const [isSignInFormActive, setSignInFormActive] = useState(true);

    const handleUserInfo = (event, field) => {
        auth.setAuth({...auth, [field]: event.target.value})
    }

    return (
        <div id="auth">
            <img alt="deck logo" src={Logo}/>
            <div
                className={`container ${
                    isSignInFormActive ? '' : 'right-panel-active'
                }`}
                id="container"
            >
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="Name"
                            autoComplete="on"
                            value={auth.name}
                            onChange={(event) => handleUserInfo(event, "name")}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            autoComplete="on"
                            value={auth.email}
                            onChange={(event) => handleUserInfo(event, "email")}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={auth.password}
                            onChange={(event) => handleUserInfo(event, "password")}
                        />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            autoComplete="username"
                            value={auth.email}
                            onChange={(event) => handleUserInfo(event, "email")}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={auth.password}
                            onChange={(event) => handleUserInfo(event, "password")}
                        />
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>
                                To keep connected with us please login with your
                                personal info
                            </p>
                            <button
                                className="ghost"
                                id="signIn"
                                onClick={() =>
                                    setSignInFormActive(!isSignInFormActive)
                                }
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>
                                Enter your personal details and start journey
                                with us
                            </p>
                            <button
                                className="ghost"
                                id="signUp"
                                onClick={() =>
                                    setSignInFormActive(!isSignInFormActive)
                                }
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
