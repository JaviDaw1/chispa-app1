import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate
import ChatsCard from '../components/ChatsCard';
import MatchService from '../services/MatchService';
import AuthService from '../services/AuthService';
import Header from '../components/Header';

const matchService = new MatchService();
const authService = new AuthService();

const ChatsPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getUserInfo();
    if (!user?.id) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  useEffect(() => {
    const fetchMatches = async () => {
      if (!currentUser?.id) return;

      try {
        const response = await matchService.getMatchesByUser(currentUser.id);
        setMatches(response.data);
      } catch (error) {
        console.error('Error al cargar matches:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchMatches();
    }
  }, [currentUser]);

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-gradient-to-br lg:pt-16">
      <Header />
      <h2 className="text-2xl font-extrabold mb-4 text-center">Tus chats</h2>

      {loading ? (
        <p className="text-center text-gray-500">Cargando chats...</p>
      ) : matches.length === 0 ? (
        <p className="text-center text-gray-500">No tienes chats todavía. ¡Ve a hacer match!</p>
      ) : (
        <div className="max-h-[70vh] overflow-y-auto pr-1 space-y-3">
          {matches.map((match) => (
            <ChatsCard key={match.id} match={match} currentUserId={currentUser.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatsPage;
