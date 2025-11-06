import { useState, useEffect } from 'react';
import styles from './News.module.css';

export default function News() {
    const [activeCategory, setActiveCategory] = useState('todas');
    const [featuredNews, setFeaturedNews] = useState(null);
    const [news, setNews] = useState([]);
    const [trendingNews, setTrendingNews] = useState([]);

    const categories = [
        { id: 'todas', name: 'Todas las Noticias', icon: '📰' },
        { id: 'futbol', name: 'Fútbol', icon: '⚽' },
        { id: 'basquet', name: 'Básquetbol', icon: '🏀' },
        { id: 'tenis', name: 'Tenis', icon: '🎾' },
        { id: 'motor', name: 'Motor', icon: '🏎️' },
        { id: 'transferencias', name: 'Transferencias', icon: '🔄' },
        { id: 'selecciones', name: 'Selecciones', icon: '🌍' }
    ];

    // Datos de ejemplo
    useEffect(() => {
        // Noticia destacada
        setFeaturedNews({
            id: 1,
            title: "Messi gana su octavo Balón de Oro y hace historia en el fútbol mundial",
            excerpt: "El astro argentino supera todas las marcas y se consolida como el mejor jugador de todos los tiempos tras una temporada espectacular.",
            image: "🏆",
            category: "futbol",
            author: "Carlos Ruiz",
            date: "Hace 2 horas",
            readTime: "4 min",
            isBreaking: true,
            tags: ["Balón de Oro", "Messi", "Historia"]
        });

        // Lista de noticias
        setNews([
            {
                id: 1,
                title: "Argentina confirma su squad para las Eliminatorias",
                excerpt: "Scaloni anuncia la lista de convocados con algunas sorpresas incluídas.",
                image: "🇦🇷",
                category: "selecciones",
                author: "Ana Martínez",
                date: "Hace 1 hora",
                readTime: "3 min",
                isBreaking: false,
                tags: ["Argentina", "Eliminatorias", "Scaloni"]
            },
            {
                id: 2,
                title: "Los Lakers derrotan a Warriors en clásico de la NBA",
                excerpt: "Partidazo en el Staples Center con LeBron James como figura destacada.",
                image: "🏀",
                category: "basquet",
                author: "Pedro Gómez",
                date: "Hace 3 horas",
                readTime: "5 min",
                isBreaking: true,
                tags: ["NBA", "Lakers", "Warriors"]
            },
            {
                id: 3,
                title: "Nuevo récord mundial en los 100 metros lisos",
                excerpt: "Atleta jamaiquino establece nueva marca histórica en el campeonato mundial.",
                image: "⚡",
                category: "atletismo",
                author: "Laura Fernandez",
                date: "Hace 4 horas",
                readTime: "2 min",
                isBreaking: false,
                tags: ["Atletismo", "Récord", "100m"]
            },
            {
                id: 4,
                title: "Manchester City busca refuerzo de lujo para el mercado de invierno",
                excerpt: "El club inglés ya negocia con uno de los mediocampistas más cotizados de Europa.",
                image: "🔵",
                category: "transferencias",
                author: "Roberto Díaz",
                date: "Hace 5 horas",
                readTime: "4 min",
                isBreaking: false,
                tags: ["Manchester City", "Mercado", "Refuerzos"]
            },
            {
                id: 5,
                title: "Gran Premio de Brasil: Horarios y dónde ver la carrera",
                excerpt: "Todo lo que necesitas saber sobre el próximo evento de Fórmula 1.",
                image: "🏎️",
                category: "motor",
                author: "Javier Mendez",
                date: "Hace 6 horas",
                readTime: "3 min",
                isBreaking: false,
                tags: ["Fórmula 1", "Brasil", "Horarios"]
            },
            {
                id: 6,
                title: "Nadal confirma su participación en el Abierto de Australia",
                excerpt: "El español vuelve a las canchas tras su recuperación de lesión.",
                image: "🎾",
                category: "tenis",
                author: "Sofia Castro",
                date: "Hace 7 horas",
                readTime: "2 min",
                isBreaking: false,
                tags: ["Nadal", "Australia", "Tenis"]
            }
        ]);

        // Noticias trending
        setTrendingNews([
            { id: 1, title: "Mbappé renueva con el PSG", position: 1, category: "futbol" },
            { id: 2, title: "Nuevo estadio para Boca Juniors", position: 2, category: "futbol" },
            { id: 3, title: "Cambio de entrenador en el Barcelona", position: 3, category: "futbol" },
            { id: 4, title: "Récord de audiencia en la NBA", position: 4, category: "basquet" },
            { id: 5, title: "Nuevo patrocinador para la F1", position: 5, category: "motor" }
        ]);
    }, []);

    const filteredNews = activeCategory === 'todas' 
        ? news 
        : news.filter(item => item.category === activeCategory);

    const getCategoryColor = (category) => {
        const colors = {
            'futbol': '#4CAF50',
            'basquet': '#FF9800',
            'tenis': '#2196F3',
            'motor': '#F44336',
            'transferencias': '#9C27B0',
            'selecciones': '#795548',
            'atletismo': '#607D8B'
        };
        return colors[category] || '#FFD700';
    };

    const formatDate = (dateString) => {
        return dateString;
    };

    return (
        <section className={styles.news}>
            {/* Header */}
            <div className={styles.newsHeader}>
                <h1 className={styles.title}>Noticias Deportivas</h1>
                <p className={styles.subtitle}>
                    Información actualizada del mundo del deporte las 24 horas
                </p>
            </div>

            {/* Noticia Destacada */}
            {featuredNews && (
                <div className={styles.featuredSection}>
                    <div className={styles.featuredNews}>
                        <div className={styles.featuredContent}>
                            <div className={styles.featuredMeta}>
                                <span 
                                    className={styles.featuredCategory}
                                    style={{ backgroundColor: getCategoryColor(featuredNews.category) }}
                                >
                                    {categories.find(cat => cat.id === featuredNews.category)?.icon}
                                    {categories.find(cat => cat.id === featuredNews.category)?.name}
                                </span>
                                {featuredNews.isBreaking && (
                                    <span className={styles.breakingBadge}>
                                        🔥 ULTIMA HORA
                                    </span>
                                )}
                            </div>
                            
                            <h2 className={styles.featuredTitle}>
                                {featuredNews.title}
                            </h2>
                            
                            <p className={styles.featuredExcerpt}>
                                {featuredNews.excerpt}
                            </p>
                            
                            <div className={styles.featuredFooter}>
                                <div className={styles.authorInfo}>
                                    <span className={styles.author}>Por {featuredNews.author}</span>
                                    <span className={styles.date}>{featuredNews.date}</span>
                                    <span className={styles.readTime}>⏱️ {featuredNews.readTime}</span>
                                </div>
                                
                                <div className={styles.featuredTags}>
                                    {featuredNews.tags.map((tag, index) => (
                                        <span key={index} className={styles.tag}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className={styles.featuredActions}>
                                <button className={styles.readButton}>
                                    📖 Leer Noticia Completa
                                </button>
                                <button className={styles.shareButton}>
                                    📤 Compartir
                                </button>
                            </div>
                        </div>
                        
                        <div className={styles.featuredImage}>
                            <div className={styles.imagePlaceholder}>
                                {featuredNews.image}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Contenido Principal */}
            <div className={styles.newsContent}>
                {/* Columna Principal */}
                <div className={styles.mainColumn}>
                    {/* Filtros de Categorías */}
                    <div className={styles.categoriesSection}>
                        <div className={styles.categoriesContainer}>
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
                                    onClick={() => setActiveCategory(category.id)}
                                    style={activeCategory === category.id ? { 
                                        borderColor: getCategoryColor(category.id) 
                                    } : {}}
                                >
                                    <span className={styles.categoryIcon}>{category.icon}</span>
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid de Noticias */}
                    <div className={styles.newsGridSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.titleIcon}>📋</span>
                                Últimas Noticias
                                <span className={styles.newsCount}>
                                    {filteredNews.length} noticias
                                </span>
                            </h2>
                        </div>

                        <div className={styles.newsGrid}>
                            {filteredNews.map(item => (
                                <article key={item.id} className={styles.newsCard}>
                                    <div className={styles.newsHeader}>
                                        <div className={styles.newsMeta}>
                                            <span 
                                                className={styles.newsCategory}
                                                style={{ backgroundColor: getCategoryColor(item.category) }}
                                            >
                                                {categories.find(cat => cat.id === item.category)?.icon}
                                                {categories.find(cat => cat.id === item.category)?.name}
                                            </span>
                                            {item.isBreaking && (
                                                <span className={styles.breakingBadge}>
                                                    🔥 ULTIMA HORA
                                                </span>
                                            )}
                                        </div>
                                        <span className={styles.newsDate}>
                                            {item.date}
                                        </span>
                                    </div>

                                    <div className={styles.newsContent}>
                                        <div className={styles.newsImage}>
                                            {item.image}
                                        </div>
                                        <div className={styles.newsText}>
                                            <h3 className={styles.newsTitle}>
                                                {item.title}
                                            </h3>
                                            <p className={styles.newsExcerpt}>
                                                {item.excerpt}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.newsFooter}>
                                        <div className={styles.newsInfo}>
                                            <span className={styles.newsAuthor}>
                                                Por {item.author}
                                            </span>
                                            <span className={styles.newsReadTime}>
                                                ⏱️ {item.readTime}
                                            </span>
                                        </div>
                                        
                                        <div className={styles.newsTags}>
                                            {item.tags.slice(0, 2).map((tag, index) => (
                                                <span key={index} className={styles.tag}>
                                                    #{tag}
                                                </span>
                                            ))}
                                            {item.tags.length > 2 && (
                                                <span className={styles.moreTags}>
                                                    +{item.tags.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.newsActions}>
                                        <button className={styles.readMoreButton}>
                                            Leer más →
                                        </button>
                                        <button className={styles.saveButton}>
                                            💾 Guardar
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className={styles.sidebar}>
                    {/* Trending News */}
                    <div className={styles.trendingSection}>
                        <h3 className={styles.sidebarTitle}>
                            <span className={styles.titleIcon}>🔥</span>
                            Trending Topics
                        </h3>
                        <div className={styles.trendingList}>
                            {trendingNews.map((item, index) => (
                                <div key={item.id} className={styles.trendingItem}>
                                    <span className={styles.trendingPosition}>
                                        #{item.position}
                                    </span>
                                    <div className={styles.trendingContent}>
                                        <span className={styles.trendingTitle}>
                                            {item.title}
                                        </span>
                                        <span 
                                            className={styles.trendingCategory}
                                            style={{ color: getCategoryColor(item.category) }}
                                        >
                                            {categories.find(cat => cat.id === item.category)?.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className={styles.newsletterSection}>
                        <h3 className={styles.sidebarTitle}>
                            <span className={styles.titleIcon}>📧</span>
                            Newsletter
                        </h3>
                        <div className={styles.newsletterContent}>
                            <p>Recibe las noticias más importantes en tu email</p>
                            <div className={styles.newsletterForm}>
                                <input 
                                    type="email" 
                                    placeholder="tu@email.com"
                                    className={styles.newsletterInput}
                                />
                                <button className={styles.newsletterButton}>
                                    Suscribirse
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className={styles.statsSection}>
                        <h3 className={styles.sidebarTitle}>
                            <span className={styles.titleIcon}>📊</span>
                            En Números
                        </h3>
                        <div className={styles.statsGrid}>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>156</span>
                                <span className={styles.statLabel}>Noticias Hoy</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>24</span>
                                <span className={styles.statLabel}>En Directo</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>45K</span>
                                <span className={styles.statLabel}>Lectores</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>12</span>
                                <span className={styles.statLabel}>Periodistas</span>
                            </div>
                        </div>
                    </div>

                    {/* Redes Sociales */}
                    <div className={styles.socialSection}>
                        <h3 className={styles.sidebarTitle}>
                            <span className={styles.titleIcon}>🌐</span>
                            Síguenos
                        </h3>
                        <div className={styles.socialLinks}>
                            <button className={styles.socialButton}>
                                <span>📘</span>
                                Facebook
                            </button>
                            <button className={styles.socialButton}>
                                <span>🐦</span>
                                Twitter
                            </button>
                            <button className={styles.socialButton}>
                                <span>📷</span>
                                Instagram
                            </button>
                            <button className={styles.socialButton}>
                                <span>📹</span>
                                YouTube
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Load More */}
            <div className={styles.loadMoreSection}>
                <button className={styles.loadMoreButton}>
                    📰 Cargar Más Noticias
                </button>
            </div>
        </section>
    );
}
