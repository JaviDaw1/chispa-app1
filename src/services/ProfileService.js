import api from './api';

export default class ProfileService {
  constructor() {
    this.url = '/profiles';
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

  async create(profile) {
    return api.post(this.url, profile);
  }

  async update(id, profile) {
    return api.put(`${this.url}/${id}`, profile);
  }

  async delete(id) {
    return api.delete(`${this.url}/${id}`);
  }

  async getByGender(gender) {
    return api.get(`${this.url}/gender/${gender}`);
  }
}
