// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import ProfileService from '../services/ProfileService';
import Header from '../components/Header';
import Divider from '../components/Divider';

const authService = new AuthService();
const profileService = new ProfileService();

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const userInfo = authService.getUserInfo();
      if (!userInfo) {
        navigate("/login");
        return;
      }

      setUser(userInfo);

      try {
        const { data } = await profileService.getByUserId(userInfo.id);
        setProfile(data);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };
    fetchUserAndProfile();
  }, [navigate]);

  const handlePreferences = () => {
    navigate('/preference');
  }

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (!profile) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center py-4">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg mx-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Mi Perfil</h2>
          {user ? (
            <div>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Nombre: <span className="text-gray-900">{profile.name}</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Apellido: <span className="text-gray-900">{profile.lastName}</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Género: <span className="text-gray-900">{profile.gender}</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Edad: <span className="text-gray-900">{profile.age}</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                   Fecha de Nacimiento: <span className="text-gray-900">{profile.birthDate}</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Localización: <span className="text-gray-900">{profile.location}</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Biografía: <span className="text-gray-900">{profile.bio}</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Intereses: <span className="text-gray-900">{profile.interests}</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Foto: <span className="text-gray-900">{profile.profilePhoto}</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Online: <span className="text-gray-900">{profile.isOnline}</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Ultima actividad: <span className="text-gray-900">{profile.lastActive}</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Preferencia Relación: <span className="text-gray-900">{profile.preferredRelationship}</span>
                </label>
              </div>
              <Divider className='my-5' />
              <div className='flex justify-between'>
                <button onClick={handlePreferences} className="bg-gray-500 hover:bg-gray-600 ease-in-out transition-all duration-200 text-white font-semibold py-2 px-4 rounded">
                  Mis Preferencias
                </button>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 ease-in-out transition-all duration-200 text-white font-semibold py-2 px-4 rounded">
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
