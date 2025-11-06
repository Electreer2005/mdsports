import { useState, useEffect } from 'react';
import styles from './Programs.module.css';

export default function Programs() {
    const [activeFilter, setActiveFilter] = useState('todos');
    const [programs, setPrograms] = useState([]);
    const [livePrograms, setLivePrograms] = useState([]);
    const [featuredHosts, setFeaturedHosts] = useState([]);

    const filters = [
        { id: 'todos', name: 'Todos los Programas', icon: '📻' },
        { id: 'en-vivo', name: 'En Vivo', icon: '🔴' },
        { id: 'futbol', name: 'Fútbol', icon: '⚽' },
        { id: 'basquet', name: 'Básquet', icon: '🏀' },
        { id: 'analisis', name: 'Análisis', icon: '📊' },
        { id: 'entrevistas', name: 'Entrevistas', icon: '🎤' },
        { id: 'deportes', name: 'Otros Deportes', icon: '🏆' }
    ];

    // Datos de ejemplo
    useEffect(() => {
        // Programas principales
        setPrograms([
            {
                id: 1,
                name: "Titulares Deportivos",
                description: "Las noticias más importantes del mundo deportivo, actualizadas minuto a minuto.",
                schedule: "Lunes a Viernes 07:00 - 09:00",
                hosts: ["Carlos Ruiz", "Ana Martínez"],
                category: "noticias",
                image: "📰",
                isLive: true,
                listeners: "2.4K",
                nextAir: "Hoy 07:00"
            },
            {
                id: 2,
                name: "La Tribuna",
                description: "Análisis profundo y debates apasionantes sobre fútbol nacional e internacional.",
                schedule: "Lunes, Miércoles, Viernes 18:00 - 20:00",
                hosts: ["Roberto Díaz", "María Lopez"],
                category: "futbol",
                image: "⚽",
                isLive: false,
                listeners: "3.1K",
                nextAir: "Hoy 18:00"
            },
            {
                id: 3,
                name: "Zona de Juego",
                description: "Cobertura completa de la NBA y baloncesto europeo con expertos en la materia.",
                schedule: "Martes y Jueves 16:00 - 17:30",
                hosts: ["Pedro Gómez"],
                category: "basquet",
                image: "🏀",
                isLive: false,
                listeners: "1.8K",
                nextAir: "Mañana 16:00"
            },
            {
                id: 4,
                name: "Marcador Final",
                description: "Resúmenes y análisis post-partido con los momentos más destacados.",
                schedule: "Todos los días 22:00 - 23:00",
                hosts: ["Laura Fernandez", "Javier Mendez"],
                category: "analisis",
                image: "📋",
                isLive: false,
                listeners: "2.2K",
                nextAir: "Hoy 22:00"
            },
            {
                id: 5,
                name: "Deporte Total",
                description: "Cobertura de todos los deportes: tenis, motor, béisbol y más.",
                schedule: "Sábados y Domingos 10:00 - 12:00",
                hosts: ["Sofia Castro"],
                category: "deportes",
                image: "🏆",
                isLive: false,
                listeners: "1.5K",
                nextAir: "Sábado 10:00"
            },
            {
                id: 6,
                name: "Voces del Deporte",
                description: "Entrevistas exclusivas con las grandes figuras del deporte mundial.",
                schedule: "Viernes 21:00 - 22:30",
                hosts: ["Ricardo Torres"],
                category: "entrevistas",
                image: "🎤",
                isLive: false,
                listeners: "2.8K",
                nextAir: "Viernes 21:00"
            }
        ]);

        // Programas en vivo
        setLivePrograms([
            {
                id: 1,
                name: "Transmisión Especial",
                description: "Seguimiento minuto a minuto del clásico nacional",
                hosts: ["Carlos Ruiz"],
                listeners: "4.2K",
                progress: 65
            }
        ]);

        // Locutores destacados
        setFeaturedHosts([
            {
                id: 1,
                name: "Carlos Ruiz",
                role: "Director Deportivo",
                experience: "15 años",
                specialty: "Fútbol Internacional",
                image: "👨‍💼",
                programs: ["Titulares Deportivos", "Transmisiones Especiales"]
            },
            {
                id: 2,
                name: "Ana Martínez",
                role: "Periodista Deportiva",
                experience: "10 años",
                specialty: "Análisis Táctico",
                image: "👩‍💼",
                programs: ["Titulares Deportivos", "La Tribuna"]
            },
            {
                id: 3,
                name: "Roberto Díaz",
                role: "Comentarista",
                experience: "12 años",
                specialty: "Fútbol Nacional",
                image: "🎙️",
                programs: ["La Tribuna", "Marcador Final"]
            }
        ]);
    }, []);

    const filteredPrograms = programs.filter(program => {
        if (activeFilter === 'todos') return true;
        if (activeFilter === 'en-vivo') return program.isLive;
        return program.category === activeFilter;
    });

    const getCategoryColor = (category) => {
        const colors = {
            'noticias': '#2196F3',
            'futbol': '#4CAF50',
            'basquet': '#FF9800',
            'analisis': '#9C27B0',
            'entrevistas': '#F44336',
            'deportes': '#795548'
        };
        return colors[category] || '#607D8B';
    };

    return (
        <section className={styles.programs}>
            {/* Header */}
            <div className={styles.programsHeader}>
                <h1 className={styles.title}>Programas Deportivos</h1>
                <p className={styles.subtitle}>
                    Los mejores programas, análisis y comentarios del mundo deportivo
                </p>
            </div>

            {/* Filtros */}
            <div className={styles.filtersSection}>
                <div className={styles.filtersContainer}>
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            className={`${styles.filterButton} ${activeFilter === filter.id ? styles.active : ''}`}
                            onClick={() => setActiveFilter(filter.id)}
                        >
                            <span className={styles.filterIcon}>{filter.icon}</span>
                            {filter.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contenido Principal */}
            <div className={styles.programsContent}>
                {/* Columna Principal */}
                <div className={styles.mainColumn}>
                    {/* Programas en Vivo */}
                    {livePrograms.length > 0 && (
                        <div className={styles.liveSection}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>
                                    <span className={styles.liveIndicator}></span>
                                    Transmitiendo Ahora
                                </h2>
                            </div>
                            <div className={styles.livePrograms}>
                                {livePrograms.map(program => (
                                    <div key={program.id} className={styles.liveProgramCard}>
                                        <div className={styles.liveProgramHeader}>
                                            <div className={styles.liveProgramInfo}>
                                                <h3 className={styles.liveProgramName}>
                                                    {program.name}
                                                </h3>
                                                <p className={styles.liveProgramDescription}>
                                                    {program.description}
                                                </p>
                                                <div className={styles.liveProgramMeta}>
                                                    <span className={styles.liveProgramHosts}>
                                                        Con {program.hosts.join(', ')}
                                                    </span>
                                                    <span className={styles.liveProgramListeners}>
                                                        👥 {program.listeners}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.liveProgramActions}>
                                                <button className={styles.listenLiveButton}>
                                                    🎧 ESCUCHAR EN VIVO
                                                </button>
                                                <div className={styles.progressBar}>
                                                    <div 
                                                        className={styles.progressFill}
                                                        style={{ width: `${program.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Grid de Programas */}
                    <div className={styles.programsGridSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.titleIcon}>📻</span>
                                Todos los Programas
                                <span className={styles.programsCount}>
                                    {filteredPrograms.length} programas
                                </span>
                            </h2>
                        </div>

                        <div className={styles.programsGrid}>
                            {filteredPrograms.map(program => (
                                <div key={program.id} className={styles.programCard}>
                                    <div className={styles.programHeader}>
                                        <div 
                                            className={styles.programImage}
                                            style={{ borderColor: getCategoryColor(program.category) }}
                                        >
                                            {program.image}
                                        </div>
                                        <div className={styles.programBasicInfo}>
                                            <h3 className={styles.programName}>
                                                {program.name}
                                            </h3>
                                            <div className={styles.programMeta}>
                                                {program.isLive && (
                                                    <span className={styles.liveBadge}>
                                                        🔴 EN VIVO
                                                    </span>
                                                )}
                                                <span className={styles.listeners}>
                                                    👥 {program.listeners}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className={styles.programDescription}>
                                        {program.description}
                                    </p>

                                    <div className={styles.programDetails}>
                                        <div className={styles.programHosts}>
                                            <span className={styles.detailLabel}>Conductores:</span>
                                            <span>{program.hosts.join(', ')}</span>
                                        </div>
                                        <div className={styles.programSchedule}>
                                            <span className={styles.detailLabel}>Horario:</span>
                                            <span>{program.schedule}</span>
                                        </div>
                                        <div className={styles.programNext}>
                                            <span className={styles.detailLabel}>Próxima emisión:</span>
                                            <span className={styles.nextAir}>
                                                {program.nextAir}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.programActions}>
                                        <button className={styles.scheduleButton}>
                                            📅 AGENDAR
                                        </button>
                                        <button className={styles.listenButton}>
                                            🎧 ESCUCHAR
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className={styles.sidebar}>
                    {/* Locutores Destacados */}
                    <div className={styles.hostsSection}>
                        <h3 className={styles.sidebarTitle}>
                            <span className={styles.titleIcon}>🎙️</span>
                            Nuestros Locutores
                        </h3>
                        <div className={styles.hostsList}>
                            {featuredHosts.map(host => (
                                <div key={host.id} className={styles.hostCard}>
                                    <div className={styles.hostImage}>
                                        {host.image}
                                    </div>
                                    <div className={styles.hostInfo}>
                                        <h4 className={styles.hostName}>
                                            {host.name}
                                        </h4>
                                        <span className={styles.hostRole}>
                                            {host.role}
                                        </span>
                                        <div className={styles.hostDetails}>
                                            <span className={styles.hostExperience}>
                                                {host.experience}
                                            </span>
                                            <span className={styles.hostSpecialty}>
                                                {host.specialty}
                                            </span>
                                        </div>
                                        <div className={styles.hostPrograms}>
                                            {host.programs.map((program, index) => (
                                                <span key={index} className={styles.hostProgram}>
                                                    {program}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Horario Destacado */}
                    <div className={styles.scheduleSection}>
                        <h3 className={styles.sidebarTitle}>
                            <span className={styles.titleIcon}>⏰</span>
                            Próximos en Vivo
                        </h3>
                        <div className={styles.scheduleList}>
                            <div className={styles.scheduleItem}>
                                <div className={styles.scheduleTime}>
                                    <span>07:00</span>
                                    <span>Hoy</span>
                                </div>
                                <div className={styles.scheduleInfo}>
                                    <span className={styles.scheduleProgram}>
                                        Titulares Deportivos
                                    </span>
                                    <span className={styles.scheduleHosts}>
                                        Carlos Ruiz & Ana Martínez
                                    </span>
                                </div>
                            </div>
                            <div className={styles.scheduleItem}>
                                <div className={styles.scheduleTime}>
                                    <span>16:00</span>
                                    <span>Hoy</span>
                                </div>
                                <div className={styles.scheduleInfo}>
                                    <span className={styles.scheduleProgram}>
                                        Zona de Juego
                                    </span>
                                    <span className={styles.scheduleHosts}>
                                        Pedro Gómez
                                    </span>
                                </div>
                            </div>
                            <div className={styles.scheduleItem}>
                                <div className={styles.scheduleTime}>
                                    <span>18:00</span>
                                    <span>Hoy</span>
                                </div>
                                <div className={styles.scheduleInfo}>
                                    <span className={styles.scheduleProgram}>
                                        La Tribuna
                                    </span>
                                    <span className={styles.scheduleHosts}>
                                        Roberto Díaz & María Lopez
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className={styles.statsSection}>
                        <h3 className={styles.sidebarTitle}>
                            <span className={styles.titleIcon}>📊</span>
                            Estadísticas
                        </h3>
                        <div className={styles.statsGrid}>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>12</span>
                                <span className={styles.statLabel}>Programas Activos</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>25K</span>
                                <span className={styles.statLabel}>Oyentes Diarios</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>8</span>
                                <span className={styles.statLabel}>Locutores</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>168</span>
                                <span className={styles.statLabel}>Horas/Semana</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
