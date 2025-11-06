import { useState, useEffect } from 'react';
import styles from './Schedule.module.css';

export default function Schedule() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewMode, setViewMode] = useState('dia'); // 'dia', 'semana', 'mes'
    const [schedule, setSchedule] = useState([]);
    const [featuredEvents, setFeaturedEvents] = useState([]);

    // Datos de ejemplo
    useEffect(() => {
        // Eventos destacados
        setFeaturedEvents([
            {
                id: 1,
                title: "Clásico Nacional",
                description: "Boca Juniors vs River Plate - Liga Profesional",
                date: new Date(2024, 0, 15, 21, 0),
                sport: "futbol",
                importance: "alta",
                broadcast: true,
                location: "Estadio Monumental"
            },
            {
                id: 2,
                title: "Final NBA",
                description: "Lakers vs Warriors - Playoffs",
                date: new Date(2024, 0, 16, 20, 30),
                sport: "basquet",
                importance: "alta",
                broadcast: true,
                location: "Staples Center"
            },
            {
                id: 3,
                title: "Gran Premio de Brasil",
                description: "Fórmula 1 - Carrera Principal",
                date: new Date(2024, 0, 17, 16, 0),
                sport: "motor",
                importance: "media",
                broadcast: true,
                location: "Interlagos"
            }
        ]);

        // Programación completa
        setSchedule([
            {
                id: 1,
                title: "Titulares Deportivos",
                type: "programa",
                start: new Date(2024, 0, 15, 7, 0),
                end: new Date(2024, 0, 15, 9, 0),
                sport: "general",
                hosts: ["Carlos Ruiz", "Ana Martínez"],
                isLive: true
            },
            {
                id: 2,
                title: "Boca vs River",
                type: "partido",
                start: new Date(2024, 0, 15, 21, 0),
                end: new Date(2024, 0, 15, 23, 0),
                sport: "futbol",
                league: "Liga Profesional",
                isLive: true
            },
            {
                id: 3,
                title: "La Tribuna",
                type: "programa",
                start: new Date(2024, 0, 15, 18, 0),
                end: new Date(2024, 0, 15, 20, 0),
                sport: "futbol",
                hosts: ["Roberto Díaz", "María Lopez"],
                isLive: false
            },
            {
                id: 4,
                title: "Zona de Juego",
                type: "programa",
                start: new Date(2024, 0, 16, 16, 0),
                end: new Date(2024, 0, 16, 17, 30),
                sport: "basquet",
                hosts: ["Pedro Gómez"],
                isLive: false
            },
            {
                id: 5,
                title: "Lakers vs Warriors",
                type: "partido",
                start: new Date(2024, 0, 16, 20, 30),
                end: new Date(2024, 0, 16, 23, 0),
                sport: "basquet",
                league: "NBA",
                isLive: true
            },
            {
                id: 6,
                title: "Marcador Final",
                type: "programa",
                start: new Date(2024, 0, 15, 22, 0),
                end: new Date(2024, 0, 15, 23, 0),
                sport: "general",
                hosts: ["Laura Fernandez"],
                isLive: false
            },
            {
                id: 7,
                title: "Gran Premio de Brasil",
                type: "evento",
                start: new Date(2024, 0, 17, 16, 0),
                end: new Date(2024, 0, 17, 18, 0),
                sport: "motor",
                category: "Fórmula 1",
                isLive: true
            }
        ]);
    }, []);

    // Funciones para manejar fechas
    const formatDate = (date) => {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getDayEvents = (date) => {
        return schedule.filter(event => {
            const eventDate = new Date(event.start);
            return eventDate.toDateString() === date.toDateString();
        }).sort((a, b) => new Date(a.start) - new Date(b.start));
    };

    const getWeekDates = () => {
        const dates = [];
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const navigateDate = (direction) => {
        const newDate = new Date(selectedDate);
        if (viewMode === 'dia') {
            newDate.setDate(selectedDate.getDate() + direction);
        } else if (viewMode === 'semana') {
            newDate.setDate(selectedDate.getDate() + (direction * 7));
        } else {
            newDate.setMonth(selectedDate.getMonth() + direction);
        }
        setSelectedDate(newDate);
    };

    const getSportIcon = (sport) => {
        const icons = {
            futbol: '⚽',
            basquet: '🏀',
            tenis: '🎾',
            motor: '🏎️',
            general: '📻',
            beisbol: '⚾',
            atletismo: '🏃'
        };
        return icons[sport] || '🏆';
    };

    const getEventTypeColor = (type) => {
        const colors = {
            programa: '#2196F3',
            partido: '#4CAF50',
            evento: '#FF9800'
        };
        return colors[type] || '#9C27B0';
    };

    const dayEvents = getDayEvents(selectedDate);
    const weekDates = getWeekDates();

    return (
        <section className={styles.schedule}>
            {/* Header */}
            <div className={styles.scheduleHeader}>
                <h1 className={styles.title}>Calendario Deportivo</h1>
                <p className={styles.subtitle}>
                    No te pierdas ningún evento. Toda la programación en un solo lugar.
                </p>
            </div>

            {/* Controles de Navegación */}
            <div className={styles.controlsSection}>
                <div className={styles.viewControls}>
                    <button 
                        className={`${styles.viewButton} ${viewMode === 'dia' ? styles.active : ''}`}
                        onClick={() => setViewMode('dia')}
                    >
                        📅 Día
                    </button>
                    <button 
                        className={`${styles.viewButton} ${viewMode === 'semana' ? styles.active : ''}`}
                        onClick={() => setViewMode('semana')}
                    >
                        📆 Semana
                    </button>
                    <button 
                        className={`${styles.viewButton} ${viewMode === 'mes' ? styles.active : ''}`}
                        onClick={() => setViewMode('mes')}
                    >
                        🗓️ Mes
                    </button>
                </div>

                <div className={styles.dateControls}>
                    <button 
                        className={styles.navButton}
                        onClick={() => navigateDate(-1)}
                    >
                        ◀️
                    </button>
                    
                    <div className={styles.currentDate}>
                        <span className={styles.dateDisplay}>
                            {formatDate(selectedDate)}
                        </span>
                    </div>
                    
                    <button 
                        className={styles.navButton}
                        onClick={() => navigateDate(1)}
                    >
                        ▶️
                    </button>
                    
                    <button 
                        className={styles.todayButton}
                        onClick={() => setSelectedDate(new Date())}
                    >
                        Hoy
                    </button>
                </div>
            </div>

            {/* Eventos Destacados */}
            <div className={styles.featuredSection}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.titleIcon}>🔥</span>
                    Eventos Destacados
                </h2>
                <div className={styles.featuredGrid}>
                    {featuredEvents.map(event => (
                        <div key={event.id} className={styles.featuredCard}>
                            <div className={styles.featuredHeader}>
                                <span className={styles.sportIcon}>
                                    {getSportIcon(event.sport)}
                                </span>
                                <div className={styles.featuredInfo}>
                                    <h3 className={styles.featuredTitle}>
                                        {event.title}
                                    </h3>
                                    <p className={styles.featuredDescription}>
                                        {event.description}
                                    </p>
                                </div>
                                {event.broadcast && (
                                    <span className={styles.broadcastBadge}>
                                        📡 EN VIVO
                                    </span>
                                )}
                            </div>
                            
                            <div className={styles.featuredDetails}>
                                <div className={styles.eventTime}>
                                    <span className={styles.timeIcon}>⏰</span>
                                    <span>{formatTime(event.date)}</span>
                                </div>
                                <div className={styles.eventLocation}>
                                    <span className={styles.locationIcon}>📍</span>
                                    <span>{event.location}</span>
                                </div>
                            </div>
                            
                            <div className={styles.featuredActions}>
                                <button className={styles.reminderButton}>
                                    ⏰ Recordarme
                                </button>
                                <button className={styles.listenButton}>
                                    🎧 Escuchar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vista Principal */}
            <div className={styles.mainContent}>
                {/* Vista Día */}
                {viewMode === 'dia' && (
                    <div className={styles.dayView}>
                        <div className={styles.dayHeader}>
                            <h3 className={styles.dayTitle}>
                                Programación del {formatDate(selectedDate)}
                            </h3>
                            <span className={styles.eventsCount}>
                                {dayEvents.length} eventos
                            </span>
                        </div>

                        {dayEvents.length === 0 ? (
                            <div className={styles.noEvents}>
                                <span className={styles.noEventsIcon}>📅</span>
                                <h4>No hay eventos programados para este día</h4>
                                <p>Revisa otros días o la programación semanal</p>
                            </div>
                        ) : (
                            <div className={styles.timeline}>
                                {dayEvents.map(event => (
                                    <div key={event.id} className={styles.timelineEvent}>
                                        <div className={styles.eventTimeSlot}>
                                            <span className={styles.startTime}>
                                                {formatTime(new Date(event.start))}
                                            </span>
                                            <span className={styles.endTime}>
                                                {formatTime(new Date(event.end))}
                                            </span>
                                        </div>
                                        
                                        <div 
                                            className={`${styles.eventCard} ${event.isLive ? styles.live : ''}`}
                                            style={{ borderLeftColor: getEventTypeColor(event.type) }}
                                        >
                                            <div className={styles.eventHeader}>
                                                <div className={styles.eventType}>
                                                    <span 
                                                        className={styles.typeBadge}
                                                        style={{ backgroundColor: getEventTypeColor(event.type) }}
                                                    >
                                                        {event.type.toUpperCase()}
                                                    </span>
                                                    {event.isLive && (
                                                        <span className={styles.liveBadge}>
                                                            🔴 EN VIVO
                                                        </span>
                                                    )}
                                                </div>
                                                <span className={styles.sportIcon}>
                                                    {getSportIcon(event.sport)}
                                                </span>
                                            </div>
                                            
                                            <h4 className={styles.eventTitle}>
                                                {event.title}
                                            </h4>
                                            
                                            <div className={styles.eventDetails}>
                                                {event.hosts && (
                                                    <div className={styles.eventHosts}>
                                                        <span>Con: {event.hosts.join(', ')}</span>
                                                    </div>
                                                )}
                                                {event.league && (
                                                    <div className={styles.eventLeague}>
                                                        <span>{event.league}</span>
                                                    </div>
                                                )}
                                                {event.category && (
                                                    <div className={styles.eventCategory}>
                                                        <span>{event.category}</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className={styles.eventActions}>
                                                <button className={styles.addCalendarButton}>
                                                    📅 Agendar
                                                </button>
                                                {event.isLive && (
                                                    <button className={styles.listenNowButton}>
                                                        🎧 Escuchar Ahora
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Vista Semana */}
                {viewMode === 'semana' && (
                    <div className={styles.weekView}>
                        <div className={styles.weekHeader}>
                            <h3>Programación Semanal</h3>
                        </div>
                        <div className={styles.weekGrid}>
                            {weekDates.map((date, index) => {
                                const dayEvents = getDayEvents(date);
                                const isToday = date.toDateString() === new Date().toDateString();
                                const isSelected = date.toDateString() === selectedDate.toDateString();
                                
                                return (
                                    <div 
                                        key={index} 
                                        className={`${styles.weekDay} ${isToday ? styles.today : ''} ${isSelected ? styles.selected : ''}`}
                                        onClick={() => setSelectedDate(date)}
                                    >
                                        <div className={styles.dayHeader}>
                                            <span className={styles.dayName}>
                                                {date.toLocaleDateString('es-ES', { weekday: 'short' })}
                                            </span>
                                            <span className={styles.dayNumber}>
                                                {date.getDate()}
                                            </span>
                                        </div>
                                        <div className={styles.dayEvents}>
                                            {dayEvents.slice(0, 3).map(event => (
                                                <div 
                                                    key={event.id} 
                                                    className={styles.weekEvent}
                                                    style={{ borderLeftColor: getEventTypeColor(event.type) }}
                                                >
                                                    <span className={styles.eventTime}>
                                                        {formatTime(new Date(event.start))}
                                                    </span>
                                                    <span className={styles.eventTitle}>
                                                        {event.title}
                                                    </span>
                                                    {event.isLive && (
                                                        <span className={styles.liveDot}></span>
                                                    )}
                                                </div>
                                            ))}
                                            {dayEvents.length > 3 && (
                                                <div className={styles.moreEvents}>
                                                    +{dayEvents.length - 3} más
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Vista Mes */}
                {viewMode === 'mes' && (
                    <div className={styles.monthView}>
                        <div className={styles.monthHeader}>
                            <h3>
                                {selectedDate.toLocaleDateString('es-ES', { 
                                    month: 'long', 
                                    year: 'numeric' 
                                })}
                            </h3>
                        </div>
                        <div className={styles.calendarGrid}>
                            {/* Aquí iría la implementación completa del calendario mensual */}
                            <div className={styles.comingSoon}>
                                <span className={styles.comingSoonIcon}>🚧</span>
                                <h4>Vista Mensual en Desarrollo</h4>
                                <p>Próximamente tendrás una vista completa del calendario mensual</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar de Filtros */}
            <div className={styles.sidebar}>
                <div className={styles.filtersSection}>
                    <h3 className={styles.sidebarTitle}>
                        <span className={styles.titleIcon}>⚙️</span>
                        Filtros
                    </h3>
                    <div className={styles.filterGroup}>
                        <h4>Deportes</h4>
                        <label className={styles.filterCheckbox}>
                            <input type="checkbox" defaultChecked />
                            <span>⚽ Fútbol</span>
                        </label>
                        <label className={styles.filterCheckbox}>
                            <input type="checkbox" defaultChecked />
                            <span>🏀 Básquet</span>
                        </label>
                        <label className={styles.filterCheckbox}>
                            <input type="checkbox" defaultChecked />
                            <span>🎾 Tenis</span>
                        </label>
                        <label className={styles.filterCheckbox}>
                            <input type="checkbox" defaultChecked />
                            <span>🏎️ Motor</span>
                        </label>
                    </div>
                    
                    <div className={styles.filterGroup}>
                        <h4>Tipo de Evento</h4>
                        <label className={styles.filterCheckbox}>
                            <input type="checkbox" defaultChecked />
                            <span>📻 Programas</span>
                        </label>
                        <label className={styles.filterCheckbox}>
                            <input type="checkbox" defaultChecked />
                            <span>⚽ Partidos</span>
                        </label>
                        <label className={styles.filterCheckbox}>
                            <input type="checkbox" defaultChecked />
                            <span>🎯 Eventos Especiales</span>
                        </label>
                    </div>
                    
                    <div className={styles.filterGroup}>
                        <h4>Estado</h4>
                        <label className={styles.filterCheckbox}>
                            <input type="checkbox" defaultChecked />
                            <span>🔴 En Vivo</span>
                        </label>
                        <label className={styles.filterCheckbox}>
                            <input type="checkbox" defaultChecked />
                            <span>⏰ Próximos</span>
                        </label>
                    </div>
                </div>

                {/* Recordatorios */}
                <div className={styles.remindersSection}>
                    <h3 className={styles.sidebarTitle}>
                        <span className={styles.titleIcon}>⏰</span>
                        Mis Recordatorios
                    </h3>
                    <div className={styles.remindersList}>
                        <div className={styles.reminderItem}>
                            <span className={styles.reminderSport}>⚽</span>
                            <div className={styles.reminderInfo}>
                                <span className={styles.reminderTitle}>Boca vs River</span>
                                <span className={styles.reminderTime}>Hoy 21:00</span>
                            </div>
                            <button className={styles.removeReminder}>🗑️</button>
                        </div>
                        <div className={styles.reminderItem}>
                            <span className={styles.reminderSport}>🏀</span>
                            <div className={styles.reminderInfo}>
                                <span className={styles.reminderTitle}>Lakers vs Warriors</span>
                                <span className={styles.reminderTime}>Mañana 20:30</span>
                            </div>
                            <button className={styles.removeReminder}>🗑️</button>
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
                            <span className={styles.statLabel}>Eventos Hoy</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>8</span>
                            <span className={styles.statLabel}>En Vivo</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>45</span>
                            <span className={styles.statLabel}>Esta Semana</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>3</span>
                            <span className={styles.statLabel}>Destacados</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
