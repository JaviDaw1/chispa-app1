import api from './api';

export default class LikesService {
  constructor() {
    this.url = '/likes';
  }

  async getAllLikes() {
    return api.get(this.url);
  }

  async getLikeById(id) {
    return api.get(`${this.url}/${id}`);
  }

  async postLike(likeData) {
    try {
      const response = await api.post(this.url, likeData);
      return response;
    } catch (error) {
      console.error('Error creating like:', error);
      throw error;
    }
  }

  async putLike(id, likeData) {
    return api.put(`${this.url}/${id}`, likeData);
  }

  async patchLike(id, likeData) {
    return api.patch(`${this.url}/${id}`, likeData);
  }

  async deleteLike(id) {
    return api.delete(`${this.url}/${id}`);
  }

  async getLikesByLikerId(likerId) {
    return api.get(`${this.url}/liker/${likerId}`);
  }

  async getLikesByLikedId(likedId) {
    return api.get(`${this.url}/liked/${likedId}`);
  }

  async countLikesByLikerId(likerId) {
    return api.get(`${this.url}/count/liker/${likerId}`);
  }

  async countLikesByLikedId(likedId) {
    return api.get(`${this.url}/count/liked/${likedId}`);
  }

  async countTotalLikes() {
    return api.get(`${this.url}/count`);
  }
}
