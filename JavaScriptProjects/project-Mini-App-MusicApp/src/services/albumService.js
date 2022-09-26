import * as request from './requester.js';

const url = 'http://localhost:3030/data/albums';

export const getAll = () => {
   return request.get(`${url}?sortBy=_createdOn%20desc&distinct=name`);
};

export const getOne = (albumId) => {
   return request.get(`${url}/${albumId}`);
};

export const create = (albumData) => {
   return request.post(url, albumData);
};

export const edit = (albumId, albumData) => {
   return request.put(`${url}/${albumId}`, albumData);
};

export const remove = (albumId) => {
   return request.del(`${url}/${albumId}`);
};

export const search = (textSearch) => {
   const query = encodeURIComponent(`name LIKE "${textSearch}"`);
   
   return request.get(`${url}?where=${query}`);
};