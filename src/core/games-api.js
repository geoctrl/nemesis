import { api, getData } from './api';

export function getGame(gameId, params) {
  return api.get(`/games/${gameId}`, { params }).then(getData);
}