import { api, getData } from './api';

export function getAssets() {
  return api.get(`/assets`).then(getData)
}