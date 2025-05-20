import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BlocksService from "../services/BlocksService";
import AuthService from "../services/AuthService";
import LikesService from '../services/LikesService';
import { User, ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Notification from '../components/Notification';

const likesService = new LikesService();

export default function BlockedUsers() {
  const { t } = useTranslation();
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [blockedCount, setBlockedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userToUnblock, setUserToUnblock] = useState(null);
  const [showUnblockNotification, setShowUnblockNotification] = useState(false);
  const [unblockedUser, setUnblockedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const userInfo = new AuthService().getUserInfo();
        if (!userInfo || !userInfo.id) {
          navigate("/login");
          return;
        }

        const response = await new BlocksService().getByReporterId(userInfo.id);

        const users = response.data.map((block) => ({
          blockId: block.id,
          id: block.reported.id,
          firstname: block.reported.firstname,
          lastname: block.reported.lastname,
          username: block.reported.username,
        }));

        setBlockedUsers(users);
        setBlockedCount(users.length);
      } catch (err) {
        setError(t('errors.load_profiles'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlockedUsers();
  }, [navigate, t]);

  const handleUnblock = (user) => {
    setUserToUnblock(user);
    setShowModal(true);
  };

  const confirmUnblock = async () => {
    try {
      await new BlocksService().delete(userToUnblock.blockId);

      const currentUser = new AuthService().getUserInfo();
      await likesService.deleteLikeByLikerIdAndLikedId(currentUser.id, userToUnblock.id);
      await likesService.deleteLikeByLikerIdAndLikedId(userToUnblock.id, currentUser.id);

      setBlockedUsers((prev) =>
        prev.filter((user) => user.blockId !== userToUnblock.blockId)
      );
      setBlockedCount((prev) => prev - 1);

      setUnblockedUser(userToUnblock); // nuevo
      setShowUnblockNotification(true); // nuevo
    } catch (error) {
      console.error(t('errors.block_error'), error);
    } finally {
      setShowModal(false);
    }
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setUserToUnblock(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 lg:mt-16 sm:mb-8 mb-4">
      <Header />
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="mb-10 w-full flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 p-2 rounded-full hover:bg-gray-200"
            aria-label={t('common.back')}
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 text-center">
              {t('blocked.title')}
            </h1>
            <p className="text-gray-600 mt-2 text-center">
              {t('blocked.subtitle')}
            </p>
          </div>
          <div className="w-8" />
        </div>

        {loading ? (
          <div className="text-center">{t('common.loading')}</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            <div className="text-center mb-8">
              {blockedCount > 0 ? (
                <h2 className="text-xl font-bold text-gray-800">
                  {t('blocked.blocked_count', { count: blockedCount })}
                </h2>
              ) : (
                <h2 className="text-xl font-bold text-gray-800">
                  {t('blocked.no_blocked')}
                </h2>
              )}
            </div>

            {blockedCount > 0 && (
              <div className="space-y-4 w-full">
                {blockedUsers.map((user) => (
                  <div
                    key={user.blockId}
                    className="flex items-center justify-between bg-white p-4 rounded-xl shadow hover:shadow-md transition-all"
                  >
                    <div className="flex items-center">
                      <User className="text-blue-600 mr-3" />
                      <span className="font-semibold">
                        {user.firstname} {user.lastname} (@{user.username})
                      </span>
                    </div>
                    <button
                      onClick={() => handleUnblock(user)}
                      className="px-4 py-2 text-red-500 hover:bg-red-100 rounded-lg"
                    >
                      {t('blocked.unblock')}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={confirmUnblock}
        title={t('blocked.unblock_confirm_title')}
        message={t('blocked.unblock_confirm', {
          name: `${userToUnblock?.firstname} ${userToUnblock?.lastname}`
        })}
        confirmText={t('blocked.unblock')}
        cancelText={t('common.cancel')}
      />
      
      <Notification
        show={showUnblockNotification}
        message={t('blocked.unblock_alert', {
          name: `${unblockedUser?.firstname} ${unblockedUser?.lastname}`
        })}
        type="success"
        duration={2000}
        onClose={() => setShowUnblockNotification(false)}
      />
    </div>
  );
}