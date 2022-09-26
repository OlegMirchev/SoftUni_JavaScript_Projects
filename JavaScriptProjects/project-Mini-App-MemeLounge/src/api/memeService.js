import * as api from '../api/api.js';

const endpoint = {
    memes: '/data/memes?sortBy=_createdOn%20desc',
    create: '/data/memes',
    byId: '/data/memes/',
    edit: '/data/memes/',
    remove: '/data/memes/',
    profile: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
};

export async function getAll() {
    return api.get(endpoint.memes);
}

export async function getMemesUserById(userId) {
    return api.get(endpoint.profile(userId));
}

export async function getById(id) {
    return api.get(endpoint.byId + id);
}

export async function getByProfileId(userId) {
    return api.get(endpoint.profile(userId));
}

export async function create(data) {
    return api.post(endpoint.create, data);
}

export async function edit(id, data) {
    return api.put(endpoint.edit + id, data);
}

export async function remove(id) {
    return api.del(endpoint.remove + id);
}