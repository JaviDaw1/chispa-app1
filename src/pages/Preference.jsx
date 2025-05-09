import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PreferenceService from "../services/PreferenceService";
import AuthService from "../services/AuthService";
import Header from "../components/Header";
import Divider from "../components/Divider";

const authService = new AuthService();
const preferenceService = new PreferenceService();

const Preference = () => {
  const [preferencias, setPreferencias] = useState({
    favoriteGender: "",
    minAgeRange: 18,
    maxAgeRange: 100,
    maxDistance: 20
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [tempPreferences, setTempPreferences] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const traducirGenero = (enumValue) => {
    switch (enumValue) {
      case "MALE": return "Hombre";
      case "FEMALE": return "Mujer";
      case "OTHER": return "Otro";
      default: return "No especificado";
    }
  };

  const cargarPreferencias = async () => {
    try {
      const user = authService.getUserInfo();
      if (!user?.id) {
        navigate("/login");
        return;
      }
  
      const response = await preferenceService.getByUserId(user.id);
  
      let prefs;
      if (response.data) {
        // Ya existen preferencias
        prefs = {
          favoriteGender: response.data.favoriteGender || "",
          minAgeRange: response.data.minAgeRange || 18,
          maxAgeRange: response.data.maxAgeRange || 100,
          maxDistance: response.data.maxDistance || 20
        };
      } else {
        // No existen preferencias: se crean
        const defaultPrefs = {
          favoriteGender: "",
          minAgeRange: 18,
          maxAgeRange: 100,
          maxDistance: 20,
          user: { id: user.id }
        };
        const created = await preferenceService.create(defaultPrefs);
        prefs = {
          favoriteGender: created.data.favoriteGender || "",
          minAgeRange: created.data.minAgeRange || 18,
          maxAgeRange: created.data.maxAgeRange || 100,
          maxDistance: created.data.maxDistance || 20
        };
      }
  
      setPreferencias(prefs);
      setTempPreferences(prefs);
    } catch (error) {
      console.log("Error al cargar o crear preferencias:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setTempPreferences(preferencias);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const user = authService.getUserInfo();
      if (!user?.id) {
        navigate("/login");
        return;
      }

      const currentPrefs = await preferenceService.getByUserId(user.id);
      const preferencesToSend = {
        ...tempPreferences,
        user: { id: user.id }
      };

      let response;
      if (currentPrefs.data) {
        response = await preferenceService.update(currentPrefs.data.id, preferencesToSend);
      } else {
        response = await preferenceService.create(preferencesToSend);
      }

      if (response.data) {
        setPreferencias(response.data);
        setEditing(false);
      }
    } catch (error) {
      console.log("Error al guardar preferencias:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempPreferences(prev => ({
      ...prev,
      [name]: name.includes("AgeRange") || name.includes("Distance") ? parseInt(value) : value
    }));
  };

  useEffect(() => {
    cargarPreferencias();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div>Cargando preferencias...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center py-4">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">Mis Preferencias</h2>
            {!editing ? (
              <button 
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-600 ease-in-out transition-all duration-200 text-white font-semibold py-2 px-4 rounded"
              >
                Editar
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 ease-in-out transition-all duration-200 text-white font-semibold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-500 hover:bg-green-600 ease-in-out transition-all duration-200 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
                >
                  {isSaving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            )}
          </div>
          
          {!editing ? (
            <>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Género de interés: <span className="text-gray-900">{traducirGenero(preferencias.favoriteGender)}</span>
                </label>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Rango de edad: <span className="text-gray-900">{preferencias.minAgeRange} - {preferencias.maxAgeRange} años</span>
                </label>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700">
                  Distancia máxima: <span className="text-gray-900">{preferencias.maxDistance} km</span>
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700 mb-2">
                  Género de interés:
                </label>
                <select
                  name="favoriteGender"
                  value={tempPreferences.favoriteGender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecciona un género</option>
                  <option value="MALE">Hombre</option>
                  <option value="FEMALE">Mujer</option>
                  <option value="OTHER">Otro</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700 mb-2">
                  Rango de edad:
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">Mínimo:</label>
                    <input
                      type="number"
                      name="minAgeRange"
                      min="18"
                      max={tempPreferences.maxAgeRange}
                      value={tempPreferences.minAgeRange}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">Máximo:</label>
                    <input
                      type="number"
                      name="maxAgeRange"
                      min={tempPreferences.minAgeRange}
                      max="100"
                      value={tempPreferences.maxAgeRange}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm sm:text-lg font-medium text-gray-700 mb-2">
                  Distancia máxima (km):
                </label>
                <input
                  type="number"
                  name="maxDistance"
                  min="1"
                  max="100"
                  value={tempPreferences.maxDistance}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}
          
          <Divider className="my-5" />
          
          <button 
            onClick={() => navigate("/")} 
            className="bg-gray-500 hover:bg-gray-600 ease-in-out transition-all duration-200 text-white font-semibold py-2 px-4 rounded"
          >
            Ir a Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preference;
