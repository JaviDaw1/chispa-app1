import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MessagesService from '../services/MessagesService';
import MatchService from '../services/MatchService';
import AuthService from '../services/AuthService';
import Header from '../components/Header';
import Modal from '../components/Modal';
import BlockService from '../services/BlocksService';
import ProfileService from '../services/ProfileService';

const messagesService = new MessagesService();
const matchService = new MatchService();
const authService = new AuthService();
const blockService = new BlockService();
const profileService = new ProfileService();

const Chat = () => {
  const { matchId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [match, setMatch] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockReason, setBlockReason] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [isSending, setIsSending] = useState(false);

  const currentUser = authService.getUserInfo();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Función para desplazarse al final de los mensajes
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Manejadores optimizados con useCallback
  const handleNewMessage = useCallback((newMsg) => {
    setMessages(prev => [...prev, newMsg]);
    if (newMsg.receiverUser.id === currentUser.id) {
      messagesService.markAsRead(matchId, newMsg.id);
    }
  }, [currentUser.id, matchId]);

  const handleUpdateMessage = useCallback((updatedMsg) => {
    setMessages(prev => prev.map(msg =>
      msg.id === updatedMsg.id ? updatedMsg : msg
    ));
  }, []);

  // Carga inicial de datos y conexión WebSocket
  useEffect(() => {
    let isMounted = true;
    const loadChatData = async () => {
      try {
        const [matchResponse, messagesResponse] = await Promise.all([
          matchService.getMatchById(matchId),
          messagesService.getMessagesByMatch(matchId)
        ]);

        if (!isMounted) return;

        setMatch(matchResponse.data);

        const other = matchResponse.data.user1.id === currentUser.id
          ? matchResponse.data.user2
          : matchResponse.data.user1;

        const profileResponse = await profileService.getProfileByUserId(other.id);
        setOtherUser({
          ...other,
          profile: profileResponse.data
        });

        const fetchedMessages = messagesResponse.data;
        setMessages(fetchedMessages);

        const unreadMessages = fetchedMessages.filter(
          msg => msg.receiverUser.id === currentUser.id && !msg.isRead
        );
        setUnreadCount(unreadMessages.length);

        if (unreadMessages.length > 0) {
          await Promise.all(
            unreadMessages.map(msg => messagesService.markAsRead(matchId, msg.id))
          );
          setUnreadCount(0);
        }

        // Configurar WebSocket después de cargar datos iniciales
        setupWebSocket();
      } catch (error) {
        console.error('Error loading chat:', error);
        setConnectionStatus('disconnected');
      }
    };

    const setupWebSocket = () => {
      console.log('Intentando conectar al WebSocket con matchId:', matchId);
      messagesService.connectWebSocket(
        matchId,
        handleNewMessage,
        handleUpdateMessage
      );
      setConnectionStatus('connected');
    };

    loadChatData();

    return () => {
      isMounted = false;
      messagesService.disconnectWebSocket();
    };
  }, [matchId, currentUser.id, handleNewMessage, handleUpdateMessage]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const response = await messagesService.sendMessage(
        matchId,
        currentUser.id,
        otherUser.id,
        newMessage
      );

      // Si se usó HTTP, añadimos el mensaje manualmente.
      if (response?.data) {
        setMessages(prev => [...prev, response.data]);
      }

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleBlockUser = async () => {
    try {
      const blockData = {
        reporter: { id: currentUser.id },
        reported: { id: otherUser.id },
        blockReason: blockReason || "Bloqueado desde chat",
      };

      await blockService.postBlock(blockData);

      setIsModalOpen(false);
      navigate('/messages');
    } catch (error) {
      console.error('Error al bloquear al usuario:', error);
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
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Encabezado del chat */}
      <div className="sticky top-0 bg-orange-600 text-white p-4 flex items-center z-10 lg:pt-20">
        <Link to="/messages" className="text-white mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5l-7 7 7 7" />
          </svg>
        </Link>

        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
          {otherUser.profile?.profilePhoto ? (
            <img
              src={otherUser.profile.profilePhoto}
              alt={otherUser.firstname}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-orange-600 font-bold">
              {otherUser.firstname?.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h2 className="font-bold">{otherUser.firstname} {otherUser.lastname}</h2>
          <p className="text-xs opacity-80">
            {connectionStatus === 'connected'
              ? unreadCount > 0 ? `${unreadCount} mensajes nuevos` : 'En línea'
              : 'Conectando...'}
          </p>
        </div>

        {/* Botón de menú de opciones */}
        <div className="ml-auto relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-white px-3 py-2 rounded-full focus:outline-none"
            aria-label="Menú de opciones"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
            </svg>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <button
                onClick={() => {
                  setShowMenu(false);
                  setIsModalOpen(true);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Bloquear
              </button>
            </div>
          )}
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
                ? 'bg-orange-500 text-white rounded-br-none'
                : 'bg-white dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-bl-none'
                }`}
            >
              <p>{msg.content}</p>
              <div className={`text-xs mt-1 ${msg.senderUser.id === currentUser.id ? 'text-orange-100' : 'text-gray-500'}`}>
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
      <div className="sticky bottom-0 left-0 w-full bg-white dark:bg-gray-800 p-3 border-t border-gray-200 dark:border-gray-700 pb-20 lg:pb-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isSending}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isSending}
            className={`p-2 rounded-full ${newMessage.trim() && !isSending
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-500'}`}
            aria-label="Enviar mensaje"
          >
            {isSending ? (
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Modal de bloqueo */}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBlockUser}
        title={`¿Estás seguro de que deseas bloquear a ${otherUser.firstname} ${otherUser.lastname}?`}
        placeholder="Motivo del bloqueo (opcional)"
        confirmText="Bloquear"
        cancelText="Cancelar"
        showReasonInput={true}
        reason={blockReason}
        onReasonChange={setBlockReason}
      />
    </div>
  );
};

export default Chat;