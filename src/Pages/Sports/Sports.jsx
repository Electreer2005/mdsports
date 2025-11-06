import { useState, useEffect } from 'react';
import styles from './Sports.module.css';

export default function Sports() {
    const [activeSport, setActiveSport] = useState('futbol');
    const [featuredMatches, setFeaturedMatches] = useState([]);
    const [sportsNews, setSportsNews] = useState([]);
    const [leagues, setLeagues] = useState([]);

    const sports = [
        { id: 'futbol', name: 'Fútbol', icon: '⚽', color: '#4CAF50' },
        { id: 'basquet', name: 'Básquetbol', icon: '🏀', color: '#FF9800' },
        { id: 'tenis', name: 'Tenis', icon: '🎾', color: '#2196F3' },
        { id: 'beisbol', name: 'Béisbol', icon: '⚾', color: '#795548' },
        { id: 'motor', name: 'Motor', icon: '🏎️', color: '#F44336' },
        { id: 'otros', name: 'Otros', icon: '🏆', color: '#9C27B0' }
    ];

    // Datos de ejemplo
    useEffect(() => {
        // Partidos destacados
        setFeaturedMatches([
            {
                id: 1,
                league: "Liga Profesional",
                teamA: { name: "Barcelona", logo: "🔵", score: 2 },
                teamB: { name: "Real Madrid", logo: "⚪", score: 1 },
                status: "live",
                minute: 78,
                date: "Hoy 15:00",
                sport: "futbol"
            },
            {
                id: 2,
                league: "NBA",
                teamA: { name: "Lakers", logo: "🟣", score: 98 },
                teamB: { name: "Warriors", logo: "🔵", score: 102 },
                status: "finished",
                date: "Ayer",
                sport: "basquet"
            },
            {
                id: 3,
                league: "Wimbledon",
                teamA: { name: "Djokovic", logo: "🇷🇸", score: 3 },
                teamB: { name: "Alcaraz", logo: "🇪🇸", score: 2 },
                status: "upcoming",
                date: "Mañana 14:30",
                sport: "tenis"
            }
        ]);

        // Noticias deportivas
        setSportsNews([
            {
                id: 1,
                title: "Messi gana su octavo Balón de Oro",
                excerpt: "El astro argentino hace historia nuevamente en el mundo del fútbol...",
                image: "📰",
                category: "Fútbol",
                date: "Hace 2 horas",
                sport: "futbol"
            },
            {
                id: 2,
                title: "Nuevo récord en la NBA",
                excerpt: "Los Celtics establecen nueva marca de triples en una temporada...",
                image: "🏀",
                category: "Básquetbol",
                date: "Hace 5 horas",
                sport: "basquet"
            },
            {
                id: 3,
                title: "Gran Premio de Mónaco",
                excerpt: "Preparativos finales para la carrera más emblemática del calendario...",
                image: "🏎️",
                category: "Motor",
                date: "Hace 1 día",
                sport: "motor"
            }
        ]);

        // Ligas y torneos
        setLeagues([
            { id: 1, name: "Liga Profesional", country: "Argentina", sport: "futbol", matches: 128 },
            { id: 2, name: "Premier League", country: "Inglaterra", sport: "futbol", matches: 380 },
            { id: 3, name: "Champions League", country: "Europa", sport: "futbol", matches: 125 },
            { id: 4, name: "NBA", country: "USA", sport: "basquet", matches: 1230 },
            { id: 5, name: "Wimbledon", country: "Reino Unido", sport: "tenis", matches: 127 }
        ]);
    }, []);

    const filteredMatches = featuredMatches.filter(match => 
        activeSport === 'todos' || match.sport === activeSport
    );

    const filteredNews = sportsNews.filter(news => 
        activeSport === 'todos' || news.sport === activeSport
    );

    const filteredLeagues = leagues.filter(league => 
        activeSport === 'todos' || league.sport === activeSport
    );

    const getStatusBadge = (status) => {
        switch (status) {
            case 'live':
                return { text: 'EN VIVO', class: styles.live };
            case 'finished':
                return { text: 'FINALIZADO', class: styles.finished };
            case 'upcoming':
                return { text: 'PRÓXIMO', class: styles.upcoming };
            default:
                return { text: 'PROGRAMADO', class: styles.upcoming };
        }
    };

    return (
        <section className={styles.sports}>
            {/* Header */}
            <div className={styles.sportsHeader}>
                <h1 className={styles.title}>Deportes</h1>
                <p className={styles.subtitle}>
                    Sigue toda la acción deportiva en MDsports
                </p>
            </div>

            {/* Filtros de Deportes */}
            <div className={styles.sportsFilter}>
                <div className={styles.filterContainer}>
                    <button 
                        className={`${styles.filterButton} ${activeSport === 'todos' ? styles.active : ''}`}
                        onClick={() => setActiveSport('todos')}
                    >
                        <span className={styles.filterIcon}>🏆</span>
                        Todos
                    </button>
                    {sports.map(sport => (
                        <button 
                            key={sport.id}
                            className={`${styles.filterButton} ${activeSport === sport.id ? styles.active : ''}`}
                            onClick={() => setActiveSport(sport.id)}
                            style={activeSport === sport.id ? { borderColor: sport.color } : {}}
                        >
                            <span className={styles.filterIcon}>{sport.icon}</span>
                            {sport.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contenido Principal */}
            <div className={styles.sportsContent}>
                {/* Columna Izquierda - Partidos Destacados */}
                <div className={styles.mainColumn}>
                    {/* Partidos Destacados */}
                    <div className={styles.featuredSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.titleIcon}>🔥</span>
                                Partidos Destacados
                            </h2>
                            <span className={styles.sectionCount}>
                                {filteredMatches.length} eventos
                            </span>
                        </div>

                        <div className={styles.matchesGrid}>
                            {filteredMatches.map(match => {
                                const status = getStatusBadge(match.status);
                                return (
                                    <div key={match.id} className={styles.matchCard}>
                                        <div className={styles.matchHeader}>
                                            <span className={styles.matchLeague}>
                                                {match.league}
                                            </span>
                                            <span className={`${styles.matchStatus} ${status.class}`}>
                                                {match.status === 'live' && <span className={styles.liveDot}></span>}
                                                {status.text}
                                                {match.status === 'live' && ` · ${match.minute}'`}
                                            </span>
                                        </div>

                                        <div className={styles.teams}>
                                            <div className={styles.team}>
                                                <span className={styles.teamLogo}>{match.teamA.logo}</span>
                                                <span className={styles.teamName}>{match.teamA.name}</span>
                                                <span className={styles.teamScore}>{match.teamA.score}</span>
                                            </div>
                                            
                                            <div className={styles.vs}>VS</div>
                                            
                                            <div className={styles.team}>
                                                <span className={styles.teamScore}>{match.teamB.score}</span>
                                                <span className={styles.teamName}>{match.teamB.name}</span>
                                                <span className={styles.teamLogo}>{match.teamB.logo}</span>
                                            </div>
                                        </div>

                                        <div className={styles.matchFooter}>
                                            <span className={styles.matchDate}>{match.date}</span>
                                            <button className={styles.actionButton}>
                                                {match.status === 'live' ? '🎧 ESCUCHAR' : '📋 DETALLES'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Noticias Deportivas */}
                    <div className={styles.newsSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.titleIcon}>📰</span>
                                Últimas Noticias
                            </h2>
                        </div>

                        <div className={styles.newsGrid}>
                            {filteredNews.map(news => (
                                <div key={news.id} className={styles.newsCard}>
                                    <div className={styles.newsImage}>
                                        {news.image}
                                    </div>
                                    <div className={styles.newsContent}>
                                        <div className={styles.newsMeta}>
                                            <span className={styles.newsCategory}>
                                                {news.category}
                                            </span>
                                            <span className={styles.newsDate}>
                                                {news.date}
                                            </span>
                                        </div>
                                        <h3 className={styles.newsTitle}>
                                            {news.title}
                                        </h3>
                                        <p className={styles.newsExcerpt}>
                                            {news.excerpt}
                                        </p>
                                        <button className={styles.readMore}>
                                            Leer más →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className={styles.sidebar}>
                    {/* Ligas y Torneos */}
                    <div className={styles.leaguesSection}>
                        <h3 className={styles.sidebarTitle}>
                            <span className={styles.titleIcon}>🏅</span>
                            Ligas & Torneos
                        </h3>
                        <div className={styles.leaguesList}>
                            {filteredLeagues.map(league => (
                                <div key={league.id} className={styles.leagueItem}>
                                    <div className={styles.leagueInfo}>
                                        <h4 className={styles.leagueName}>
                                            {league.name}
                                        </h4>
                                        <span className={styles.leagueCountry}>
                                            {league.country}
                                        </span>
                                    </div>
                                    <div className={styles.leagueStats}>
                                        <span className={styles.matchesCount}>
                                            {league.matches}
                                        </span>
                                        <span className={styles.matchesLabel}>
                                            partidos
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Estadísticas Rápidas */}
                    <div className={styles.statsSection}>
                        <h3 className={styles.sidebarTitle}>
                            <span className={styles.titleIcon}>📊</span>
                            Estadísticas
                        </h3>
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <span className={styles.statValue}>156</span>
                                <span className={styles.statLabel}>Partidos Hoy</span>
                            </div>
                            <div className={styles.statCard}>
                                <span className={styles.statValue}>24</span>
                                <span className={styles.statLabel}>En Vivo</span>
                            </div>
                            <div className={styles.statCard}>
                                <span className={styles.statValue}>89</span>
                                <span className={styles.statLabel}>Deportes</span>
                            </div>
                            <div className={styles.statCard}>
                                <span className={styles.statValue}>45K</span>
                                <span className={styles.statLabel}>Oyentes</span>
                            </div>
                        </div>
                    </div>

                    {/* Próximos Eventos */}
                    <div className={styles.eventsSection}>
                        <h3 className={styles.sidebarTitle}>
                            <span className={styles.titleIcon}>⏰</span>
                            Próximos Eventos
                        </h3>
                        <div className={styles.eventsList}>
                            <div className={styles.eventItem}>
                                <div className={styles.eventTime}>
                                    <span>16:30</span>
                                    <span>Hoy</span>
                                </div>
                                <div className={styles.eventInfo}>
                                    <span className={styles.eventSport}>⚽ Fútbol</span>
                                    <span className={styles.eventName}>Boca vs River</span>
                                </div>
                            </div>
                            <div className={styles.eventItem}>
                                <div className={styles.eventTime}>
                                    <span>20:00</span>
                                    <span>Hoy</span>
                                </div>
                                <div className={styles.eventInfo}>
                                    <span className={styles.eventSport}>🏀 Básquet</span>
                                    <span className={styles.eventName}>NBA Finals</span>
                                </div>
                            </div>
                            <div className={styles.eventItem}>
                                <div className={styles.eventTime}>
                                    <span>14:00</span>
                                    <span>Mañana</span>
                                </div>
                                <div className={styles.eventInfo}>
                                    <span className={styles.eventSport}>🎾 Tenis</span>
                                    <span className={styles.eventName}>Roland Garros</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
