export const getUser = () => {
    const useStr = sessionStorage.getItem('user')
    if(useStr) return JSON.parse(useStr);
    else return null;
}

//return token from session storage
export const getToken = () => {
return sessionStorage.getItem('token') || null;
}

//remove user and token from the user session
export const removeUserSession = () => {
sessionStorage.removeItem('user');
sessionStorage.removeItem('token');
}

//set token and user from session storage
export const setUserSession = (token,user) => {
sessionStorage.setItem('token',token);
sessionStorage.setItem('user',JSON.stringify(user));
}