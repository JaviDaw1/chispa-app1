import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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

  const filteredMatches = matches.filter((match) => match.matchState !== 'BLOCKED');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-20">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          {t('messages.title')}
        </h1>

        {loading ? (
          <p className="text-gray-500 text-lg">{t('messages.loading')}</p>
        ) : filteredMatches.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300 text-lg">{t('messages.no_chats')}</p>
        ) : (
          <div className="w-full max-w-4xl grid grid-cols-1 gap-6 overflow-y-auto max-h-[70vh] pb-2">
            {filteredMatches.map((match) => (
              <ChatsCard
                key={match.id}
                match={match}
                currentUserId={currentUser.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatsPage;
