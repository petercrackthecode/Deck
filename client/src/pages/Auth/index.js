import React, { useContext, useState } from 'react';
import { AuthContext, AuthContextProvider } from '../../Context/AuthContext';
import Logo from '../../assets/logo.png';
import { setUserSession } from '../../utils/common';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './style.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const _ = require('lodash');

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Auth() {
    const auth = useContext(AuthContext);
    const [isSignInFormActive, setSignInFormActive] = useState(true);
    const history = useHistory();
    const [alert, setAlert] = useState({
        isOpen: false,
        severity: 'success',
        message: '',
    });

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert({ ...alert, isOpen: false });
    };

    const handleSubmit = async (event, isSigningIn) => {
        event.preventDefault();
        const { setAuth, ...passedValue } = auth;
        if (!isSigningIn) {
            await axios
                .post(
                    'http://localhost:5000/api/auth/register',
                    _.cloneDeep(passedValue)
                )
                .then((res) => {
                    console.log(res);
                    auth.setAuth({
                        ...auth,
                        id: res.data.user._id,
                        email: res.data.user.email,
                        password: res.data.user.password,
                        name: res.data.user.name,
                        company_name: res.data.user.company_name,
                        admin: res.data.user.admin,
                        domains: res.data.user.domains,
                    });
                    
                    setUserSession(res.data.token, res.data.user);
                    setAlert({
                        isOpen: true,
                        message: 'Sign up successfully',
                        severity: 'success',
                    });
                    history.push('/edituser');
                })
                .catch((err) => {
                    console.log(`Got an error baby!`);
                    console.log(err);
                });
        } else {
            let token = null,
                user = null;

            console.log('Wassup');

            await axios
                .post('http://localhost:5000/api/auth/login', {
                    email: auth.email,
                    password: auth.password,
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.error) {
                        setAlert({
                            isOpen: true,
                            message: res.data.error || 'Error',
                            severity: 'error',
                        });
                    }

                    if (
                        res.data.user?._id !== null &&
                        res.data.token !== null
                    ) {
                        setAlert({
                            isOpen: true,
                            message: 'Sign in successfully',
                            severity: 'success',
                        });
                        token = res.data.token;
                        user = res.data.user;
                        auth.setAuth({
                            ...auth,
                            id: res.data.user._id,
                            email: res.data.user.email,
                            password: res.data.user.password,
                            name: res.data.user.name,
                            company_name: res.data.user.company_name,
                            admin: res.data.user.admin,
                            domains: res.data.user.domains,
                        });
                        setUserSession(res.data.token, res.data.user);
                        if (res.data.user.admin === true)
                            history.push('/admin');
                        else history.push('/user');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

            await axios
                .post('http://localhost:5000/api/pass-access-token', {
                    accessToken: token,
                    user: user,
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleUserInfo = (event, field) => {
        auth.setAuth({ ...auth, [field]: event.target.value });
    };

    return (
        <div id="auth">
            <Snackbar
                open={alert.isOpen}
                autoHideDuration={4000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleAlertClose} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
            <img alt="deck logo" src={Logo} />
            <div
                className={`container ${
                    isSignInFormActive ? '' : 'right-panel-active'
                }`}
                id="container"
            >
                <div className="form-container sign-up-container">
                    <form onSubmit={(event) => handleSubmit(event, false)}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="Name"
                            autoComplete="on"
                            value={auth.name}
                            onChange={(event) => handleUserInfo(event, 'name')}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Company"
                            autoComplete="on"
                            value={auth.company_name}
                            onChange={(event) =>
                                handleUserInfo(event, 'company_name')
                            }
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            autoComplete="on"
                            value={auth.email}
                            onChange={(event) => handleUserInfo(event, 'email')}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={auth.password}
                            onChange={(event) =>
                                handleUserInfo(event, 'password')
                            }
                            required
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={(e) => handleSubmit(e, true)}>
                        <h1>Sign in</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            autoComplete="username"
                            value={auth.email}
                            onChange={(event) => handleUserInfo(event, 'email')}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={auth.password}
                            onChange={(event) =>
                                handleUserInfo(event, 'password')
                            }
                            required
                        />
                        <button type="submit">Sign In</button>
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
