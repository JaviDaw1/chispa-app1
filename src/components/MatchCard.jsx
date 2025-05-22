import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProfileService from '../services/ProfileService';

const MatchCard = ({ match, currentUserId }) => {
  const { t } = useTranslation();
  const [otherUserProfile, setOtherUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const profileService = new ProfileService();
  const otherUserId = match.user1.id === currentUserId ? match.user2.id : match.user1.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await profileService.getByUserId(otherUserId);
        setOtherUserProfile(profileResponse.data);
      } catch (error) {
        console.error(t('errors.load_profiles'), error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [otherUserId, match.id, t]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md animate-pulse h-40">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-1/3"></div>
      </div>
    );
  }

  if (!otherUserProfile) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md text-center text-gray-500 dark:text-gray-400">
        {t('matches.profile_not_available')}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition transform hover:scale-[1.015] duration-300">
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <img
            src={otherUserProfile.profilePhoto || '/default-profile.png'}
            alt={`${otherUserProfile.name} ${otherUserProfile.lastName}`}
            className="h-20 w-20 rounded-full object-cover border-4 border-orange-500 shadow-md"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
              {otherUserProfile.name} {otherUserProfile.lastName}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 truncate">
              {otherUserProfile.bio || t('matches.no_description')}
            </p>
            <div className="flex items-center gap-1 text-sm text-orange-600 dark:text-orange-400 mt-2">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.243-4.243a8 8 0 1111.313 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{otherUserProfile.location || t('matches.location_unspecified')}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/profile/${otherUserId}`)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm transition"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t('matches.view_profile_button')}
            </button>

            <button
              onClick={() => navigate(`/chat/${match.id}`)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm transition"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {t('matches.chat_button')}
            </button>
          </div>

          <span className="text-xs text-gray-400 dark:text-gray-500 text-right">
            {formatDate(match.matchDate)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
