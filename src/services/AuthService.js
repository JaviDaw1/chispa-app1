import api from "./api";
import ProfileService from "./ProfileService";

const profileService = new ProfileService();

export default class AuthService {
  constructor() {
    this.url = "/auth";
    this.onlineStatusInterval = null;
  }

  async login(email, password) {
    if (!email || !password) throw new Error("Correo y contraseña requeridos");

    try {
      const response = await api.post(`${this.url}/login`, { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      await this.setOnlineStatus(true);
      this.setupOnlineStatusHandlers();

      return response.data;
    } catch (error) {
      console.error(
        "Error en login:",
        error.response?.data?.message || error.message
      );
      throw new Error(
        error.response?.data?.message || "Error al iniciar sesión"
      );
    }
  }

  async signup(data) {
    try {
      const response = await api.post(`${this.url}/signup`, {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        password: data.password,
        userRole: "USER",
      });

      const newUser = response.data;
      await this.login(data.email, data.password);

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
        user: { id: newUser.id },
      };
      await profileService.create(customProfile);
      return newUser;
    } catch (error) {
      console.error(
        "Error en el registro:",
        error.response?.data?.message || error.message
      );
      throw new Error(
        error.response?.data?.message || "Error al registrar usuario"
      );
    }
  }

  async logout() {
    try {
      await this.setOnlineStatus(false);
    } catch (error) {
      console.error("Error al actualizar estado offline:", error);
    } finally {
      this.cleanupOnlineStatusHandlers();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUserInfo() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  async setOnlineStatus(isOnline) {
    const user = this.getUserInfo();
    if (!user) return;

    try {
      const profileResponse = await profileService.getByUserId(user.id);
      const profile = profileResponse.data;

      if (!profile) return;

      await profileService.update(profile.id, {
        ...profile,
        isOnline,
        lastActive: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error actualizando estado online:", error);
    }
  }

  setupOnlineStatusHandlers() {
    this.cleanupOnlineStatusHandlers();

    this.onlineStatusInterval = setInterval(() => {
      this.setOnlineStatus(true);
    }, 60000);

    this.beforeUnloadHandler = () => this.setOnlineStatus(false);
    window.addEventListener("beforeunload", this.beforeUnloadHandler);
  }

  cleanupOnlineStatusHandlers() {
    if (this.onlineStatusInterval) {
      clearInterval(this.onlineStatusInterval);
      this.onlineStatusInterval = null;
    }

    if (this.beforeUnloadHandler) {
      window.removeEventListener("beforeunload", this.beforeUnloadHandler);
      this.beforeUnloadHandler = null;
    }
  }

  async changePassword({ currentPassword, newPassword }) {
    try {
      const user = this.getUserInfo();
      if (!user || !user.id) {
        throw new Error("Usuario no autenticado o sin ID");
      }

      const response = await api.put(`${this.url}/change-password/${user.id}`, {currentPassword, newPassword,});
      return response.data;
    } catch (error) {
      console.error(
        "Error al cambiar la contraseña:",
        error.response?.data?.message || error.message
      );
      throw new Error(
        error.response?.data?.message || "Error al cambiar la contraseña"
      );
    }
  }

  static async forgotPassword(email) {
    try {
      await api.post("/auth/forgot-password", { email });
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al enviar el correo de recuperación"
      );
    }
  }
}
