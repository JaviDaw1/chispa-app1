import api from './api';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

export default class MessagesService {
  constructor() {
    this.url = '/messages';
    this.stompClient = null;
    this.subscriptions = {};
  }

  // Configura la conexión WebSocket
  connectWebSocket(matchId, onMessageReceived, onUpdateReceived) {
    if (this.stompClient && this.stompClient.connected) {
      return; 
    }

    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = over(socket);
    
    this.stompClient.connect({}, () => {
      // Suscripción para nuevos mensajes
      this.subscriptions[matchId] = this.stompClient.subscribe(
        `/topic/chat/${matchId}`,
        (message) => {
          const newMessage = JSON.parse(message.body);
          onMessageReceived(newMessage);
        }
      );
      
      // Suscripción para actualizaciones (mensajes leídos)
      this.subscriptions[`${matchId}-updates`] = this.stompClient.subscribe(
        `/topic/chat/${matchId}/updates`,
        (message) => {
          const updatedMessage = JSON.parse(message.body);
          onUpdateReceived(updatedMessage);
        }
      );
    }, (error) => {
      console.error('WebSocket connection error:', error);
      // Implementar lógica de reconexión aquí si es necesario
    });
  }

  // Desconectar WebSocket
  disconnectWebSocket() {
    if (this.stompClient && this.stompClient.connected) {
      // Cancelar todas las suscripciones
      Object.values(this.subscriptions).forEach(subscription => {
        subscription.unsubscribe();
      });
      this.subscriptions = {};
      this.stompClient.disconnect();
    }
  }

  // Enviar mensaje a través de WebSocket (con fallback a HTTP)
  async sendMessage(matchId, senderId, receiverId, content) {
    const messageData = {
      match: { id: matchId },
      senderUser: { id: senderId },
      receiverUser: { id: receiverId },
      content,
      isRead: false
    };

    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        `/app/chat/${matchId}/send`,
        {},
        JSON.stringify(messageData)
      );
      return { data: messageData }; // Simular respuesta para consistencia
    } else {
      // Fallback a HTTP si WebSocket no está disponible
      console.warn('WebSocket not connected, falling back to HTTP');
      try {
        const response = await api.post(this.url, messageData);
        return response;
      } catch (error) {
        console.error('Error sending message:', error);
        throw error;
      }
    }
  }

  // Marcar mensaje como leído
  async markAsRead(matchId, messageId) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        `/app/chat/${matchId}/markAsRead`,
        {},
        JSON.stringify(messageId)
      );
    } else {
      // Fallback a HTTP
      try {
        const response = await api.patch(`${this.url}/${messageId}`, { isRead: true });
        return response;
      } catch (error) {
        console.error('Error marking message as read:', error);
        throw error;
      }
    }
  }

  // Obtener mensajes (siempre por HTTP para carga inicial)
  async getMessagesByMatch(matchId) {
    try {
      const response = await api.get(`${this.url}/match/${matchId}`);
      return response;
    } catch (error) {
      console.error(`Error getting messages for match ${matchId}:`, error);
      throw error;
    }
  }

  // Eliminar mensajes
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
