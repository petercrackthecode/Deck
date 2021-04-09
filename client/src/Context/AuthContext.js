import {createContext, useState} from 'react';
const _ = require("lodash");

export const AuthContext = createContext();

const DEFAULT_USER_STATE = {
    id: '',
    email: '',
    password: '',
    name: '',
};

export const AuthContextProvider = (props) => {
    const [auth, setAuth] = useState(_.cloneDeep(DEFAULT_USER_STATE));

    return (
        <AuthContext.Provider value={{...auth, setAuth: setAuth}}>
            {props.children}
        </AuthContext.Provider>
    );
}