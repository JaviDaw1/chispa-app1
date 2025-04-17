// src/pages/SignUp.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Divider from '../components/Divider';
import AuthService from '../services/AuthService';

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    gender: 'MALE',
    birthDate: '',
    location: '',
    bio: '',
    interests: '',
    profilePhoto: '',
    preferredRelationship: 'CASUAL'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    try {
      await new AuthService().signup(formData);
      navigate('/login');
    } catch (err) {
      alert(err.message || 'Error en el registro');
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-4">
          <h2 className="text-2xl font-bold text-center">Registro</h2>

          {/* Datos de usuario */}
          <input name="firstname" placeholder="Nombre" onChange={handleChange} className="input" />
          <input name="lastname" placeholder="Apellidos" onChange={handleChange} className="input" />
          <input name="username" placeholder="Nombre de usuario" onChange={handleChange} className="input" />
          <input name="email" placeholder="Correo electrónico" type="email" onChange={handleChange} className="input" />
          <input name="password" placeholder="Contraseña" type="password" onChange={handleChange} className="input" />

          {/* Perfil */}
          <select name="gender" onChange={handleChange} className="input">
            <option value="MALE">Hombre</option>
            <option value="FEMALE">Mujer</option>
            <option value="OTHER">Otro</option>
          </select>
          <input name="birthDate" type="date" onChange={handleChange} className="input" />
          <input name="location" placeholder="Ubicación" onChange={handleChange} className="input" />
          <input name="bio" placeholder="Biografía" onChange={handleChange} className="input" />
          <input name="interests" placeholder="Intereses (separados por comas)" onChange={handleChange} className="input" />
          <input name="profilePhoto" placeholder="URL de foto de perfil" onChange={handleChange} className="input" />
          <select name="preferredRelationship" onChange={handleChange} className="input">
            <option value="CASUAL">Casual</option>
            <option value="SERIOUS">Seria</option>
            <option value="FRIENDSHIP">Amistad</option>
          </select>

          <button onClick={handleSignUp} className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700">Registrarse</button>
          <Divider text="O" />
          <p className="text-sm text-center text-gray-600">
            ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 hover:underline">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
