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
    <div className='pb-16 lg:pt-16 bg-gray-100'>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 lg:pt-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-center">Registro</h2>

          {/* Nombre y Apellidos en una fila */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="firstname"
              placeholder="Nombre"
              onChange={handleChange}
              className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
            <input
              name="lastname"
              placeholder="Apellidos"
              onChange={handleChange}
              className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Nombre de usuario y correo en una fila */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="username"
              placeholder="Nombre de usuario"
              onChange={handleChange}
              className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              onChange={handleChange}
              className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Contraseña */}
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />

          {/* Género y Fecha de nacimiento en una fila */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="gender"
              onChange={handleChange}
              className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            >
              <option value="MALE">Hombre</option>
              <option value="FEMALE">Mujer</option>
              <option value="OTHER">Otro</option>
            </select>
            <input
              name="birthDate"
              type="date"
              onChange={handleChange}
              className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Ubicación, biografía e intereses */}
          <input
            name="location"
            placeholder="Ubicación"
            onChange={handleChange}
            className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
          <input
            name="bio"
            placeholder="Biografía"
            onChange={handleChange}
            className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
          <input
            name="interests"
            placeholder="Intereses (separados por comas)"
            onChange={handleChange}
            className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
          <input
            name="profilePhoto"
            placeholder="URL de foto de perfil"
            onChange={handleChange}
            className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />

          {/* Relación preferida */}
          <select
            name="preferredRelationship"
            onChange={handleChange}
            className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          >
            <option value="CASUAL">Casual</option>
            <option value="SERIOUS">Seria</option>
            <option value="FRIENDSHIP">Amistad</option>
          </select>

          {/* Botón de registro */}
          <button
            onClick={handleSignUp}
            className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 transition-all duration-300"
          >
            Registrarse
          </button>

          <Divider text="O" />

          <p className="text-sm text-center text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-blue-600 hover:underline transition-all duration-300">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
