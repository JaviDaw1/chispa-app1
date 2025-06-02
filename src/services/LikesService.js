import api from './api';

export default class LikesService {
  constructor() {
    this.url = '/likes';
  }

  // Method to obtain all likes
  async getAllLikes() {
    return api.get(this.url);
  }

  // Obtain a like by ID
  async getLikeById(id) {
    return api.get(`${this.url}/${id}`);
  }

  // Method to create a new like
  async postLike(likeData) {
    try {
      const response = await api.post(this.url, likeData);
      
      if (response.data.matchCreated) {
        console.log('¡Match creado!', response.data.match);
      }
      
      return response;
    } catch (error) {
      console.error('Error creating like:', error);
      throw error;
    }
  }

  // Method to update an existing like
  async putLike(id, likeData) {
    return api.put(`${this.url}/${id}`, likeData);
  }

  // Method to patch an existing like
  async patchLike(id, likeData) {
    return api.patch(`${this.url}/${id}`, likeData);
  }

  // Method to delete a like by ID
  async deleteLike(id) {
    return api.delete(`${this.url}/${id}`);
  }

  // Methods to get likes by likerId
  async getLikesByLikerId(likerId) {
    return api.get(`${this.url}/liker/${likerId}`);
  }

  // Method to get likes by likedId
  async getLikesByLikedId(likedId) {
    return api.get(`${this.url}/liked/${likedId}`);
  }

  // Methods to count likes by likerId
  async countLikesByLikerId(likerId) {
    return api.get(`${this.url}/count/liker/${likerId}`);
  }

  // Method to count likes by likedId
  async countLikesByLikedId(likedId) {
    return api.get(`${this.url}/count/liked/${likedId}`);
  }

  // Method to count total likes 
  async countTotalLikes() {
    return api.get(`${this.url}/count`);
  }

  // Method to delete a like by likerId and likedId
  async deleteLikeByLikerIdAndLikedId(likerId, likedId) {
    return api.delete(`${this.url}/liker/${likerId}/liked/${likedId}`);
  }
}
