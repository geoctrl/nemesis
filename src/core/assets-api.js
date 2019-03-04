import { api, getData } from './api';

export function getAssets(params) {
  return api.get(`/assets`, { params })
    .then(getData);
}

export function postAssets(body, params) {
  return api.post(`/assets`, body, { params })
    .then(getData);
}