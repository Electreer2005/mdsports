import { useState, useRef, useEffect } from 'react';
import { useAudio } from '../../context/audioContext';
import styles from './Player.module.css';
import { 
    FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepBackward, FaStepForward,
    FaExpand, FaCompress, FaHeart, FaRegHeart, FaRandom, FaRedo, FaPodcast, FaSpinner
} from 'react-icons/fa';

export default function Player() {
    const {
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
        streams
    } = useAudio();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [audioQuality, setAudioQuality] = useState('high');
    
    const progressBarRef = useRef(null);

    // 🎧 Stream actual por defecto
    const currentTrack = metadata || {
        title: "MDsports Radio",
        artist: "Selecciona un stream",
        cover: "📻",
        album: "Radio Online",
        genre: "Deportes",
        bitrate: "128kbps",
        listeners: "0"
    };

    // 🚀 Cargar stream principal al iniciar
    useEffect(() => {
        if (!currentStream) {
            switchStream('main');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStream]);

    // 🎚️ Eventos
    const handleProgressClick = () => {
        console.log('Stream en vivo - seek no disponible');
    };

    const formatTime = () => 'EN VIVO';
    const handleSeek = () => console.log('Stream en vivo - seek no disponible');

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const toggleLike = () => setIsLiked(!isLiked);
    const toggleShuffle = () => setIsShuffle(!isShuffle);
    const toggleRepeat = () => setIsRepeat(!isRepeat);

    const changeAudioQuality = () => {
        const qualities = ['low', 'medium', 'high'];
        const currentIndex = qualities.indexOf(audioQuality);
        const nextIndex = (currentIndex + 1) % qualities.length;
        setAudioQuality(qualities[nextIndex]);
    };

    const getQualityLabel = () => {
        const labels = {
            low: 'Baja (64kbps)',
            medium: 'Media (96kbps)',
            high: 'Alta (128kbps)'
        };
        return labels[audioQuality];
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value);
        setAudioVolume(newVolume);
    };

    const handleStreamChange = (streamKey) => {
        switchStream(streamKey);
    };

    // 🎨 Render
    return (
        <div className={`${styles.player} ${isExpanded ? styles.expanded : ''}`}>
            
            {/* Mini Player */}
            {!isExpanded && (
                <div className={styles.miniPlayer}>
                    <div className={styles.trackInfoMini}>
                        <div className={styles.coverArtMini}>
                            {currentTrack.cover}
                        </div>
                        <div className={styles.trackDetailsMini}>
                            <div className={styles.trackTitleMini}>
                                {currentTrack.title}
                            </div>
                            <div className={styles.trackArtistMini}>
                                {currentTrack.artist}
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.controlsMini}>
                        {isLoading ? (
                            <div className={styles.loadingSpinner}>
                                <FaSpinner className={styles.spinner} />
                            </div>
                        ) : (
                            <button 
                                className={styles.playButtonMini}
                                onClick={togglePlay}
                                disabled={isLoading}
                                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                            >
                                {isPlaying ? <FaPause /> : <FaPlay />}
                            </button>
                        )}
                        
                        <button 
                            className={styles.expandButton}
                            onClick={toggleExpand}
                            aria-label="Expandir reproductor"
                        >
                            <FaExpand />
                        </button>
                    </div>

                    {error && <div className={styles.errorIndicator}>⚠️</div>}
                </div>
            )}

            {/* Player Expandido */}
            {isExpanded && (
                <div className={styles.expandedPlayer}>
                    
                    {/* Header */}
                    <div className={styles.playerHeader}>
                        <div className={styles.headerLeft}>
                            <span className={styles.liveBadge}>
                                <FaPodcast />
                                EN VIVO
                            </span>
                            <span className={styles.listenersCount}>
                                👥 {currentTrack.listeners} oyentes
                            </span>
                        </div>
                        
                        <div className={styles.headerRight}>
                            <button 
                                className={styles.qualityButton}
                                onClick={changeAudioQuality}
                                title="Cambiar calidad de audio"
                            >
                                {getQualityLabel()}
                            </button>
                            <button 
                                className={styles.closeButton}
                                onClick={toggleExpand}
                                aria-label="Cerrar reproductor"
                            >
                                <FaCompress />
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className={styles.errorMessage}>
                            <span>⚠️ {error}</span>
                            <button 
                                onClick={() => switchStream('main')}
                                className={styles.retryButton}
                            >
                                Reintentar
                            </button>
                        </div>
                    )}

                    {/* Contenido principal */}
                    <div className={styles.playerContent}>
                        
                        {/* Selector de Streams */}
                        <div className={styles.streamSelector}>
                            <h3 className={styles.streamSelectorTitle}>Canales Disponibles</h3>
                            <div className={styles.streamButtons}>
                                {streams.map(stream => (
                                    <button
                                        key={stream}
                                        className={`${styles.streamButton} ${currentStream === stream ? styles.active : ''}`}
                                        onClick={() => handleStreamChange(stream)}
                                        disabled={isLoading}
                                    >
                                        {stream === 'main' && '📻'}
                                        {stream === 'sports' && '⚽'}
                                        {stream === 'news' && '📰'}
                                        {stream === 'music' && '🎵'}
                                        {stream.charAt(0).toUpperCase() + stream.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Info de la pista */}
                        <div className={styles.trackSection}>
                            <div className={styles.coverArt}>
                                <div className={styles.coverImage}>{currentTrack.cover}</div>
                                {isPlaying && !isLoading && (
                                    <div className={styles.playingAnimation}>
                                        <span></span><span></span><span></span><span></span>
                                    </div>
                                )}
                                {isLoading && (
                                    <div className={styles.loadingOverlay}>
                                        <FaSpinner className={styles.spinner} />
                                    </div>
                                )}
                            </div>
                            
                            <div className={styles.trackInfo}>
                                <h2 className={styles.trackTitle}>{currentTrack.title}</h2>
                                <p className={styles.trackArtist}>{currentTrack.artist}</p>
                                <div className={styles.trackMeta}>
                                    <span className={styles.trackAlbum}>{currentTrack.album}</span>
                                    <span className={styles.trackGenre}>{currentTrack.genre}</span>
                                    <span className={styles.trackBitrate}>{currentTrack.bitrate}</span>
                                </div>
                                <div className={styles.connectionStatus}>
                                    {isLoading ? (
                                        <span className={styles.connecting}>
                                            <FaSpinner className={styles.spinner} /> Conectando...
                                        </span>
                                    ) : isPlaying ? (
                                        <span className={styles.connected}>● Transmitiendo en vivo</span>
                                    ) : (
                                        <span className={styles.disconnected}>● Pausado</span>
                                    )}
                                </div>
                            </div>

                            <div className={styles.trackActions}>
                                <button 
                                    className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
                                    onClick={toggleLike}
                                    aria-label={isLiked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                                >
                                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                                </button>
                            </div>
                        </div>

                        {/* Controles principales */}
                        <div className={styles.controlsSection}>
                            <div className={styles.modeControls}>
                                <button 
                                    className={`${styles.modeButton} ${isShuffle ? styles.active : ''}`}
                                    onClick={toggleShuffle}
                                    aria-label="Modo aleatorio"
                                >
                                    <FaRandom />
                                </button>
                                <button 
                                    className={styles.seekButton}
                                    onClick={handleSeek}
                                    aria-label="Retroceder 10 segundos"
                                    title="No disponible en streams en vivo"
                                >
                                    <FaStepBackward />
                                </button>
                            </div>

                            <button 
                                className={styles.mainPlayButton}
                                onClick={togglePlay}
                                disabled={isLoading}
                                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                            >
                                {isLoading ? <FaSpinner className={styles.spinner} /> : isPlaying ? <FaPause /> : <FaPlay />}
                            </button>

                            <div className={styles.navigationControls}>
                                <button 
                                    className={styles.seekButton}
                                    onClick={handleSeek}
                                    aria-label="Adelantar 10 segundos"
                                    title="No disponible en streams en vivo"
                                >
                                    <FaStepForward />
                                </button>
                                <button 
                                    className={`${styles.modeButton} ${isRepeat ? styles.active : ''}`}
                                    onClick={toggleRepeat}
                                    aria-label="Modo repetición"
                                >
                                    <FaRedo />
                                </button>
                            </div>
                        </div>

                        {/* Barra de progreso */}
                        <div className={styles.progressSection}>
                            <span className={styles.timeCurrent}>{formatTime()}</span>
                            <div 
                                className={styles.progressBar}
                                ref={progressBarRef}
                                onClick={handleProgressClick}
                                title="Stream en vivo - seek no disponible"
                            >
                                <div className={styles.liveProgress}>
                                    <div className={styles.liveIndicator}></div>
                                </div>
                            </div>
                            <span className={styles.timeDuration}>EN VIVO</span>
                        </div>

                        {/* Volumen */}
                        <div className={styles.volumeSection}>
                            <button 
                                className={styles.volumeButton}
                                onClick={toggleMute}
                                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                            >
                                {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                            <div className={styles.volumeSliderContainer}>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className={styles.volumeSlider}
                                    aria-label="Control de volumen"
                                />
                                <div 
                                    className={styles.volumeLevel}
                                    style={{ width: `${isMuted ? 0 : volume}%` }}
                                />
                            </div>
                            <span className={styles.volumePercentage}>
                                {isMuted ? '0%' : `${volume}%`}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
