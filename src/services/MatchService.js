import api from './api';

export default class MatchService {
  constructor() {
    this.url = '/matches';
  }

  async getMatchesByUser(userId) {
    return api.get(`${this.url}/user/${userId}`);
  }

  async getMatchById(id) {
    return api.get(`${this.url}/${id}`);
  }

  async updateMatchState(id, state) {
    return api.patch(`${this.url}/${id}`, { matchState: state });
  }
}