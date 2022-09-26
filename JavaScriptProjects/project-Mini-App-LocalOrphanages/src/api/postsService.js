import * as api from './api.js';

const endpoints = {
    posts: '/data/posts?sortBy=_createdOn%20desc',
    create: '/data/posts',
    byId: '/data/posts/',
    edit: '/data/posts/',
    remove: '/data/posts/',
    myPosts: (userId) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    donate: '/data/donations',
    countDonate: (postId) => `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
    donateUser: (postId, userId) => `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getAll() {
    return api.get(endpoints.posts);
}

export async function getPostById(id) {
    return api.get(endpoints.byId + id);
}

export async function getMyPostById(userId) {
    return api.get(endpoints.myPosts(userId));
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function removeId(id) {
    return api.del(endpoints.remove + id);
}

export async function donations(id) {
    return api.post(endpoints.donate, {id});
}

export async function donateSize(postId) {
    return api.get(endpoints.countDonate(postId));
}

export async function donationsUser(postId, userId) {
    return api.get(endpoints.donateUser(postId, userId));
}