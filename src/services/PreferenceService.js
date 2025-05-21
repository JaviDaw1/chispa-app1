import api from './api';

export default class PreferenceService {
  constructor() {
    this.url = '/preferences';
  }

  async getAll() {
    try {
      const response = await api.get(this.url);
      return response;
    } catch (error) {
      console.error('Error fetching all preferences:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await api.get(`${this.url}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching preference by id ${id}:`, error);
      throw error;
    }
  }

  async getByUserId(userId) {
    try {
      const response = await api.get(`${this.url}/user/${userId}`);
      return response;
    } catch (error) {
      console.error(`Error fetching preference for user ${userId}:`, error);
      throw error;
    }
  }

  async create(preference) {
    try {
      const response = await api.post(this.url, preference);
      return response;
    } catch (error) {
      console.error('Error creating preference:', error);
      throw error;
    }
  }

  async update(id, preference) {
    try {
      const response = await api.put(`${this.url}/${id}`, preference);
      return response;
    } catch (error) {
      console.error(`Error updating preference with id ${id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await api.delete(`${this.url}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting preference with id ${id}:`, error);
      throw error;
    }
  }
}
