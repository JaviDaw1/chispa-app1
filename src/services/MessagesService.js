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

  async getConversation(matchId, userId1, userId2) {
    return api.get(`${this.url}/match/${matchId}/conversation`, {
      params: { userId1, userId2 }
    });
  }

  async markAsRead(messageId) {
    return api.patch(`${this.url}/${messageId}/read`);
  }

  async countUnreadMessages(userId, matchId) {
    return api.get(`${this.url}/match/${matchId}/unread-count`, {
      params: { userId }
    });
  }

  async getMessagesByMatch(matchId) {
    return api.get(`${this.url}/match/${matchId}`);
  }
}