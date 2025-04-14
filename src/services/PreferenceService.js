// src/services/PreferenceService.js
import api from './api';

export default class PreferenceService {
  constructor() {
    this.url = '/preferences';
  }

  async getAll() {
    return api.get(this.url);
  }

  async getById(id) {
    return api.get(`${this.url}/${id}`);
  }

  async getByUserId(userId) {
    return api.get(`${this.url}/user/${userId}`);
  }

  async create(preference) {
    return api.post(this.url, preference);
  }

  async update(id, preference) {
    return api.put(`${this.url}/${id}`, preference);
  }

  async delete(id) {
    return api.delete(`${this.url}/${id}`);
  }
}
