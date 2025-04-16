import api from './api';

export default class ProfileService {
  constructor() {
    this.url = '/profiles';
    this.cache = new Map(); // Simple cache implementation
  }

  async getAll() {
    try {
      const response = await api.get(this.url);
      return response;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  }

  async getById(id) {
    if (this.cache.has(`id-${id}`)) {
      return this.cache.get(`id-${id}`);
    }

    try {
      const response = await api.get(`${this.url}/${id}`);
      this.cache.set(`id-${id}`, response);
      return response;
    } catch (error) {
      console.error(`Error fetching profile ${id}:`, error);
      throw error;
    }
  }

  async getByUserId(userId) {
    if (this.cache.has(`user-${userId}`)) {
      return this.cache.get(`user-${userId}`);
    }

    try {
      const response = await api.get(`${this.url}/user/${userId}`);
      this.cache.set(`user-${userId}`, response);
      return response;
    } catch (error) {
      console.error(`Error fetching profile for user ${userId}:`, error);
      throw error;
    }
  }

  async create(profile) {
    try {
      const response = await api.post(this.url, profile);
      this.cache.clear(); // Clear cache after modification
      return response;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  async update(id, profile) {
    try {
      const response = await api.put(`${this.url}/${id}`, profile);
      this.cache.clear(); // Clear cache after modification
      return response;
    } catch (error) {
      console.error(`Error updating profile ${id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await api.delete(`${this.url}/${id}`);
      this.cache.clear(); // Clear cache after modification
      return response;
    } catch (error) {
      console.error(`Error deleting profile ${id}:`, error);
      throw error;
    }
  }

  clearCache() {
    this.cache.clear();
  }
}