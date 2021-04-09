import axios from 'axios';
import React, { useState, useContext } from 'react';
import { getToken } from '../utils/common';
import { useHistory } from 'react-router-dom';
import validator from 'validator';

import {AuthContext} from '../Context/AuthContext';

function EditUser({ userId }) {
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const auth = useContext(AuthContext)
    let history = useHistory();

    const updateChange = (e) => {
        console.log(e.target.name);
        if (e.target.name === 'name') setName(e.target.value);
        else if (e.target.name === 'companyName')
            setCompanyName(e.target.value);
        else if (e.target.name === 'password') setPassword(e.target.value);
        else setConfirm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(password);
        var newData = {
            _id: auth.id,
        };
        if (!validator.equals(password, confirm)) {
            setPasswordError('Passwords did not match');
            setPassword('');
            setConfirm('');
        }
        if (name != '') newData['name'] = name;
        if (companyName != '') newData['company_name'] = companyName;
        if (password != '') newData['password'] = password;
        console.log(newData);
        axios
            .post('http://localhost:5000/api/auth/update', newData, {
                headers: { 'x-access-token': getToken() },
            })
            .then((res) => console.log(res))
            .then(() => history.push('/user'))
            .catch(err => {
				console.log(`Failure making a post request at 'http://localhost:5000/api/auth/update'`);
				console.log(err);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <b>Edit name:</b>
                    <input
                        name="name"
                        type=""
                        placeholder="name"
                        onChange={updateChange}
                    />
                    <br />
                    <br />
                </label>
                <label>
                    <b>Company name:</b>
                    <input
                        name="companyName"
                        type=""
                        placeholder="Company Name"
                        onChange={updateChange}
                    />
                </label>
                <br />
                <br />
                <label>
                    <b>password:</b>
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={updateChange}
                    />
                </label>
                <br />
                <br />
                <label>
                    <b>confirm password:</b>
                    <input
                        name="confirm"
                        type="password"
                        placeholder="confirm password"
                        onChange={updateChange}
                    />
                </label>
                <button type="submit">Update</button>
            </form>
            <p>{passwordError}</p>
        </div>
    );
}

export default EditUser;
