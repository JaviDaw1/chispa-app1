import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Header from "../components/Header";
import ProfileService from "../services/ProfileService";
import AuthService from "../services/AuthService";

const profileService = new ProfileService();
const authService = new AuthService();

export default function CreateProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    gender: "MALE",
    birthDate: "",
    location: "",
    bio: "",
    interests: "",
    profilePhoto: "",
    preferredRelationship: "CASUAL",
  });

  useEffect(() => {
    const user = authService.getUserInfo();
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchExistingProfile = async () => {
      try {
        const { data } = await profileService.getByUserId(user.id);
        if (data) {
          setFormData({
            name: data.name || "",
            lastName: data.lastName || "",
            gender: data.gender || "MALE",
            birthDate: data.birthDate ? data.birthDate.split("T")[0] : "",
            location: data.location || "",
            bio: data.bio || "",
            interests: data.interests || "",
            profilePhoto: data.profilePhoto || "",
            preferredRelationship: data.preferredRelationship || "CASUAL",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExistingProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = authService.getUserInfo();
    if (!user) {
      navigate("/login");
      return;
    }

    // Formatear los datos según la estructura requerida
    const profileData = {
      user: {
        id: user.id,
        firstname: formData.name,
        lastname: formData.lastName,
      },
      name: formData.name,
      lastName: formData.lastName,
      gender: formData.gender,
      birthDate: formData.birthDate,
      location: formData.location,
      bio: formData.bio,
      interests: formData.interests,
      profilePhoto: formData.profilePhoto,
      preferredRelationship: formData.preferredRelationship
    };

    try {
      setLoading(true);
      const { data: existingProfile } = await profileService.getByUserId(user.id);

      if (existingProfile) {
        await profileService.update(existingProfile.id, profileData);
        profileService.clearCache();
      } else {
        await profileService.create(profileData);
        profileService.clearCache(); // Limpiar cache después de crear
      }
      navigate("/profile", {
        state: {
          notification: {
            show: true,
            type: "success",
            message: "Perfil guardado correctamente."
          }
        }
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      alert(`Error al guardar el perfil: ${error.message}. Por favor intenta nuevamente.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-xl">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 lg:pt-20 pb-20 pt-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {formData.name ? "Editar Perfil" : "Completar Perfil"}
          </h2>

          <div className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellido*
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            {/* Género */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Género*
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="MALE">Hombre</option>
                <option value="FEMALE">Mujer</option>
                <option value="OTHER">Otro</option>
              </select>
            </div>

            {/* Fecha de nacimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de nacimiento*
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Biografía */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biografía
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
              />
            </div>

            {/* Relación preferida */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('signup.relationship')}
              </label>
              <select
                name="preferredRelationship"
                value={formData.preferredRelationship}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="FRIENDSHIP">{t('common.friendship')}</option>
                <option value="CASUAL">{t('common.casual')}</option>
                <option value="SERIOUS">{t('common.serious')}</option>
                <option value="LONG_TERM">{t('common.longTerm')}</option>
                <option value="OPEN">{t('common.open')}</option>
                <option value="HOOKUP">{t('common.hookup')}</option>
                <option value="MARRIAGE">{t('common.marriage')}</option>
                <option value="NOT_SURE">{t('common.notSure')}</option>
              </select>
            </div>

            {/* Intereses */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Intereses
              </label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                rows={2}
              />
            </div>

            {/* Foto de perfil */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de foto de perfil
              </label>
              <input
                type="text"
                name="profilePhoto"
                value={formData.profilePhoto}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              {formData.profilePhoto && (
                <img
                  src={formData.profilePhoto}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover mt-2 border"
                />
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium transition duration-200 ease-in-out ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Guardando..." : "Guardar Perfil"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-6 w-full py-2 px-4 rounded-md bg-gray-400 hover:bg-gray-500 text-white font-medium flex items-center justify-center transition duration-200 ease-in-out"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
