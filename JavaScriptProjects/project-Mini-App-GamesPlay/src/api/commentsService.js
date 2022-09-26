import * as api from './api.js';

const endpoint = {
    byGameId: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    postUrl: '/data/comments'
};

export async function getByGameId(gameId) {
    return api.get(endpoint.byGameId(gameId));
}

export async function postComment(comment) {
    return api.post(endpoint.postUrl, comment);
}