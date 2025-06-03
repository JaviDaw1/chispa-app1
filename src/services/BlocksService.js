import api from "./api";

export default class BlocksService {
  constructor() {
    this.url = "blocks";
    this.cache = new Map();
  }

  // Obtain all blocks
  async getAllBlocks() {
    try {
      const response = await api.get(this.url);
      return response;
    } catch (error) {
      console.error("Error fetching blocks:", error);
      throw error;
    }
  }

  // Obtain a block by ID
  async getBlockById(id) {
    if (this.cache.has(`id-${id}`)) {
      return this.cache.get(`id-${id}`);
    }

    try {
      const response = await api.get(`${this.url}/${id}`);
      this.cache.set(`id-${id}`, response);
      return response;
    } catch (error) {
      console.error(`Error fetching block with ID ${id}:`, error);
      throw error;
    }
  }

  // Obtain blocks by ReporterId
  async getBlocksByReporterId(reporterId) {
    if (this.cache.has(`reporter/${reporterId}`)) {
      return this.cache.get(`reporter-${reporterId}`);
    }

    try {
      const response = await api.get(`${this.url}/reporter/${reporterId}`);
      this.cache.set(`reporter-${reporterId}`, response);
      return response;
    } catch (error) {
      console.error(`Error fetching blocks for reporter ${reporterId}:`, error);
      throw error;
    }
  }

  // Obtain blocks by ReportedId
  async getBlocksByReportedId(reportedId) {
    if (this.cache.has(`reported/${reportedId}`)) {
      return this.cache.get(`reported-${reportedId}`);
    }

    try {
      const response = await api.get(`${this.url}/reported/${reportedId}`);
      this.cache.set(`reported-${reportedId}`, response);
      return response;
    } catch (error) {
      console.error(
        `Error fetching blocks for reported user ${reportedId}:`,
        error
      );
      throw error;
    }
  }

  // Create a new block
  async postBlock(block) {
    try {
      const response = await api.post(this.url, block);
      this.cache.clear();
      return response;
    } catch (error) {
      console.error("Error creating block:", error);
      throw error;
    }
  }

  // Desblock a user
  async unblock(id) {
    try {
      const response = await api.put(`${this.url}/unblock/${id}`);
      this.clearCache();
      return response;
    } catch (error) {
      console.error(`Error unblocking user with ID ${id}:`, error);
      throw error;
    }
  }

  // Update a block
  async updateBlock(id, block) {
    try {
      const response = await api.put(`${this.url}/${id}`, block);
      this.cache.clear(); // Limpiar caché después de la modificación
      return response;
    } catch (error) {
      console.error(`Error updating block with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a block
  async deleteBlock(id) {
    try {
      const response = await api.delete(`${this.url}/${id}`);
      this.cache.clear(); // Limpiar caché después de la eliminación
      return response;
    } catch (error) {
      console.error(`Error deleting block with ID ${id}:`, error);
      throw error;
    }
  }

  // Count blocks by reporter ID
  async countBlocksByReporterId(reporterId) {
    try {
      const response = await api.get(
        `${this.url}/countBlocks/reporter/${reporterId}`
      );
      return response;
    } catch (error) {
      console.error(`Error counting blocks for reporter ${reporterId}:`, error);
      throw error;
    }
  }

  // Count blocks by reported ID
  async countBlocksByReportedId(reportedId) {
    try {
      const response = await api.get(
        `${this.url}/countBlocks/reported/${reportedId}`
      );
      return response;
    } catch (error) {
      console.error(
        `Error counting blocks for reported user ${reportedId}:`,
        error
      );
      throw error;
    }
  }

  // Clear the cache
  clearCache() {
    this.cache.clear();
  }
}
