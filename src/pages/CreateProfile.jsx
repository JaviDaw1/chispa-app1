/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProfileService from '../services/ProfileService';
import AuthService from '../services/AuthService';

const profileService = new ProfileService();
const authService = new AuthService();

export default function CreateProfile() {
  const navigate = useNavigate();
  const user = authService.getUserInfo();

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    gender: 'MALE',
    birthDate: '',
    location: '',
    bio: '',
    interests: '',
    profilePhoto: '',
    isOnline: true,
    lastActive: new Date().toISOString(),
    preferredRelationship: 'CASUAL',
    user: {
      id: user.id,
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      birthDate: new Date(formData.birthDate).toISOString().split('T')[0],
      lastActive: new Date().toISOString(),
      user: {
        id: user.id,
      }
    };

    try {
      await profileService.create(formattedData);
      navigate('/profile');
    } catch (err) {
      console.error('Error al crear el perfil:', err);
      alert('No se pudo crear el perfil.');
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center py-8 bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-full max-w-xl space-y-4">
          <h2 className="text-2xl font-bold mb-4">Crear Perfil</h2>
          <input type="text" placeholder="Nombre" className="w-full border p-2 rounded" required
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="text" placeholder="Apellidos" className="w-full border p-2 rounded" required
            value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
          <select className="w-full border p-2 rounded"
            value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
          <input type="date" className="w-full border p-2 rounded" required
            value={formData.birthDate} onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })} />
          <input type="text" placeholder="Ubicación" className="w-full border p-2 rounded"
            value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          <textarea placeholder="Biografía" className="w-full border p-2 rounded"
            value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
          <input type="text" placeholder="Intereses" className="w-full border p-2 rounded"
            value={formData.interests} onChange={(e) => setFormData({ ...formData, interests: e.target.value })} />
          <input type="text" placeholder="URL de foto" className="w-full border p-2 rounded"
            value={formData.profilePhoto} onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.value })} />
          <select className="w-full border p-2 rounded"
            value={formData.preferredRelationship}
            onChange={(e) => setFormData({ ...formData, preferredRelationship: e.target.value })}>
            <option value="FRIENDSHIP">Amistad</option>
            <option value="CASUAL">Casual</option>
            <option value="SERIOUS">Seria</option>
          </select>
          <button onClick={handleSubmit} type="submit" className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700">
            Crear Perfil
          </button>
        </form>
      </div>
    </div>
  );
}