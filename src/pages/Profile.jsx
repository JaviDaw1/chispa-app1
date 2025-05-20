import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthService from "../services/AuthService";
import ProfileService from "../services/ProfileService";
import Header from "../components/Header";
import Notification from "../components/Notification";

const authService = new AuthService();
const profileService = new ProfileService();

const Profile = () => {
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});
  const { t } = useTranslation();
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.notification?.show) {
      setNotificationData(location.state.notification);
      setShowNotification(true);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state?.notification?.show) {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  }, [location.state]);

  const fetchProfile = useCallback(async (userInfo) => {
    try {
      setLoading(true);
      let profileData;
      if (id) {
        const { data } = await profileService.getById(id);
        profileData = data;
      } else {
        const { data } = await profileService.getByUserId(userInfo.id);
        profileData = data;
      }
      setProfile(profileData);
      setError(null);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      if (error.response?.status === 404) {
        setProfile(null);
        setError(t("profile.not_found"));
      } else {
        setError(t("profile.load_error"));
      }
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  useEffect(() => {
    const userInfo = authService.getUserInfo();
    if (!userInfo) {
      navigate("/login");
      return;
    }

    fetchProfile(userInfo);
  }, [navigate, fetchProfile]);

  const formatLastActive = (dateString) => {
    if (!dateString) return t("profile.never_active");

    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return t("profile.just_now");
    if (diffInSeconds < 3600) return t("profile.minutes_ago", { minutes: Math.floor(diffInSeconds / 60) });
    if (diffInSeconds < 86400) return t("profile.hours_ago", { hours: Math.floor(diffInSeconds / 3600) });

    const days = Math.floor(diffInSeconds / 86400);
    if (days === 1) return t("profile.yesterday");
    if (days < 7) return t("profile.days_ago", { days });

    return date.toLocaleDateString();
  };

  const handlePreferences = () => navigate("/preference");

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      navigate("/", { replace: true });
    }
  };

  const handleCompleteProfile = () => navigate("/create-profile");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">{t("profile.loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)] ">
          <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{error}</h3>
            <button
              onClick={handleCompleteProfile}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              {t("profile.complete_profile")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      {showNotification && (
        <Notification
          show={showNotification}
          type={notificationData.type}
          message={notificationData.message}
          onClose={() => setShowNotification(false)}
        />
      )}

      <main className="container mx-auto px-4 py-8 max-w-5xl pb-16">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header con foto de perfil */}
          <div className="relative bg-gradient-to-r from-orange-400 to-amber-500 h-48">
            {profile?.profilePhoto && (
              <div className="absolute -bottom-16 left-8">
                <img
                  src={profile.profilePhoto}
                  alt="Foto de perfil"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
                />
              </div>
            )}
            <div className="absolute bottom-4 right-4">
              {profile?.isOnline ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  {t("profile.online")}
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
                  {t("profile.last_active")}: {formatLastActive(profile?.lastActive)}
                </span>
              )}
            </div>
          </div>

          {/* Contenido principal */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
                  {profile?.name} {profile?.lastName}
                </h1>
                {profile?.age && (
                  <p className="text-gray-500 text-sm sm:text-base">{profile.age} {t("profile.years")}</p>
                )}
              </div>

              {!id && (
                <button
                  onClick={handleCompleteProfile}
                  className="self-start px-4 py-2 text-sm sm:text-base bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  {t("profile.edit")}
                </button>
              )}
            </div>

            {/* Alerta de perfil incompleto */}
            {(!profile || Object.values(profile).every((val) => !val)) && (
              <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-lg flex items-start gap-3">
                <svg className="h-5 w-5 text-amber-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-amber-700">
                  {t("profile.incomplete_warning")}
                </p>
              </div>
            )}

            {/* Grid de información */}
            {profile ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <ProfileSection title={t("profile.basic_info")}>
                    <ProfileField label={t("profile.gender")} value={profile.gender} />
                    <ProfileField
                      label={t("profile.birthdate")}
                      value={profile.birthDate ? new Date(profile.birthDate).toLocaleDateString() : ''}
                    />
                    <ProfileField label={t("profile.location")} value={profile.location} />
                  </ProfileSection>

                  {profile.bio && (
                    <ProfileSection title={t("profile.about")}>
                      <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
                    </ProfileSection>
                  )}
                </div>

                <div className="space-y-6">
                  {profile.interests && (
                    <ProfileSection title={t("profile.interests")}>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.split(',').map((interest, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {interest.trim()}
                          </span>
                        ))}
                      </div>
                    </ProfileSection>
                  )}

                  <ProfileSection title={t("profile.preferences")}>
                    <ProfileField
                      label={t("profile.relationship_type")}
                      value={profile.preferredRelationship}
                    />
                  </ProfileSection>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">{t("profile.not_found")}</h3>
                <button
                  onClick={handleCompleteProfile}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  {t("profile.complete_profile")}
                </button>
              </div>
            )}
          </div>

          {/* Footer con acciones */}
          {!id && (
            <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={handlePreferences}
                  className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  {t("profile.preferences_button")}
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                >
                  {t("profile.logout_button")}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const ProfileSection = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const ProfileField = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-gray-800 mt-1">{value || '-'}</p>
  </div>
);

export default Profile;