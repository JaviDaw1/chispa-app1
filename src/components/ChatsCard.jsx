import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileService from '../services/ProfileService';

/**
 * ChatsCard component to display a chat card with user profile information.
 * @param {Object} props - Component properties.
 * @param {Object} props.match - The match object containing user information and match date.
 * @param {string} props.currentUserId - The ID of the current user.
 * @return {JSX.Element} The rendered chat card component.
 * @example
 * <ChatsCard match={match} currentUserId={currentUserId} />
 * */
export default function ChatsCard({ match, currentUserId }) {
  const [otherUser, setOtherUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const otherUserId = match.user1.id === currentUserId ? match.user2.id : match.user1.id;
        const profileService = new ProfileService();
        const response = await profileService.getProfileByUserId(otherUserId);
        setOtherUser(response.data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOtherUser();
  }, [currentUserId, match.id]);

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    );
  }

  if (!otherUser) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-gray-600 dark:text-gray-400">
        <p>Perfil no disponible</p>
      </div>
    );
  }

  return (
    <div
      className="flex items-center p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg hover:bg-orange-200 dark:hover:bg-orange-500/10 cursor-pointer transition duration-300 ease-in-out"
      onClick={() => navigate(`/chat/${match.id}`)}
    >
      <img
        className="h-14 w-14 rounded-full object-cover border-2 border-orange-500"
        src={otherUser.profilePhoto || '/default-profile.png'}
        alt={`${otherUser.name} ${otherUser.lastName}`}
      />
      <div className="ml-4 flex-1 min-w-0">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
          {otherUser.name} {otherUser.lastName}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {otherUser.bio || '¡Nuevo match! Envía un mensaje'}
        </p>
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500 ml-2 whitespace-nowrap">
        {new Date(match.matchDate).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
        })}
      </span>
    </div>
  );
};
