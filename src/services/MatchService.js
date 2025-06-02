import api from './api';

export default class MatchService {
  constructor() {
    this.url = '/matches';
  }

  // Method to obtain matches by user ID
  async getMatchesByUser(userId) {
    return api.get(`${this.url}/user/${userId}`);
  }

  // Method to obtain a match by ID
  async getMatchById(id) {
    return api.get(`${this.url}/${id}`);
  }

  // Method to update a new match
  async updateMatchState(id, state) {
    return api.patch(`${this.url}/${id}`, { matchState: state });
  }

  // Method to delete a match by ID
  async deleteMatch(id) {
    return api.delete(`${this.url}/${id}`);
  }
}