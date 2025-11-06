import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

// 📻 Crear contexto de audio
const AudioContext = createContext();

// 🔊 Hook personalizado para consumir el contexto
export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio debe ser usado dentro de un AudioProvider');
    }
    return context;
};

// 🎧 Provider principal
export const AudioProvider = ({ children }) => {
    const audioRef = useRef(new Audio()); // ✅ Crear el audio una sola vez
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentStream, setCurrentStream] = useState(null);
    const [volume, setVolume] = useState(80);
    const [isMuted, setIsMuted] = useState(false);
    const [metadata, setMetadata] = useState(null);

    // 🔗 URLs de streams
    const streams = {
        main: 'https://stream.radio.co/sddfa8b6b/listen',
        sports: 'https://stream.radio.co/sddfa8b6b/listen',
        news: 'https://stream.radio.co/sddfa8b6b/listen',
        music: 'https://stream.radio.co/sddfa8b6b/listen'
    };

    // 🎚️ Inicializar audio y listeners
    useEffect(() => {
        const audio = audioRef.current;
        audio.crossOrigin = 'anonymous';
        audio.preload = 'none';
        audio.volume = volume / 100;

        const handleLoadStart = () => setIsLoading(true);
        const handleCanPlay = () => setIsLoading(false);
        const handlePlay = () => { setIsPlaying(true); setIsLoading(false); };
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);
        const handleError = () => {
            setError('Error al cargar el stream');
            setIsPlaying(false);
            setIsLoading(false);
        };
        const handleVolumeChange = () => {
            setVolume(audio.volume * 100);
            setIsMuted(audio.muted || audio.volume === 0);
        };

        audio.addEventListener('loadstart', handleLoadStart);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);
        audio.addEventListener('volumechange', handleVolumeChange);

        // 🧹 Limpieza al desmontar
        return () => {
            audio.pause();
            audio.src = '';
            audio.removeEventListener('loadstart', handleLoadStart);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('volumechange', handleVolumeChange);
        };
    }, []);

    // 🔁 Cambiar de stream
    const switchStream = async (streamKey) => {
        const streamUrl = streams[streamKey];
        if (!streamUrl) {
            setError('Stream no disponible');
            return;
        }

        const audio = audioRef.current;
        try {
            setIsLoading(true);
            setError(null);

            if (!audio.paused) audio.pause();
            audio.src = streamUrl;
            setCurrentStream(streamKey);
            updateMetadata(streamKey);

            await audio.play();
        } catch (err) {
            console.error('Error al cambiar stream:', err);
            setError('No se pudo conectar al stream');
        } finally {
            setIsLoading(false);
        }
    };

    // ▶️ Reproducir / Pausar
    const togglePlay = async () => {
        const audio = audioRef.current;
        try {
            if (!audio.src) {
                await switchStream('main'); // Usa el principal por defecto
                return;
            }

            if (audio.paused) {
                await audio.play();
            } else {
                audio.pause();
            }
        } catch (err) {
            console.error('Error en togglePlay:', err);
            setError('Error al controlar la reproducción');
        }
    };

    // 🔊 Control de volumen
    const setAudioVolume = (newVolume) => {
        const audio = audioRef.current;
        if (!audio) return;

        const volumeValue = newVolume / 100;
        audio.volume = volumeValue;
        setVolume(newVolume);
        setIsMuted(volumeValue === 0);
    };

    // 🔇 Mute / Unmute
    const toggleMute = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.muted = !audio.muted;
            setIsMuted(audio.muted);
        }
    };

    // 🏷️ Metadatos simulados
    const updateMetadata = (streamKey) => {
        const metadataMap = {
            main: {
                title: "MDsports Radio - Transmisión Principal",
                artist: "En Vivo 24/7",
                cover: "📻",
                genre: "Deportes",
                bitrate: "128kbps",
                listeners: "2.4K"
            },
            sports: {
                title: "MDsports - Eventos Deportivos",
                artist: "Cobertura Deportiva",
                cover: "⚽",
                genre: "Deportes",
                bitrate: "128kbps",
                listeners: "1.8K"
            },
            news: {
                title: "MDsports - Noticias",
                artist: "Actualidad Deportiva",
                cover: "📰",
                genre: "Noticias",
                bitrate: "128kbps",
                listeners: "1.2K"
            },
            music: {
                title: "MDsports - Música Deportiva",
                artist: "Los Éxitos del Deporte",
                cover: "🎵",
                genre: "Música",
                bitrate: "128kbps",
                listeners: "0.9K"
            }
        };
        setMetadata(metadataMap[streamKey] || metadataMap.main);
    };

    // 🧩 Contexto expuesto
    const value = {
        isPlaying,
        isLoading,
        error,
        currentStream,
        volume,
        isMuted,
        metadata,
        togglePlay,
        switchStream,
        setAudioVolume,
        toggleMute,
        streams: Object.keys(streams)
    };

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
};
