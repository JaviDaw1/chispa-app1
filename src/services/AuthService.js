import api from './api'; // como el de React Native, baseURL hacia tu backend Spring

export default class AuthService {
  constructor() {
    this.url = '/auth';
  }

  async login(email, password) {
    if (!email || !password) throw new Error('Correo y contraseña requeridos');
    const response = await api.post(`${this.url}/login`, { email, password });

    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
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

  // Puedes adaptar el resto de métodos igual cambiando AsyncStorage por localStorage
}
