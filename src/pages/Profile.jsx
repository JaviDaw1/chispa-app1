import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import ProfileService from "../services/ProfileService";
import Header from "../components/Header";
import Divider from "../components/Divider";

const authService = new AuthService();
const profileService = new ProfileService();

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = useCallback(async (userInfo) => {
    try {
      setLoading(true);
      const { data } = await profileService.getByUserId(userInfo.id);
      setProfile(data);
      setError(null);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      if (error.response && error.response.status === 404) {
        setProfile(null);
        setError(null);
      } else {
        setError("Error al cargar el perfil");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const userInfo = authService.getUserInfo();
    if (!userInfo) {
      navigate("/login");
      return;
    }
    fetchProfile(userInfo);
  }, [navigate, fetchProfile]);

  const handlePreferences = () => navigate("/preference");
  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };
  const handleCompleteProfile = () => navigate("/create-profile");

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen pt-16">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-xl text-gray-600">Cargando perfil...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen pt-16">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-red-500 mb-6">{error}</p>
            <button
              onClick={handleCompleteProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition"
            >
              Completar Perfil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-16 pt-10 bg-gray-50">
      <Header />
      <div className="flex flex-1 items-center justify-center py-6">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-6 mx-2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Mi Perfil
          </h2>

          {(!profile || Object.values(profile).every((val) => !val)) && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg flex items-start gap-3">
              <svg
                className="h-6 w-6 text-yellow-400 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-yellow-700">
                Tu perfil está incompleto o no existe. Por favor completa tu
                información.
              </p>
            </div>
          )}

          {profile ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <ProfileField label="Nombre" value={profile.name} />
                <ProfileField label="Apellido" value={profile.lastName} />
                <ProfileField label="Género" value={profile.gender} />
                <ProfileField
                  label="Fecha de nacimiento"
                  value={new Date(profile.birthDate).toLocaleDateString()}
                />
                <ProfileField label="Edad" value={profile.age} />
                {profile.location && (
                  <ProfileField label="Ubicación" value={profile.location} />
                )}
                {profile.bio && (
                  <ProfileField label="Biografía" value={profile.bio} />
                )}
                {profile.interests && (
                  <ProfileField label="Intereses" value={profile.interests} />
                )}
                <ProfileField
                  label="Relación preferida"
                  value={profile.preferredRelationship}
                />
              </div>

              <div className="flex flex-col items-center space-y-4">
                {profile.profilePhoto && (
                  <img
                    src={profile.profilePhoto}
                    alt="Foto de perfil"
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border"
                  />
                )}
                <ProfileField
                  label="Estado"
                  value={profile.isOnline ? "En línea" : "Desconectado"}
                  valueColor={profile.isOnline ? "green" : "gray"}
                />
                <ProfileField
                  label="Última conexión"
                  value={new Date(profile.lastActive).toLocaleString()}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              No se encontró información de perfil.
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              onClick={handleCompleteProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition"
            >
              {profile ? "Editar Perfil" : "Crear Perfil"}
            </button>
          </div>

          <Divider className="my-6" />

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePreferences}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded flex-1 transition"
            >
              Preferencias
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded flex-1 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value, valueColor = "gray" }) => (
  <div>
    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
      {label}:
    </label>
    <p className={`text-${valueColor}-900 break-words`}>{value}</p>
  </div>
);

export default Profile;
