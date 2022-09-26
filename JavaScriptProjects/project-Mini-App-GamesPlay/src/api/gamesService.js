import * as api from './api.js';

const endpoint = {
     recent: '/data/games?sortBy=_createdOn%20desc&distinct=category',
     games: '/data/games?sortBy=_createdOn%20desc',
     create: '/data/games',
     byId: '/data/games/',
     deleteById: '/data/games/',
     edit: '/data/games/'
};

export async function getRecent() {
     return api.get(endpoint.recent);
}

export async function getAll() {
     return api.get(endpoint.games);
}

export async function getById(id) {
     return api.get(endpoint.byId + id);
}

export async function create(data) {
     return api.post(endpoint.create, data);
}

export async function edit(id, data) {
     return api.put(endpoint.edit + id, data);
}

export async function deleteById(id) {
     return api.del(endpoint.deleteById + id);
}
