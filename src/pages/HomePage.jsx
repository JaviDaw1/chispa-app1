import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import ProfileService from '../services/ProfileService';
import Notification from '../components/Notification';
import AuthService from '../services/AuthService';
import PreferenceService from '../services/PreferenceService';
import { useNavigate } from 'react-router-dom';
import LikesService from '../services/LikesService';
import BlocksService from '../services/BlocksService';
import Modal from '../components/Modal';
import TopHeader from '../components/TopHeader';
import { Heart, ArrowRight, Ban } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const profileService = new ProfileService();
const authService = new AuthService();
const likesService = new LikesService();
const blocksService = new BlocksService();
const preferenceService = new PreferenceService();

export default function HomePage() {
  const { t } = useTranslation();
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blockReason, setBlockReason] = useState('');
  const [showBlockNotification, setShowBlockNotification] = useState(false);
  const [blockedProfile, setBlockedProfile] = useState(null);
  // const [showInstructions, setShowInstructions] = useState(true);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showLikeNotification, setShowLikeNotification] = useState(false);
  const [likedProfile, setLikedProfile] = useState(null);
  const [showMatchNotification, setShowMatchNotification] = useState(false);
  const [showPreferenceNotification, setShowPreferenceNotification] = useState(false);
  const currentProfile = profiles[currentProfileIndex];
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowInstructions(false);
  //   }, 4000);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const loadData = async () => {
      const userInfo = authService.getUserInfo();
      if (!userInfo) {
        navigate("/login");
        return;
      }

      try {
        const [profileRes, likesRes, blocksRes, prefRes] = await Promise.all([
          profileService.getAllProfiles(),
          likesService.getLikesByLikerId(userInfo.id),
          blocksService.getBlocksByReporterId(userInfo.id),
          preferenceService.getPreferencesByUserId(userInfo.id).catch(err => {
            if (err.response?.status === 404) {
              // setShowPreferenceNotification(true);
              return { data: {} };
            } else {
              console.error("Error fetching preferences:", err);
              throw err;
            }
          })
        ]);

        const allProfiles = profileRes.data;
        const likedUserIds = likesRes.data.map(like => like.liked.id);
        const blockedUserIds = blocksRes.data.map(block => block.reported.id);
        const preferences = prefRes.data;

        let availableProfiles = allProfiles.filter(profile =>
          profile.user.id !== userInfo.id &&
          profile.user.role !== "ADMIN" &&
          !likedUserIds.includes(profile.id) &&
          !blockedUserIds.includes(profile.id)
        );

        if (
          preferences &&
          (preferences.favoriteGender || preferences.minAgeRange || preferences.maxAgeRange)
        ) {
          const {
            favoriteGender,
            minAgeRange,
            maxAgeRange,
            // maxDistance,
          } = preferences;

          availableProfiles = availableProfiles.filter(profile => {
            const matchGender = !favoriteGender || favoriteGender === "OTHER" || profile.gender === favoriteGender;
            const matchAge =
              (!minAgeRange || profile.age >= minAgeRange) &&
              (!maxAgeRange || profile.age <= maxAgeRange);
            // const matchLocation = !maxDistance || profile.location === maxDistance;
            // && matchLocation
            return matchGender && matchAge;
          });
        }
        setProfiles(availableProfiles);
      } catch (err) {
        console.error("Error cargando datos:", err);
        setError(t('errors.load_profiles'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate, t]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      goToNextProfile();
    },
    trackMouse: true
  });

  const goToNextProfile = () => {
    setCurrentProfileIndex(prev => prev >= profiles.length - 1 ? 0 : prev + 1)
    //TODO: Pensar si es mejor que sea infinito o que tenga un final el swipe
    // setCurrentProfileIndex(prev => prev + 1);
  };

  const handleLike = async () => {
    try {
      const userInfo = authService.getUserInfo();
      if (!userInfo || !currentProfile) {
        console.error(t('errors.no_user_profile'));
        return;
      }

      const likedProfile = currentProfile;
      setLikedProfile(likedProfile);

      const likeData = {
        liker: { id: userInfo.id },
        liked: { id: likedProfile.id },
      };

      const response = await likesService.postLike(likeData);

      if (response.data?.matchCreated) {
        setShowMatchNotification(true);
        setShowLikeNotification(false);
        setTimeout(() => setShowMatchNotification(false), 2500);
      } else {
        setShowLikeNotification(true);
        setShowMatchNotification(false);
        setTimeout(() => setShowLikeNotification(false), 2000);
      }

      setProfiles(prevProfiles => prevProfiles.filter(profile => profile.id !== likedProfile.id));
      goToNextProfile();

    } catch (err) {
      console.error(t('errors.like_error'), err);
    }
  };


  const handleBlock = async (profileToBlock) => {
    try {
      const userInfo = authService.getUserInfo();
      if (!userInfo || !profileToBlock) {
        console.error(t('errors.no_user_profile'));
        return;
      }

      const blockData = {
        reporter: { id: userInfo.id },
        reported: { id: profileToBlock.id },
        blockReason: blockReason || t('blocked.default_reason')
      };

      await blocksService.postBlock(blockData);

      setBlockedProfile(profileToBlock);
      setShowBlockNotification(true);
      setTimeout(() => setShowBlockNotification(false), 2500);

      setProfiles(prev => prev.filter(p => p.id !== profileToBlock.id));
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

  if (!currentProfile) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-xl">{t('matches.no_profiles')}</div>
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
      <TopHeader showSwitcher={true} logoSrc='/images/logo.jpg' />
      <div className="flex flex-1 flex-col items-center justify-center p-4 w-full">
        <div
          {...handlers}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative max-h-[80vh]"
          style={{ touchAction: 'pan-y' }}
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg max-h-[80vh] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProfile.id}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="bg-white rounded-xl shadow-lg relative overflow-hidden h-full w-full"
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
                  {currentProfile.preferredRelationship && (
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-pink-200">
                      💘 {t('signup.relationship')}{': '}
                      {t(`profile.relationships.${(currentProfile.preferredRelationship).toLowerCase()}`) || currentProfile.preferredRelationship}
                    </p>
                  )}

                </div>
              </motion.div>
            </AnimatePresence>
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

        {/* <div
          className={`mt-6 text-gray-100 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-800 dark:bg-gray-300 dark:text-gray-800 shadow-md transition-opacity duration-700 ${showInstructions ? 'opacity-100' : 'opacity-0'}`}
        >
          💡 {t('home.swipe_hint')}
        </div> */}
        <Modal
          show={showBlockModal}
          onClose={() => setShowBlockModal(false)}
          onConfirm={() => {
            handleBlock(currentProfile);
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
        <Notification
          show={showPreferenceNotification}
          message={t('preferences.missing_alert')}
          type="info"
          duration={3000}
          onClose={() => setShowPreferenceNotification(false)}
        />
        <Notification
          show={showMatchNotification}
          message={t('matches.match_alert', { name: currentProfile?.name })}
          type="match"
          duration={2500}
          onClose={() => setShowMatchNotification(false)}
        />
        <Notification
          show={showLikeNotification}
          message={t('matches.like_alert', { name: likedProfile?.name })}
          type="like"
          duration={2000}
          onClose={() => setShowLikeNotification(false)}
        />
        <Notification
          show={showBlockNotification}
          message={t('blocked.block_alert', { name: blockedProfile?.name })}
          type="success"
          duration={2500}
          onClose={() => setShowBlockNotification(false)}
        />
      </div>
    </div>
  );
}