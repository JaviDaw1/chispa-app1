import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import ProfileService from "../services/ProfileService";
import Header from "../components/Header";
import Divider from "../components/Divider";

const authService = new AuthService();
const profileService = new ProfileService();

const Profile = () => {
  // const [user, setUser] = useState(null);
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
        // Perfil no encontrado, se trata como "sin perfil"
        setProfile(null);
        setError(null); // no mostrar error
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

    // setUser(userInfo);
    fetchProfile(userInfo);
  }, [navigate, fetchProfile]);

  const handlePreferences = () => {
    navigate("/preference");
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const handleCompleteProfile = () => {
    navigate("/create-profile");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-xl">Cargando perfil...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-red-500 mb-4">{error}</p>
            <button
              onClick={handleCompleteProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
            >
              Completar Perfil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center py-4">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg mx-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Mi Perfil
          </h2>

          {(!profile || Object.values(profile).every((val) => !val)) && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Tu perfil está incompleto o no existe. Por favor completa tu
                    información.
                  </p>
                </div>
              </div>
            </div>
          )}

          {profile ? (
            <div>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Nombre: <span className="text-gray-900">{profile.name}</span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Apellido:{" "}
                  <span className="text-gray-900">{profile.lastName}</span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Género:{" "}
                  <span className="text-gray-900">{profile.gender}</span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Fecha de nacimiento:{" "}
                  <span className="text-gray-900">
                    {new Date(profile.birthDate).toLocaleDateString()}
                  </span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Edad: <span className="text-gray-900">{profile.age}</span>
                </label>
              </div>

              {profile.location && (
                <div className="mb-4">
                  <label className="block text-sm sm:text-lg font-medium text-gray-700">
                    Ubicación:{" "}
                    <span className="text-gray-900">{profile.location}</span>
                  </label>
                </div>
              )}

              {profile.bio && (
                <div className="mb-4">
                  <label className="block text-sm sm:text-lg font-medium text-gray-700">
                    Biografía:
                  </label>
                  <p className="text-gray-900 whitespace-pre-line">
                    {profile.bio}
                  </p>
                </div>
              )}

              {profile.interests && (
                <div className="mb-4">
                  <label className="block text-sm sm:text-lg font-medium text-gray-700">
                    Intereses:
                  </label>
                  <p className="text-gray-900 whitespace-pre-line">
                    {profile.interests}
                  </p>
                </div>
              )}

              {profile.profilePhoto && (
                <div className="mb-4">
                  <label className="block text-sm sm:text-lg font-medium text-gray-700">
                    Foto de perfil:
                  </label>
                  <img
                    src={profile.profilePhoto}
                    alt="Foto de perfil"
                    className="w-32 h-32 rounded-full object-cover border mt-2"
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Estado:{" "}
                  <span
                    className={`text-${
                      profile.isOnline ? "green" : "gray"
                    }-600`}
                  >
                    {profile.isOnline ? "En línea" : "Desconectado"}
                  </span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Última conexión:{" "}
                  <span className="text-gray-900">
                    {new Date(profile.lastActive).toLocaleString()}
                  </span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Relación preferida:{" "}
                  <span className="text-gray-900">
                    {profile.preferredRelationship}
                  </span>
                </label>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                No se encontró información de perfil.
              </p>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleCompleteProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
            >
              {profile ? "Editar Perfil" : "Crear Perfil"}
            </button>
          </div>

          <Divider className="my-6" />

          <div className="flex justify-between flex-wrap gap-4">
            <button
              onClick={handlePreferences}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded flex-1 transition-colors"
            >
              Preferencias
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded flex-1 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
