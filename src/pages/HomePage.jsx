import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import ProfileService from '../services/ProfileService';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import LikesService from '../services/LikesService';
import BlocksService from '../services/BlocksService';
import Modal from '../components/Modal';
import Logo from "../../public/images/logo.jpg";
import { Heart, ArrowRight, Ban } from 'lucide-react';

const profileService = new ProfileService();
const authService = new AuthService();
const likesService = new LikesService();
const blocksService = new BlocksService();

export default function HomePage() {
  const { t } = useTranslation();
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blockReason, setBlockReason] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const currentProfile = profiles[currentProfileIndex];
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const userInfo = authService.getUserInfo();
    if (!userInfo) {
      navigate("/login");
      return;
    }

    const fetchProfilesAndLikes = async () => {
      try {
        const userInfo = authService.getUserInfo();
        const response = await profileService.getAll();
        const filteredProfiles = response.data.filter(profile =>
          profile.user.id !== userInfo.id && profile.user.role !== "ADMIN"
        );

        const likesResponse = await likesService.getLikesByLikerId(userInfo.id);
        const likedUserIds = likesResponse.data.map(like => like.liked.id);

        const blocksResponse = await blocksService.getByReporterId(userInfo.id);
        const blockedUserIds = blocksResponse.data.map(block => block.reported.id);

        const availableProfiles = filteredProfiles.filter(profile =>
          !likedUserIds.includes(profile.id) &&
          !blockedUserIds.includes(profile.id)
        );

        setProfiles(availableProfiles);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener perfiles:", err);
        setError(t('errors.load_profiles'));
        setLoading(false);
      }
    };

    fetchProfilesAndLikes();
  }, [navigate, t]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      goToNextProfile();
    },
    trackMouse: true
  });

  const goToNextProfile = () => {
    setCurrentProfileIndex(prev =>
      prev >= profiles.length - 1 ? 0 : prev + 1
    );
  };

  const handleLike = async () => {
    try {
      const userInfo = authService.getUserInfo();
      if (!userInfo || !currentProfile) {
        console.error(t('errors.no_user_profile'));
        return;
      }

      const likeData = {
        liker: { id: userInfo.id },
        liked: { id: currentProfile.id },
        state: "PENDING"
      };

      const response = await likesService.postLike(likeData);

      if (response.data?.matchCreated) {
        alert(t('matches.match_alert', { name: currentProfile.name }));
      }

      setProfiles(prevProfiles => prevProfiles.filter(profile => profile.id !== currentProfile.id));
      goToNextProfile();
    } catch (err) {
      console.error(t('errors.like_error'), err);
    }
  };

  const handleBlock = async () => {
    try {
      const userInfo = authService.getUserInfo();
      if (!userInfo || !currentProfile) {
        console.error(t('errors.no_user_profile'));
        return;
      }

      const blockData = {
        reporter: { id: userInfo.id },
        reported: { id: currentProfile.id },
        blockReason: blockReason || t('blocked.default_reason')
      };

      await blocksService.create(blockData);
      setProfiles(prev => prev.filter(p => p.id !== currentProfile.id));
      goToNextProfile();
    } catch (err) {
      console.error(t('errors.block_error'), err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-xl">{t('common.loading_profiles')}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-xl text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-xl">{t('matches.no_profiles')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen lg:pt-16">
      <Header />
      <div className="lg:hidden fixed top-0 left-0 w-full flex justify-center bg-white shadow z-40 py-2">
        <img
          src={Logo}
          alt={t('header.title')}
          className="h-14"
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center p-4 w-full">
        <div
          {...handlers}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-xl shadow-lg overflow-hidden relative max-h-[80vh]"
          style={{ touchAction: 'pan-y' }}
        >
          <div className="h-auto aspect-[3/4] bg-gray-100 flex items-center justify-center overflow-hidden">
            {currentProfile.profilePhoto ? (
              <img
                src={currentProfile.profilePhoto}
                alt={`${currentProfile.name} ${currentProfile.lastName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-4xl text-gray-400">
                {currentProfile.name?.charAt(0)}{currentProfile.lastName?.charAt(0)}
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 text-white">
            <h2 className="text-xl sm:text-2xl font-bold">
              {currentProfile.name} {currentProfile.lastName}, {currentProfile.age}
            </h2>
            <p className="text-xs sm:text-sm opacity-80 mt-1">{currentProfile.location}</p>

            {currentProfile.bio && (
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm">{currentProfile.bio}</p>
            )}

            {currentProfile.interests && (
              <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
                {currentProfile.interests.split(',').map((interest, i) => (
                  <span
                    key={i}
                    className="bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs"
                  >
                    {interest.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 sm:gap-6 mt-3">
          <button
            onClick={() => setShowBlockModal(true)}
            className="bg-gray-200 hover:bg-gray-300 p-3 sm:p-4 rounded-full"
            aria-label={t('common.block')}
          >
            <Ban className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
          </button>

          <button
            onClick={handleLike}
            className="bg-pink-500 hover:bg-pink-600 text-white p-3 sm:p-4 rounded-full"
            aria-label={t('common.like')}
          >
            <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={goToNextProfile}
            className="bg-gray-200 hover:bg-gray-300 p-3 sm:p-4 rounded-full"
            aria-label={t('common.next')}
          >
            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
          </button>
        </div>

        <div
          className={`mt-6 text-gray-100 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-800 shadow-md transition-opacity duration-700 ${showInstructions ? 'opacity-100' : 'opacity-0'}`}
        >
          💡 {t('home.swipe_hint')}
        </div>
      </div>
      <Modal
        show={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        onConfirm={() => {
          handleBlock();
          setShowBlockModal(false);
        }}
        title={t('chat.block_confirm', { 
          name: `${currentProfile?.name} ${currentProfile?.lastName}`
        })}
        placeholder={t('chat.block_reason')}
        confirmText={t('common.block')}
        cancelText={t('common.cancel')}
        showReasonInput={true}
        reason={blockReason}
        onReasonChange={setBlockReason}
      />
    </div>
  );
}