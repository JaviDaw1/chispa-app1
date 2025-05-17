import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PreferenceService from "../services/PreferenceService";
import AuthService from "../services/AuthService";
import Header from "../components/Header";
import Divider from "../components/Divider";

const authService = new AuthService();
const preferenceService = new PreferenceService();

const Preference = () => {
  const [preferencias, setPreferencias] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [tempPreferences, setTempPreferences] = useState({
    favoriteGender: "",
    minAgeRange: 18,
    maxAgeRange: 100,
    maxDistance: 20
  });
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

  const loadPreferences = async () => {
    try {
      const user = authService.getUserInfo();
      if (!user?.id) {
        navigate("/login");
        return;
      }

      const response = await preferenceService.getByUserId(user.id);
      if (response.data) {
        const prefs = {
          favoriteGender: response.data.favoriteGender || "",
          minAgeRange: response.data.minAgeRange || 18,
          maxAgeRange: response.data.maxAgeRange || 100,
          maxDistance: response.data.maxDistance || 20
        };
        setPreferencias(prefs);
        setTempPreferences(prefs);
      } else {
        // Si no hay preferencias, inicializamos con valores por defecto
        const defaultPrefs = {
          favoriteGender: "",
          minAgeRange: 18,
          maxAgeRange: 100,
          maxDistance: 20
        };
        setTempPreferences(defaultPrefs);
      }
    } catch (error) {
      console.log("Error al cargar preferencias:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    if (!preferencias) {
      setTempPreferences({
        favoriteGender: "",
        minAgeRange: 18,
        maxAgeRange: 100,
        maxDistance: 20
      });
    }
  };

  const handleCancel = () => {
    setEditing(false);
    if (preferencias) {
      setTempPreferences(preferencias);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const user = authService.getUserInfo();
      if (!user?.id) {
        navigate("/login");
        return;
      }

      const preferencesToSend = {
        ...tempPreferences,
        user: { id: user.id }
      };

      let response;
      if (preferencias) {
        const currentPrefs = await preferenceService.getByUserId(user.id);
        response = await preferenceService.update(currentPrefs.data.id, preferencesToSend);
      } else {
        response = await preferenceService.create(preferencesToSend);
      }

      if (response.data) {
        setPreferencias(response.data);
        setEditing(false);
        await loadPreferences();
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
    loadPreferences();
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Mis Preferencias</h2>
            {!editing ? (
              <button
                onClick={handleEdit}
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-xl transition duration-200"
              >
                {preferencias ? "Editar" : "Crear Preferencias"}
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-xl transition duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-xl transition duration-200 disabled:opacity-50"
                >
                  {isSaving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            )}
          </div>

          {!editing ? (
            preferencias ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-700">Género de interés:</h4>
                  <p className="text-gray-800">{traducirGenero(preferencias.favoriteGender)}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-700">Rango de edad:</h4>
                  <p className="text-gray-800">{preferencias.minAgeRange} - {preferencias.maxAgeRange} años</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-700">Distancia máxima:</h4>
                  <p className="text-gray-800">{preferencias.maxDistance} km</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 italic">No tienes preferencias configuradas aún.</div>
            )
          ) : (
            <div className="space-y-6">
              {/* Género */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Género de interés:</label>
                <select
                  name="favoriteGender"
                  value={tempPreferences.favoriteGender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Selecciona un género</option>
                  <option value="MALE">Hombre</option>
                  <option value="FEMALE">Mujer</option>
                  <option value="OTHER">Otro</option>
                </select>
              </div>

              {/* Rango de edad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rango de edad:</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-600 mb-1">Mínimo</label>
                    <input
                      type="number"
                      name="minAgeRange"
                      min="18"
                      max={tempPreferences.maxAgeRange}
                      value={tempPreferences.minAgeRange}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-600 mb-1">Máximo</label>
                    <input
                      type="number"
                      name="maxAgeRange"
                      min={tempPreferences.minAgeRange}
                      max="100"
                      value={tempPreferences.maxAgeRange}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Distancia */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Distancia máxima (km):</label>
                <input
                  type="number"
                  name="maxDistance"
                  min="1"
                  max="100"
                  value={tempPreferences.maxDistance}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          )}

          <Divider className="my-6" />

          <div className="flex justify-end">
            <button
              onClick={() => navigate("/")}
              className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-xl transition duration-200"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Preference;