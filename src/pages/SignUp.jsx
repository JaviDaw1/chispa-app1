import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Divider from '../components/Divider';
import Header from '../components/Header';
import { Eye, EyeOff } from 'lucide-react';

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

    const signupData = { ...formData };
    try {
      await authService.signup(signupData);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
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
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Header />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Crea tu cuenta</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Primera fila: Nombre y Apellidos */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.firstname ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.firstname && <p className="mt-2 text-sm text-red-600">{errors.firstname}</p>}
              </div>

              <div>
                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">Apellidos</label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.lastname ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.lastname && <p className="mt-2 text-sm text-red-600">{errors.lastname}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Nombre de usuario</label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Nombre de usuario"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:pl-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.firstname ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Correo electrónico</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.email ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.password ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleShowPassword}>
                  {showPassword ? <Eye className="text-gray-400" /> : <EyeOff className="text-gray-400" />}
                </div>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">Ubicación</label>
              <div className="mt-2">
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.location ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.location && <p className="mt-2 text-sm text-red-600">{errors.location}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">Biografía</label>
              <div className="mt-2">
                <input
                  id="bio"
                  name="bio"
                  type="text"
                  value={formData.bio}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.bio ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.bio && <p className="mt-2 text-sm text-red-600">{errors.bio}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium leading-6 text-gray-900">Intereses</label>
              <div className="mt-2">
                <input
                  id="interests"
                  name="interests"
                  type="text"
                  value={formData.interests}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.interests ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.interests && <p className="mt-2 text-sm text-red-600">{errors.interests}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="profilePhoto" className="block text-sm font-medium leading-6 text-gray-900">Foto de perfil (URL)</label>
              <div className="mt-2">
                <input
                  id="profilePhoto"
                  name="profilePhoto"
                  type="text"
                  value={formData.profilePhoto}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.profilePhoto ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.profilePhoto && <p className="mt-2 text-sm text-red-600">{errors.profilePhoto}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">Género</label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.gender ? 'ring-red-500' : 'ring-gray-300'}`}
                >
                  <option value="MALE">Hombre</option>
                  <option value="FEMALE">Mujer</option>
                  <option value="OTHER">Otro</option>
                </select>
                {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium leading-6 text-gray-900">Fecha de nacimiento</label>
              <div className="mt-2">
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.birthDate ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.birthDate && <p className="mt-2 text-sm text-red-600">{errors.birthDate}</p>}
              </div>
            </div>


            <div>
              <label htmlFor="preferredRelationship" className="block text-sm font-medium leading-6 text-gray-900">Relación preferida</label>
              <div className="mt-2">
                <select
                  id="preferredRelationship"
                  name="preferredRelationship"
                  value={formData.preferredRelationship}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.preferredRelationship ? 'ring-red-500' : 'ring-gray-300'}`}
                >
                  <option value="CASUAL">Casual</option>
                  <option value="SERIOUS">Seria</option>
                  <option value="FRIENDSHIP">Amistad</option>
                </select>
                {errors.preferredRelationship && <p className="mt-2 text-sm text-red-600">{errors.preferredRelationship}</p>}
              </div>
            </div>

            <Divider text='O'/>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition-all ease-in-out duration-200 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrarte
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-center text-gray-500">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 transition-all ease-in-out duration-200">
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
