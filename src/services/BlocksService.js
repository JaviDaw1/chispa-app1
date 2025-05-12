import api from './api';

export default class BlocksService {
  constructor() {
    this.url = 'blocks'; // Asegúrate de que la URL corresponde con la de la API
    this.cache = new Map(); // Cache simple para almacenamiento
  }

  // Obtener todos los bloqueos
  async getAll() {
    try {
      const response = await api.get(this.url);
      return response;
    } catch (error) {
      console.error('Error fetching blocks:', error);
      throw error;
    }
  }

  // Obtener bloqueo por ID
  async getById(id) {
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

  // Obtener bloqueos por ReporterId
  async getByReporterId(reporterId) {
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

  // Obtener bloqueos por ReportedId
  async getByReportedId(reportedId) {
    if (this.cache.has(`reported/${reportedId}`)) {
      return this.cache.get(`reported-${reportedId}`);
    }

    try {
      const response = await api.get(`${this.url}/reported/${reportedId}`);
      this.cache.set(`reported-${reportedId}`, response);
      return response;
    } catch (error) {
      console.error(`Error fetching blocks for reported user ${reportedId}:`, error);
      throw error;
    }
  }

  // Crear un bloqueo
  async create(block) {
    try {
      const response = await api.post(this.url, block);
      this.cache.clear(); // Limpiar caché después de la modificación
      return response;
    } catch (error) {
      console.error('Error creating block:', error);
      throw error;
    }
  }

  // Actualizar un bloqueo
  async update(id, block) {
    try {
      const response = await api.put(`${this.url}/${id}`, block);
      this.cache.clear(); // Limpiar caché después de la modificación
      return response;
    } catch (error) {
      console.error(`Error updating block with ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar un bloqueo
  async delete(id) {
    try {
      const response = await api.delete(`${this.url}/${id}`);
      this.cache.clear(); // Limpiar caché después de la eliminación
      return response;
    } catch (error) {
      console.error(`Error deleting block with ID ${id}:`, error);
      throw error;
    }
  }

  // Contar bloqueos de un usuario que ha bloqueado
  async countBlocksByReporterId(reporterId) {
    try {
      const response = await api.get(`${this.url}/countBlocks/reporter/${reporterId}`);
      return response;
    } catch (error) {
      console.error(`Error counting blocks for reporter ${reporterId}:`, error);
      throw error;
    }
  }

  // Contar bloqueos de un usuario bloqueado
  async countBlocksByReportedId(reportedId) {
    try {
      const response = await api.get(`${this.url}/countBlocks/reported/${reportedId}`);
      return response;
    } catch (error) {
      console.error(`Error counting blocks for reported user ${reportedId}:`, error);
      throw error;
    }
  }

  // Limpiar caché
  clearCache() {
    this.cache.clear();
  }
}
