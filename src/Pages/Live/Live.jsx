import { useState, useEffect } from 'react';
import styles from './Live.module.css';

export default function Live() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(80);
    const [currentProgram, setCurrentProgram] = useState(null);
    const [upcomingBroadcasts, setUpcomingBroadcasts] = useState([]);
    const [listeners, setListeners] = useState(0);

    // Simular datos de la transmisión en vivo
    useEffect(() => {
        // Programa actual en vivo
        setCurrentProgram({
            id: 1,
            title: "Clásico Nacional - Transmisión Especial",
            description: "Sigue minuto a minuto el partido entre los grandes rivales",
            host: "Carlos Ruiz y Ana Martínez",
            image: "⚽",
            category: "Fútbol en Vivo",
            startTime: "15:00",
            endTime: "17:00"
        });

        // Próximas transmisiones
        setUpcomingBroadcasts([
            {
                id: 1,
                title: "Análisis Post-Partido",
                host: "Roberto Díaz",
                time: "17:00 - 18:30",
                sport: "Fútbol",
                type: "Análisis"
            },
            {
                id: 2,
                title: "Resumen de la Jornada",
                host: "María Lopez",
                time: "19:00 - 20:00",
                sport: "Fútbol",
                type: "Resumen"
            },
            {
                id: 3,
                title: "Entrevista Exclusiva",
                host: "Pedro Gómez",
                time: "21:00 - 22:00",
                sport: "Fútbol",
                type: "Entrevista"
            }
        ]);

        // Simular contador de oyentes
        setListeners(2450);
    }, []);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        // Aquí iría la lógica real del reproductor de audio
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    };

    const quickActions = [
        { icon: '📱', label: 'Compartir', action: () => console.log('Compartir') },
        { icon: '❤️', label: 'Favorito', action: () => console.log('Favorito') },
        { icon: '📞', label: 'Llamar', action: () => console.log('Llamar') },
        { icon: '💬', label: 'Chat', action: () => console.log('Chat') }
    ];

    return (
        <section className={styles.live}>
            {/* Header de Transmisión en Vivo */}
            <div className={styles.liveHeader}>
                <div className={styles.liveBadge}>
                    <span className={styles.liveDot}></span>
                    TRANSMISIÓN EN VIVO
                </div>
                <h1 className={styles.liveTitle}>MDsports en Directo</h1>
                <div className={styles.listenersCount}>
                    <span className={styles.listenersIcon}>👥</span>
                    {listeners.toLocaleString()} oyentes en vivo
                </div>
            </div>

            {/* Contenido Principal */}
            <div className={styles.liveContent}>
                {/* Columna Izquierda - Reproductor y Programa Actual */}
                <div className={styles.mainColumn}>
                    {/* Tarjeta de Programa Actual */}
                    <div className={styles.currentProgram}>
                        <div className={styles.programHeader}>
                            <div className={styles.programImage}>
                                {currentProgram?.image}
                            </div>
                            <div className={styles.programInfo}>
                                <span className={styles.programCategory}>
                                    {currentProgram?.category}
                                </span>
                                <h2 className={styles.programTitle}>
                                    {currentProgram?.title}
                                </h2>
                                <p className={styles.programHost}>
                                    Con {currentProgram?.host}
                                </p>
                            </div>
                        </div>
                        
                        <p className={styles.programDescription}>
                            {currentProgram?.description}
                        </p>
                        
                        <div className={styles.programSchedule}>
                            <span className={styles.scheduleTime}>
                                {currentProgram?.startTime} - {currentProgram?.endTime}
                            </span>
                        </div>
                    </div>

                    {/* Reproductor de Audio */}
                    <div className={styles.audioPlayer}>
                        <div className={styles.playerControls}>
                            <button 
                                className={`${styles.playButton} ${isPlaying ? styles.playing : styles.paused}`}
                                onClick={handlePlayPause}
                            >
                                {isPlaying ? (
                                    <>
                                        <span className={styles.buttonIcon}>⏸️</span>
                                        <span>PAUSAR</span>
                                    </>
                                ) : (
                                    <>
                                        <span className={styles.buttonIcon}>▶️</span>
                                        <span>ESCUCHAR</span>
                                    </>
                                )}
                            </button>
                            
                            <div className={styles.volumeControl}>
                                <span className={styles.volumeIcon}>🔊</span>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={volume} 
                                    onChange={handleVolumeChange}
                                    className={styles.volumeSlider}
                                />
                                <span className={styles.volumeValue}>{volume}%</span>
                            </div>
                        </div>
                        
                        <div className={styles.playerStatus}>
                            <div className={`${styles.status} ${isPlaying ? styles.live : styles.idle}`}>
                                {isPlaying ? '🔴 TRANSMITIENDO' : '⏸️ EN PAUSA'}
                            </div>
                            <div className={styles.bufferIndicator}>
                                <div className={styles.bufferBar}></div>
                            </div>
                        </div>
                    </div>

                    {/* Acciones Rápidas */}
                    <div className={styles.quickActions}>
                        <h3 className={styles.actionsTitle}>Acciones Rápidas</h3>
                        <div className={styles.actionsGrid}>
                            {quickActions.map((action, index) => (
                                <button 
                                    key={index}
                                    className={styles.actionButton}
                                    onClick={action.action}
                                >
                                    <span className={styles.actionIcon}>{action.icon}</span>
                                    <span className={styles.actionLabel}>{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Columna Derecha - Próximas Transmisiones y Chat */}
                <div className={styles.sidebar}>
                    {/* Próximas Transmisiones */}
                    <div className={styles.upcomingSection}>
                        <h3 className={styles.sidebarTitle}>
                            <span className={styles.titleIcon}>📅</span>
                            Próximas Transmisiones
                        </h3>
                        <div className={styles.upcomingList}>
                            {upcomingBroadcasts.map(broadcast => (
                                <div key={broadcast.id} className={styles.upcomingItem}>
                                    <div className={styles.upcomingInfo}>
                                        <h4 className={styles.upcomingTitle}>
                                            {broadcast.title}
                                        </h4>
                                        <p className={styles.upcomingHost}>
                                            {broadcast.host}
                                        </p>
                                        <div className={styles.upcomingMeta}>
                                            <span className={styles.upcomingSport}>
                                                {broadcast.sport}
                                            </span>
                                            <span className={styles.upcomingType}>
                                                {broadcast.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.upcomingTime}>
                                        {broadcast.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Estadísticas en Vivo */}
                    <div className={styles.statsSection}>
                        <h3 className={styles.sidebarTitle}>
                            <span className={styles.titleIcon}>📊</span>
                            Estadísticas en Vivo
                        </h3>
                        <div className={styles.statsGrid}>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>2,450</span>
                                <span className={styles.statLabel}>Oyentes</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>89%</span>
                                <span className={styles.statLabel}>Calidad Audio</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>45</span>
                                <span className={styles.statLabel}>Países</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>0.2s</span>
                                <span className={styles.statLabel}>Retraso</span>
                            </div>
                        </div>
                    </div>

                    {/* Información Técnica */}
                    <div className={styles.techInfo}>
                        <h3 className={styles.sidebarTitle}>
                            <span className={styles.titleIcon}>⚙️</span>
                            Información Técnica
                        </h3>
                        <div className={styles.techList}>
                            <div className={styles.techItem}>
                                <span>Formato:</span>
                                <span>MP3 128kbps</span>
                            </div>
                            <div className={styles.techItem}>
                                <span>Frecuencia:</span>
                                <span>44.1 kHz</span>
                            </div>
                            <div className={styles.techItem}>
                                <span>Servidor:</span>
                                <span>NYC-01</span>
                            </div>
                            <div className={styles.techItem}>
                                <span>Estado:</span>
                                <span className={styles.statusOnline}>● En Línea</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notificación de Calidad */}
            <div className={styles.qualityNotification}>
                <div className={styles.qualityInfo}>
                    <span className={styles.qualityIcon}>🎧</span>
                    <span>Disfruta de la mejor calidad de audio. Recomendamos usar auriculares.</span>
                </div>
            </div>
        </section>
    );
}
