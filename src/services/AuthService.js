import api from './api';
import ProfileService from './ProfileService';

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
      console.error("Error en login:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  }

  async signup(data) {
    try {
      // Crear usuario
      const response = await api.post(`${this.url}/signup`, {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        password: data.password,
        userRole: "USER"
      });

      const newUser = response.data;

      // Login automático para obtener el token (si es necesario para crear perfil)
      await this.login(data.email, data.password);

      // Crear perfil personalizado
      const profileService = new ProfileService();

      const customProfile = {
        name: data.firstname,
        lastName: data.lastname,
        gender: data.gender,
        birthDate: data.birthDate,
        location: data.location,
        bio: data.bio,
        interests: data.interests,
        profilePhoto: data.profilePhoto,
        lastActive: new Date().toISOString(),
        preferredRelationship: data.preferredRelationship,
        user: { id: newUser.id }
      };

      await profileService.create(customProfile);

      console.log("Perfil creado correctamente");
      return newUser;
    } catch (error) {
      console.error("Error en el registro o creación de perfil:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Error al registrar usuario");
    }
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
