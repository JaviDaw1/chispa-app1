import api from './api';

export default class MessagesService {
  constructor() {
    this.url = '/messages';
  }

  // Enviar un nuevo mensaje
  async sendMessage(matchId, senderId, receiverId, content) {
    return api.post(this.url, {
      match: { id: matchId },
      senderUser: { id: senderId },
      receiverUser: { id: receiverId },
      content,
      isRead: false
    });
  }

  // Obtener conversación completa
  async getConversation(matchId, userId1, userId2) {
    return api.get(`${this.url}/match/${matchId}/conversation`, {
      params: { userId1, userId2 }
    });
  }

  // Marcar mensaje como leído
  async markAsRead(messageId) {
    return api.patch(`${this.url}/${messageId}/read`);
  }

  // Contar mensajes no leídos
  async countUnreadMessages(userId, matchId) {
    return api.get(`${this.url}/match/${matchId}/unread-count`, {
      params: { userId }
    });
  }

  // Obtener todos los mensajes de un match
  async getMessagesByMatch(matchId) {
    return api.get(`${this.url}/match/${matchId}`);
  }
}