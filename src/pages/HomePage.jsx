import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import Header from '../components/Header';
import ProfileService from '../services/ProfileService';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const profileService = new ProfileService();
const authService = new AuthService();

export default function HomePage() {
    const [profiles, setProfiles] = useState([]);
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar autenticación primero
        const userInfo = authService.getUserInfo();
        if (!userInfo) {
            navigate("/login");
            return;
        }

        const fetchProfiles = async () => {
            try {
                const response = await profileService.getAll();
                // Filtrar el perfil del usuario actual si es necesario
                const filteredProfiles = response.data.filter(profile => profile.userId !== userInfo.id);
                setProfiles(filteredProfiles);
                setLoading(false);
            } catch (err) {
                console.error("Error al obtener perfiles:", err);
                setError("Error al cargar perfiles");
                setLoading(false);
            }
        };

        fetchProfiles();
    }, [navigate]);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            goToNextProfile();
        },
        onSwipedRight: () => {
            goToPreviousProfile();
        },
        trackMouse: true
    });

    const goToNextProfile = () => {
        setCurrentProfileIndex(prev => 
            prev >= profiles.length - 1 ? 0 : prev + 1
        );
    };

    const goToPreviousProfile = () => {
        setCurrentProfileIndex(prev => 
            prev <= 0 ? profiles.length - 1 : prev - 1
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex flex-1 items-center justify-center">
                    <div className="text-xl">Cargando perfiles...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex flex-1 items-center justify-center">
                    <div className="text-xl text-red-500">{error}</div>
                </div>
            </div>
        );
    }

    if (profiles.length === 0) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex flex-1 items-center justify-center">
                    <div className="text-xl">No hay perfiles disponibles</div>
                </div>
            </div>
        );
    }

    const currentProfile = profiles[currentProfileIndex];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 flex-col items-center justify-center p-4">
                {/* Contenedor del perfil con gestos de swipe */}
                <div 
                    {...handlers}
                    className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden relative"
                    style={{ minHeight: '500px', touchAction: 'pan-y' }}
                >
                    {/* Foto de perfil */}
                    <div className="h-full w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        {currentProfile.profilePhoto ? (
                            <img 
                                src={currentProfile.profilePhoto} 
                                alt={`${currentProfile.name} ${currentProfile.lastName}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="text-4xl text-gray-400">
                                {currentProfile.name?.charAt(0)}{currentProfile.lastName?.charAt(0)}
                            </div>
                        )}
                    </div>
                    
                    {/* Información del perfil */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                        <h2 className="text-2xl font-bold">
                            {currentProfile.name} {currentProfile.lastName}, {currentProfile.age}
                        </h2>
                        <p className="text-sm opacity-80 mt-1">{currentProfile.location}</p>
                        
                        {currentProfile.bio && (
                            <p className="mt-3 text-sm">{currentProfile.bio}</p>
                        )}
                        
                        {currentProfile.interests && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {currentProfile.interests.split(',').map((interest, i) => (
                                    <span 
                                        key={i} 
                                        className="bg-white/20 px-3 py-1 rounded-full text-xs"
                                    >
                                        {interest.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Indicador de perfiles */}
                    <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5">
                        {profiles.map((_, index) => (
                            <div 
                                key={index}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    index === currentProfileIndex 
                                        ? 'bg-white w-6' 
                                        : 'bg-white/30 w-3'
                                }`}
                            />
                        ))}
                    </div>
                </div>
                
                {/* Botones de navegación para dispositivos sin touch */}
                <div className="flex gap-4 mt-6">
                    <button 
                        onClick={goToPreviousProfile}
                        className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-full"
                    >
                        Anterior
                    </button>
                    <button 
                        onClick={goToNextProfile}
                        className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-full"
                    >
                        Siguiente
                    </button>
                </div>
                
                {/* Instrucciones para móvil */}
                <p className="mt-4 text-gray-500 text-sm">
                    Desliza hacia los lados para ver más perfiles
                </p>
            </div>
        </div>
    );
}