import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileService from '../services/ProfileService';
import MessagesService from '../services/MessagesService';
import AuthService from '../services/AuthService';

const MatchCard = ({ match, currentUserId }) => {
  const [otherUserProfile, setOtherUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  
  const profileService = new ProfileService();
  const messagesService = new MessagesService();
  const authService = new AuthService();

  const currentUser = authService.getUserInfo(); // Guardar fuera del useEffect
  const otherUserId = match.user1.id === currentUserId ? match.user2.id : match.user1.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar perfil del otro usuario
        const profileResponse = await profileService.getByUserId(otherUserId);
        setOtherUserProfile(profileResponse.data);

        // Cargar mensajes no leídos
        if (currentUser) {
          const unreadResponse = await messagesService.countUnreadMessages(
            currentUser.id, 
            match.id
          );
          setUnreadCount(unreadResponse.data);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [otherUserId, match.id]); // Remover currentUser?.id de las dependencias

  if (loading) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    );
  }

  if (!otherUserProfile) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg text-center">
        <p>Perfil no disponible</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <img 
              className="h-16 w-16 rounded-full object-cover border-2 border-pink-500" 
              src={otherUserProfile.profilePhoto || '/default-profile.png'} 
              alt={`${otherUserProfile.name} ${otherUserProfile.lastName}`} 
            />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {unreadCount}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {otherUserProfile.name} {otherUserProfile.lastName}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {otherUserProfile.bio || 'Sin descripción'}
            </p>
            <p className="text-sm text-gray-500 mt-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {otherUserProfile.location || 'Ubicación no especificada'}
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/profile/${otherUserId}`)}
              className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Ver perfil
            </button>
            
            <button
              onClick={() => navigate(`/chat/${match.id}`)}
              className="px-3 py-1.5 bg-pink-600 text-white rounded-md hover:bg-pink-700 text-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chatear
            </button>
          </div>
          
          <span className="text-xs text-gray-500">
            {new Date(match.matchDate).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
