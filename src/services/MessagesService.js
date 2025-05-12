import api from './api';

export default class MessagesService {
  constructor() {
    this.url = '/messages';
  }

  async sendMessage(matchId, senderId, receiverId, content) {
    try {
      const response = await api.post(this.url, {
        match: { id: matchId },
        senderUser: { id: senderId },
        receiverUser: { id: receiverId },
        content,
        isRead: false
      });
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // async markAsRead(messageId) {
  //   return api.patch(`${this.url}/${messageId}/read`);
  // }

  async getMessagesByMatch(matchId) {
    try {
      const response = await api.get(`${this.url}/match/${matchId}`);
      return response;
    } catch (error) {
      console.error(`Error getting messages for match ${matchId}:`, error);
      throw error;
    }
  }

  async deleteMessagesByMatchId(matchId) {
    try {
      const response = await api.delete(`${this.url}/match/${matchId}`);
      return response;
    } catch (error) {
      console.error(`Error deleting messages for match ${matchId}:`, error);
      throw error;
    }
  }
}