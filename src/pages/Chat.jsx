import React, { useState, useEffect, useRef } from 'react'; 
import { useParams } from 'react-router-dom';
import MessagesService from '../services/MessagesService';
import MatchService from '../services/MatchService';
import AuthService from '../services/AuthService';
import Header from '../components/Header';

const messagesService = new MessagesService();
const matchService = new MatchService();
const authService = new AuthService();

const Chat = () => {
  const { matchId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [match, setMatch] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const currentUser = authService.getUserInfo();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const loadChatData = async () => {
      try {
        const matchResponse = await matchService.getMatchById(matchId);
        setMatch(matchResponse.data);
        
        const other = matchResponse.data.user1.id === currentUser.id 
          ? matchResponse.data.user2 
          : matchResponse.data.user1;
        setOtherUser(other);

        const [messagesResponse, countResponse] = await Promise.all([
          messagesService.getConversation(matchId, currentUser.id, other.id),
          messagesService.countUnreadMessages(currentUser.id, matchId)
        ]);
        
        const fetchedMessages = messagesResponse.data;
        setMessages(fetchedMessages);
        setUnreadCount(countResponse.data);

        // Marcar solo los no leídos al cargar
        const unreadMessages = fetchedMessages.filter(
          msg => msg.receiverUser.id === currentUser.id && !msg.isRead
        );

        if (unreadMessages.length > 0) {
          await Promise.all(
            unreadMessages.map(msg => messagesService.markAsRead(msg.id))
          );
        }
      } catch (error) {
        console.error('Error loading chat:', error);
      }
    };

    loadChatData();
  }, [matchId, currentUser.id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await messagesService.sendMessage(
        matchId,
        currentUser.id,
        otherUser.id,
        newMessage
      );
      
      setMessages(prev => [...prev, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!match || !otherUser) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p>Cargando chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      <Header />
      
      {/* Encabezado del chat */}
      <div className="bg-pink-600 text-white p-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
          {otherUser.profile?.profilePhoto ? (
            <img 
              src={otherUser.profile.profilePhoto} 
              alt={otherUser.firstname}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-pink-600 font-bold">
              {otherUser.firstname?.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h2 className="font-bold">{otherUser.firstname} {otherUser.lastname}</h2>
          <p className="text-xs opacity-80">
            {unreadCount > 0 ? `${unreadCount} mensajes nuevos` : 'En línea'}
          </p>
        </div>
      </div>
      
      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.senderUser.id === currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.senderUser.id === currentUser.id 
                ? 'bg-pink-500 text-white rounded-br-none' 
                : 'bg-white border border-gray-200 rounded-bl-none'}`}
            >
              <p>{msg.content}</p>
              <div className={`text-xs mt-1 ${msg.senderUser.id === currentUser.id ? 'text-pink-100' : 'text-gray-500'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {msg.senderUser.id === currentUser.id && (
                  <span className="ml-1">
                    {msg.isRead ? '✓✓' : '✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input para enviar mensajes */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full ${newMessage.trim() ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
