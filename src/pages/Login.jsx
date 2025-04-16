// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import AuthService from '../services/AuthService';
import Divider from '../components/Divider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await new AuthService().login(email, password);
      navigate('/');
    } catch (err) {
      alert(err.message || 'Error en login');
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-4">
          <h2 className="text-2xl font-bold text-center">Inicio de Sesión</h2>
          <input
            type="email"
            placeholder="Correo"
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
            className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 transition-all duration-300"
            onClick={handleLogin}
          >
            Entrar
          </button>
          <Divider text="O" />
          <p className="text-sm text-center text-gray-600">
            ¿No estás registrado?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline transition-all duration-300">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
