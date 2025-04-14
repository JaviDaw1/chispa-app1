// src/components/MatchCard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileService from '../services/ProfileService';

const MatchCard = ({ match, currentUserId }) => {
  const [otherUserProfile, setOtherUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const profileService = new ProfileService();

  // Determina qué usuario es el otro (no el actual)
  const otherUserId = match.user1.id === currentUserId ? match.user2.id : match.user1.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileService.getByUserId(otherUserId);
        setOtherUserProfile(response.data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [otherUserId]);

  if (loading) {
    return <div className="p-4 bg-gray-100 rounded-lg">Cargando perfil...</div>;
  }

  if (!otherUserProfile) {
    return <div className="p-4 bg-gray-100 rounded-lg">Perfil no disponible</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img 
              className="h-16 w-16 rounded-full object-cover" 
              src={otherUserProfile.profilePhoto || '/default-profile.png'} 
              alt={`${otherUserProfile.name} ${otherUserProfile.lastName}`} 
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {otherUserProfile.name} {otherUserProfile.lastName}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {otherUserProfile.bio || 'Sin descripción'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {otherUserProfile.location || 'Ubicación no especificada'}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => navigate(`/profile/${otherUserId}`)}
            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
          >
            Ver perfil completo(NO IMPLEMENTADO)
          </button>
          <span className="text-sm text-gray-500 self-center">
            {new Date(match.matchDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;