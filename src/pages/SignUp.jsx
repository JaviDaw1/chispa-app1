// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import AuthService from '../services/AuthService';
import Divider from '../components/Divider';

export default function SignUp() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const userData = {
        firstname,
        lastname,
        username,
        email,
        password,
        userRole: "USER"
      };
  
      await new AuthService().signup(userData);
      navigate('/login');
    } catch (err) {
      alert(err.message || 'Error en el registro');
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-4">
          <h2 className="text-2xl font-bold text-center">Registro</h2>
          <input
            type="firstname"
            placeholder="Nombre"
            className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="lastname"
            placeholder="Apellidos"
            className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="username"
            placeholder="Nombre Usuario"
            className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border p-2 rounded transition-all duration-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
            onClick={handleSignUp}
          >
            Registrarse
          </button>
          <Divider text="O" />
          <p className="text-sm text-center text-gray-600">
            ¿Tienes una cuenta?{' '}
            <Link to="/login" className="text-blue-600 hover:underline transition-all duration-300">
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
