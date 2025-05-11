import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Divider from '../components/Divider';
import Header from '../components/Header';
import { Eye, EyeOff, User, Mail, Lock, MapPin, Calendar, Heart, Smile } from 'lucide-react';

const authService = new AuthService();

export default function SignUp() {
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
    preferredRelationship: 'CASUAL',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = 'Nombre necesario';
    if (!formData.lastname) newErrors.lastname = 'Apellidos necesarios';
    if (!formData.username) newErrors.username = 'Nombre de usuario necesario';
    if (!formData.email) {
      newErrors.email = 'Correo electrónico necesario';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formato inválido';
    }
    if (!formData.password) {
      newErrors.password = 'Contraseña necesaria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña necesita al menos 6 caracteres';
    }
    if (!formData.location) newErrors.location = 'Ubicación necesaria';
    if (!formData.bio) newErrors.bio = 'Biografía necesaria';
    if (!formData.interests) newErrors.interests = 'Intereses necesarios';
    if (!formData.profilePhoto) newErrors.profilePhoto = 'Foto de perfil necesaria';
    if (!formData.birthDate) {
      newErrors.birthDate = 'Fecha de nacimiento necesaria';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      const isUnderage = age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));

      if (isUnderage) {
        newErrors.birthDate = 'Debes tener al menos 18 años para registrarte';
      }
    }
    if (!formData.gender) newErrors.gender = 'Género necesario';

    return newErrors;
  };

  const handleSignup = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const signupData = { ...formData };
    try {
      await authService.signup(signupData);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: undefined,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
          <div className="bg-white px-8 py-12 shadow-xl rounded-2xl sm:px-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Únete a nuestra comunidad
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Crea tu cuenta y encuentra la Chispa
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Nombre */}
                <div className="relative">
                  <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      value={formData.firstname}
                      onChange={handleChange}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${errors.firstname ? 'ring-red-500' : 'ring-gray-300'}`}
                    />
                  </div>
                  {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>}
                </div>

                {/* Apellidos */}
                <div className="relative">
                  <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                    Apellidos
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    className={`block w-full rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${errors.lastname ? 'ring-red-500' : 'ring-gray-300'}`}
                  />
                  {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>}
                </div>

                {/* Nombre de usuario */}
                <div className="relative">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de usuario
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Ej: usuario123"
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${errors.username ? 'ring-red-500' : 'ring-gray-300'}`}
                    />
                  </div>
                  {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                </div>

                {/* Email */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${errors.email ? 'ring-red-500' : 'ring-gray-300'}`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Contraseña */}
                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${errors.password ? 'ring-red-500' : 'ring-gray-300'}`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleShowPassword}>
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </div>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Ubicación */}
                <div className="relative">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicación
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${errors.location ? 'ring-red-500' : 'ring-gray-300'}`}
                    />
                  </div>
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                {/* Fecha de nacimiento */}
                <div className="relative">
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de nacimiento
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${errors.birthDate ? 'ring-red-500' : 'ring-gray-300'}`}
                    />
                  </div>
                  {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>}
                </div>

                {/* Género */}
                <div className="relative">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Género
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`block w-full rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${errors.gender ? 'ring-red-500' : 'ring-gray-300'}`}
                  >
                    <option value="MALE">Hombre</option>
                    <option value="FEMALE">Mujer</option>
                    <option value="OTHER">Otro</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                </div>

                {/* Relación preferida */}
                <div className="relative">
                  <label htmlFor="preferredRelationship" className="block text-sm font-medium text-gray-700 mb-1">
                    Relación preferida
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Heart className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="preferredRelationship"
                      name="preferredRelationship"
                      value={formData.preferredRelationship}
                      onChange={handleChange}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${errors.preferredRelationship ? 'ring-red-500' : 'ring-gray-300'}`}
                    >
                      <option value="CASUAL">Casual</option>
                      <option value="SERIOUS">Seria</option>
                      <option value="FRIENDSHIP">Amistad</option>
                    </select>
                  </div>
                  {errors.preferredRelationship && <p className="mt-1 text-sm text-red-600">{errors.preferredRelationship}</p>}
                </div>

                {/* Foto de perfil */}
                <div className="relative">
                  <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-1">
                    Foto de perfil (URL)
                  </label>
                  <input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="text"
                    value={formData.profilePhoto}
                    onChange={handleChange}
                    className={`block w-full rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${errors.profilePhoto ? 'ring-red-500' : 'ring-gray-300'}`}
                  />
                  {errors.profilePhoto && <p className="mt-1 text-sm text-red-600">{errors.profilePhoto}</p>}
                </div>

                {/* Biografía */}
                <div className="relative md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Biografía
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                      <Smile className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${errors.bio ? 'ring-red-500' : 'ring-gray-300'}`}
                    />
                  </div>
                  {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                </div>

                {/* Intereses */}
                <div className="relative md:col-span-2">
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                    Intereses (separados por comas)
                  </label>
                  <input
                    id="interests"
                    name="interests"
                    type="text"
                    value={formData.interests}
                    onChange={handleChange}
                    placeholder="Ej: música, viajes, deportes"
                    className={`block w-full rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${errors.interests ? 'ring-red-500' : 'ring-gray-300'}`}
                  />
                  {errors.interests && <p className="mt-1 text-sm text-red-600">{errors.interests}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex w-full justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 transform hover:-translate-y-0.5 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    'Registrarse'
                  )}
                </button>
              </div>
            </form>
             

            
            <div className="mt-8 text-center">
            <Divider text="O" />  
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}