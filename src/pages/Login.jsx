// src/pages/Login.jsx
import { useState } from 'react';
import AuthService from '../services/AuthService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await new AuthService().login(email, password);
      alert('Inicio de sesión exitoso');
      // Redirige o guarda info...
    } catch (err) {
      alert(err.message || 'Error en login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          className="w-full border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
