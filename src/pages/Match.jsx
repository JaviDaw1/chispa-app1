// src/pages/Matches.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchService from '../services/MatchService';
import AuthService from '../services/AuthService';
import Header from '../components/Header';
import MatchCard from '../components/MatchCard';

const matchService = new MatchService();
const authService = new AuthService();

const Match = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const currentUser = authService.getUserInfo();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (!currentUser?.id) {
          navigate('/login');
          return;
        }

        const response = await matchService.getMatchesByUser(currentUser.id);
        setMatches(response.data);
      } catch (err) {
        setError('Error al cargar los matches');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [navigate, currentUser]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p>Cargando matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Tus Matches</h1>
        
        {matches.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Aún no tienes matches. ¡Sigue explorando!</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Descubrir personas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map(match => (
              <MatchCard 
                key={match.id} 
                match={match} 
                currentUserId={currentUser.id} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Match;