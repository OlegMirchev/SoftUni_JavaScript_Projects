import * as api from './api.js';

const endpoint = {
    careersAll: `/data/offers?sortBy=_createdOn%20desc`,
    byId: '/data/offers/',
    create: '/data/offers',
    edit: '/data/offers/',
    remove: '/data/offers/',
    appl: '/data/applications',
    count: (offerId) => `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    applyUser: (offerId, userId) => `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getAll() {
    return api.get(endpoint.careersAll);
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

export async function remove(id) {
    return api.del(endpoint.remove + id);
}

export async function postApplication(offerId) {
    return api.post(endpoint.appl, {offerId});
}

export async function getCount(offerId) {
    return api.get(endpoint.count(offerId));
}

export async function apply(offerId, userId) {
    return api.get(endpoint.applyUser(offerId, userId));
}