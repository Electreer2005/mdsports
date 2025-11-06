import styles from './Home.module.css';
import { useState, useEffect } from 'react';

export default function Home() {
    const [currentMatch, setCurrentMatch] = useState(null);
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [livePrograms, setLivePrograms] = useState([]);

    // Datos de ejemplo - en una app real vendrían de una API
    useEffect(() => {
        // Partido en vivo simulado
        setCurrentMatch({
            id: 1,
            league: "Liga Profesional",
            teamA: { name: "Barcelona", logo: "🔵", score: 2 },
            teamB: { name: "Real Madrid", logo: "⚪", score: 1 },
            minute: 78,
            status: "live",
            commentary: "Gran jugada de ataque por la derecha..."
        });

        // Próximos partidos
        setUpcomingMatches([
            { id: 1, teamA: "Manchester City", teamB: "Liverpool", date: "Hoy 16:30", league: "Premier League" },
            { id: 2, teamA: "PSG", teamB: "Bayern Munich", date: "Mañana 20:00", league: "Champions League" },
            { id: 3, teamA: "Juventus", teamB: "AC Milan", date: "Dom 18:45", league: "Serie A" }
        ]);

        // Programas en vivo
        setLivePrograms([
            { id: 1, name: "Titulares Deportivos", host: "Carlos Ruiz", time: "AHORA", listeners: "2.4K" },
            { id: 2, name: "Análisis Táctico", host: "María Lopez", time: "15:00", listeners: "1.8K" },
            { id: 3, name: "La Tribuna", host: "Roberto Díaz", time: "17:30", listeners: "3.1K" }
        ]);
    }, []);

    return (
        <section className={styles.home}>
            {/* Hero Section */}
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Bienvenido a <span className={styles.highlight}>MDsports</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Tu casa del fútbol • Transmisiones en vivo • Análisis exclusivo
                    </p>
                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>24/7</span>
                            <span className={styles.statLabel}>Cobertura</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>50K+</span>
                            <span className={styles.statLabel}>Oyentes</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>LIVE</span>
                            <span className={styles.statLabel}>Ahora</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Match Section */}
            {currentMatch && (
                <div className={styles.liveMatchSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.liveIndicator}></span>
                            PARTIDO EN VIVO
                        </h2>
                        <span className={styles.matchLeague}>{currentMatch.league}</span>
                    </div>
                    
                    <div className={styles.matchCard}>
                        <div className={styles.teams}>
                            <div className={styles.team}>
                                <span className={styles.teamLogo}>{currentMatch.teamA.logo}</span>
                                <span className={styles.teamName}>{currentMatch.teamA.name}</span>
                                <span className={styles.teamScore}>{currentMatch.teamA.score}</span>
                            </div>
                            
                            <div className={styles.matchInfo}>
                                <div className={styles.matchTime}>
                                    <span className={styles.minute}>{currentMatch.minute}'</span>
                                    <span className={styles.matchStatus}>2° TIEMPO</span>
                                </div>
                                <div className={styles.vs}>VS</div>
                            </div>
                            
                            <div className={styles.team}>
                                <span className={styles.teamScore}>{currentMatch.teamB.score}</span>
                                <span className={styles.teamName}>{currentMatch.teamB.name}</span>
                                <span className={styles.teamLogo}>{currentMatch.teamB.logo}</span>
                            </div>
                        </div>
                        
                        <div className={styles.matchCommentary}>
                            <p>{currentMatch.commentary}</p>
                        </div>
                        
                        <button className={styles.listenButton}>
                            🎧 ESCUCHAR EN VIVO
                        </button>
                    </div>
                </div>
            )}

            {/* Content Grid */}
            <div className={styles.contentGrid}>
                {/* Upcoming Matches */}
                <div className={styles.gridSection}>
                    <h3 className={styles.gridTitle}>Próximos Partidos</h3>
                    <div className={styles.matchesList}>
                        {upcomingMatches.map(match => (
                            <div key={match.id} className={styles.upcomingMatch}>
                                <div className={styles.matchDetails}>
                                    <span className={styles.matchTeams}>
                                        {match.teamA} vs {match.teamB}
                                    </span>
                                    <span className={styles.matchLeague}>{match.league}</span>
                                </div>
                                <span className={styles.matchDate}>{match.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Live Programs */}
                <div className={styles.gridSection}>
                    <h3 className={styles.gridTitle}>Programas en Vivo</h3>
                    <div className={styles.programsList}>
                        {livePrograms.map(program => (
                            <div key={program.id} className={styles.programCard}>
                                <div className={styles.programInfo}>
                                    <h4 className={styles.programName}>{program.name}</h4>
                                    <p className={styles.programHost}>Con {program.host}</p>
                                </div>
                                <div className={styles.programMeta}>
                                    <span className={styles.programTime}>{program.time}</span>
                                    <span className={styles.programListeners}>👥 {program.listeners}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className={styles.gridSection}>
                    <h3 className={styles.gridTitle}>Acciones Rápidas</h3>
                    <div className={styles.actionsGrid}>
                        <button className={styles.actionButton}>
                            <span className={styles.actionIcon}>📻</span>
                            <span>Radio en Vivo</span>
                        </button>
                        <button className={styles.actionButton}>
                            <span className={styles.actionIcon}>📰</span>
                            <span>Noticias</span>
                        </button>
                        <button className={styles.actionButton}>
                            <span className={styles.actionIcon}>⚽</span>
                            <span>Resultados</span>
                        </button>
                        <button className={styles.actionButton}>
                            <span className={styles.actionIcon}>📅</span>
                            <span>Calendario</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* News Ticker */}
            <div className={styles.newsTicker}>
                <div className={styles.tickerLabel}>ÚLTIMAS NOTICIAS:</div>
                <div className={styles.tickerContent}>
                    <span>• Messi anuncia renovación • Manchester City gana la Premier • Mbappé rumbo al Real Madrid •</span>
                </div>
            </div>
        </section>
    );
}
