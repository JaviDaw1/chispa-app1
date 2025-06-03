import api from "./api";

export default class PreferenceService {
  constructor() {
    this.url = "/preferences";
  }

  // Method to obtain all preferences
  async getAllPreferences() {
    try {
      const response = await api.get(this.url);
      return response;
    } catch (error) {
      console.error("Error fetching all preferences:", error);
      throw error;
    }
  }

  // Method to obtain a preference by ID
  async getPreferencesById(id) {
    try {
      const response = await api.get(`${this.url}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching preference by id ${id}:`, error);
      throw error;
    }
  }

  // Method to obtain a preference by user ID
  async getPreferencesByUserId(userId) {
    try {
      const response = await api.get(`${this.url}/user/${userId}`);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return Promise.reject(error);
      }
      console.error(`Error fetching preference for user ${userId}:`, error);
      throw error;
    }
  }

  // Method to create a new preference
  async postPreferences(preference) {
    try {
      const response = await api.post(this.url, preference);
      return response;
    } catch (error) {
      console.error("Error creating preference:", error);
      throw error;
    }
  }

  // Method to update an existing preference
  async updatePreferences(id, preference) {
    try {
      const response = await api.put(`${this.url}/${id}`, preference);
      return response;
    } catch (error) {
      console.error(`Error updating preference with id ${id}:`, error);
      throw error;
    }
  }

  // Method to delete a preference by ID
  async deletePreferences(id) {
    try {
      const response = await api.delete(`${this.url}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting preference with id ${id}:`, error);
      throw error;
    }
  }
}
