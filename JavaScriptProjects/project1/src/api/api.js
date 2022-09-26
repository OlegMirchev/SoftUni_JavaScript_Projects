import { clearUserData, getUserData } from "../utils.js";

const baseUrl = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    const user = getUserData();

    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    if (data) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const res = await fetch(baseUrl + url, options);
    
        if (res.ok !== true) {
            if (res.status === 403) {
                clearUserData();
            }
    
            const error = await res.json();
            throw new Error(error.message);
        }
    
        if (res.status === 204) {
            return res;
        }else {
            return res.json();
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');