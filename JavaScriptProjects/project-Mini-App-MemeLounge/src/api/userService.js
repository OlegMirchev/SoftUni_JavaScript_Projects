import { clearUserData, setUserData } from "../util.js";
import * as api from "./api.js";

export async function login(email, password) {
    const result = await api.post('/users/login', { email, password });

    const user = {
        id: result._id,
        username: result.username,
        email: result.email,
        gender: result.gender,
        accessToken: result.accessToken
    };

    setUserData(user);

    return result;
}

export async function register(username, email, password, gender) {
    const result = await api.post('/users/register', { username, email, password, gender });

    const user = {
        id: result._id,
        username: result.username,
        email: result.email,
        gender: result.gender,
        accessToken: result.accessToken
    };

    setUserData(user);

    return result;
}

export async function logout() {
    api.get('/users/logout');
    clearUserData();
}