import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import Header from '../components/Header';
import ProfileService from '../services/ProfileService';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import LikesService from '../services/LikesService';
import { Heart, ArrowRight, User } from 'lucide-react';

const profileService = new ProfileService();
const authService = new AuthService();
const likesService = new LikesService();

export default function HomePage() {
    const [profiles, setProfiles] = useState([]);
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showInstructions, setShowInstructions] = useState(true);
    const currentProfile = profiles[currentProfileIndex];
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInstructions(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Verificar autenticación primero
        const userInfo = authService.getUserInfo();
        if (!userInfo) {
            navigate("/login");
            return;
        }

        const fetchProfilesAndLikes = async () => {
            try {
                // Obtener todos los perfiles
                const response = await profileService.getAll();
                const filteredProfiles = response.data.filter(profile => profile.user.id !== userInfo.id && profile.user.role !== "ADMIN");

                // Obtener los likes del usuario logueado
                const likesResponse = await likesService.getLikesByLikerId(userInfo.id);
                const likedUserIds = likesResponse.data.map(like => like.liked.id);

                // Filtrar perfiles para excluir los que ya fueron likados
                const availableProfiles = filteredProfiles.filter(profile => !likedUserIds.includes(profile.id));

                setProfiles(availableProfiles);
                setLoading(false);
            } catch (err) {
                console.error("Error al obtener perfiles:", err);
                setError("Error al cargar perfiles");
                setLoading(false);
            }
        };

        fetchProfilesAndLikes();
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

    const handleLike = async () => {
        try {
            const userInfo = authService.getUserInfo();
            if (!userInfo || !currentProfile) {
                console.error('No se encontró usuario logueado o perfil actual');
                return;
            }

            const likeData = {
                liker: { id: userInfo.id },
                liked: { id: currentProfile.id },
                state: "PENDING"
            };

            await likesService.postLike(likeData);
            console.log('Like enviado con éxito');

            setProfiles(prevProfiles => prevProfiles.filter(profile => profile.id !== currentProfile.id));
            goToNextProfile();
        } catch (err) {
            console.error('Error al enviar like:', err);
        }
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

    return (
        <div className="flex flex-col min-h-screen lg:pt-16">
            <Header />
            <div className="flex flex-1 flex-col items-center justify-center p-4 w-full">
                {/* Contenedor del perfil con gestos de swipe */}
                <div
                    {...handlers}
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-xl shadow-lg overflow-hidden relative max-h-[80vh]"
                    style={{ touchAction: 'pan-y' }}
                >

                    <div
                        className="h-auto aspect-[3/4] bg-gray-100 flex items-center justify-center overflow-hidden"
                    >
                        {currentProfile.profilePhoto ? (
                            <img
                                src={currentProfile.profilePhoto}
                                alt={`${currentProfile.name} ${currentProfile.lastName}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-4xl text-gray-400">
                                {currentProfile.name?.charAt(0)}{currentProfile.lastName?.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Información del perfil */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 text-white">
                        <h2 className="text-xl sm:text-2xl font-bold">
                            {currentProfile.name} {currentProfile.lastName}, {currentProfile.age}
                        </h2>
                        <p className="text-xs sm:text-sm opacity-80 mt-1">{currentProfile.location}</p>

                        {currentProfile.bio && (
                            <p className="mt-2 sm:mt-3 text-xs sm:text-sm">{currentProfile.bio}</p>
                        )}

                        {currentProfile.interests && (
                            <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
                                {currentProfile.interests.split(',').map((interest, i) => (
                                    <span
                                        key={i}
                                        className="bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs"
                                    >
                                        {interest.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Contenedor con tres botones (perfil, like, siguiente) */}
                <div className="flex gap-4 sm:gap-6 mt-3">
                    <button
                        onClick={() => navigate(`/profiles/${currentProfile.id}`)}
                        className="bg-gray-200 hover:bg-gray-300 p-3 sm:p-4 rounded-full"
                    >
                        <User className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
                    </button>
                    <button
                        onClick={handleLike}
                        className="bg-pink-500 hover:bg-pink-600 text-white p-3 sm:p-4 rounded-full"
                    >
                        <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    <button
                        onClick={goToNextProfile}
                        className="bg-gray-200 hover:bg-gray-300 p-3 sm:p-4 rounded-full"
                    >
                        <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
                    </button>
                </div>

                {/* Instrucciones para móvil */}
                <div
                    className={`mt-4 text-gray-100 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-gray-800 shadow-md transition-opacity duration-700 ${showInstructions ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    💡 Desliza hacia los lados para ver más perfiles
                </div>
            </div>
        </div>
    );
}