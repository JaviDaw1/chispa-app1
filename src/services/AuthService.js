import api from './api'; 

export default class AuthService {
  constructor() {
    this.url = '/auth';
  }

  async login(email, password) {
    if (!email || !password) throw new Error('Correo y contraseña requeridos');
  
    try {
      const response = await api.post(`${this.url}/login`, { email, password });
      const { token, user } = response.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      return response.data;
    } catch (error) {
      console.error("Error en login:", error.response?.data || error.message);
      throw error;
    }
  }

  async signup(data) {
    if (!data.email || !data.password) throw new Error('Datos inválidos');
    const response = await api.post(`${this.url}/signup`, data);
    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserInfo() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
