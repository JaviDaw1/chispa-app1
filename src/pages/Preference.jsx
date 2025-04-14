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
  const navigate = useNavigate();

  const cargarPreferencias = async () => {
    try {
      const user = authService.getUserInfo();
      if (!user?.id) {
        navigate("/login");
        return;
      }

      const response = await preferenceService.getByUserId(user.id);
      if (response.data) {
        setPreferencias({
          favoriteGender: response.data.favoriteGender || "",
          minAgeRange: response.data.minAgeRange || 18,
          maxAgeRange: response.data.maxAgeRange || 100,
          maxDistance: response.data.maxDistance || 20
        });
      }
    } catch (error) {
      console.log("Error al cargar preferencias:", error);
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Mis Preferencias</h2>
          
          <div className="mb-4">
            <label className="block text-sm sm:text-lg font-medium text-gray-700">
              Género de interés: <span className="text-gray-900">{preferencias.favoriteGender || "No especificado"}</span>
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