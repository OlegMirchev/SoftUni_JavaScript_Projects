import * as request from './requester.js';
import * as authService from './authService.js';

const url = 'http://localhost:3030/users';

export const login = (email, password) =>
    request.post(`${url}/login`, { email, password })
        .then(user => {
            authService.saveUser(user)

            return user;
        });

export const register = (email, password) =>
    request.post(`${url}/register`, { email, password })
        .then(user => {
            authService.saveUser(user)

            return user;
        });

export const logout = () => {
    return fetch(`${url}/logout`, {headers: {'X-Authorization': authService.getToken()}})
        .then(() => {
            authService.deleteUser();
        });
};

