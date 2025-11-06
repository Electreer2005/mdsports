import { useState } from 'react';
import styles from './Header.module.css';
import Logo from '../../assets/logo.jpeg';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaBroadcastTower, FaFutbol, FaPodcast, FaNewspaper, FaCalendarAlt } from 'react-icons/fa';

export default function Header() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActiveLink = (path) => {
        return location.pathname === path ? styles.active : '';
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navItems = [
        { path: '/', icon: <FaHome />, label: 'Inicio' },
        { path: '/live', icon: <FaBroadcastTower />, label: 'En Vivo' },
        { path: '/sports', icon: <FaFutbol />, label: 'Deportes' },
        { path: '/programs', icon: <FaPodcast />, label: 'Programas' },
        { path: '/news', icon: <FaNewspaper />, label: 'Noticias' },
        { path: '/schedule', icon: <FaCalendarAlt />, label: 'Calendario' }
    ];

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                {/* Logo Section */}
                <div className={styles.logoSection}>
                    <div className={styles.logo}>
                        <img src={Logo} alt="Radio Deportiva Logo" />
                    </div>
                    <div className={styles.stationInfo}>
                        <h1 className={styles.stationName}>Radio Deportiva</h1>
                        <span className={styles.stationSlogan}>Tu pasión, nuestro deporte</span>
                    </div>
                </div>

                {/* Navigation - Desktop */}
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {navItems.map(item => (
                            <li key={item.path}>
                                <Link 
                                    to={item.path} 
                                    className={`${styles.navLink} ${isActiveLink(item.path)}`}
                                >
                                    <span className={styles.navIcon}>{item.icon}</span>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Live Sports Match */}
                <div className={styles.liveMatch}>
                    <div className={styles.matchInfo}>
                        <span className={styles.team}>ARG</span>
                        <span className={styles.score}>2 - 1</span>
                        <span className={styles.team}>BRA</span>
                    </div>
                    <div className={styles.matchStatus}>
                        <span className={styles.liveDot}></span>
                        <span className={styles.liveText}>MIN 78'</span>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className={styles.mobileMenuButton}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.active : ''}`}>
                <div className={styles.mobileMenuContent}>
                    {/* Mobile Live Match */}
                    <div className={styles.mobileLiveMatch}>
                        <div className={styles.matchInfo}>
                            <span className={styles.team}>ARG</span>
                            <span className={styles.score}>2 - 1</span>
                            <span className={styles.team}>BRA</span>
                        </div>
                        <div className={styles.matchStatus}>
                            <span className={styles.liveDot}></span>
                            <span className={styles.liveText}>EN VIVO - MIN 78'</span>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className={styles.mobileNav}>
                        <ul className={styles.mobileNavList}>
                            {navItems.map(item => (
                                <li key={item.path}>
                                    <Link 
                                        to={item.path} 
                                        className={`${styles.mobileNavLink} ${isActiveLink(item.path)}`}
                                        onClick={closeMobileMenu}
                                    >
                                        <span className={styles.mobileNavIcon}>{item.icon}</span>
                                        <span className={styles.mobileNavLabel}>{item.label}</span>
                                        <span className={styles.mobileNavArrow}>→</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Additional Info */}
                    <div className={styles.mobileFooter}>
                        <div className={styles.mobileStats}>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>24/7</span>
                                <span className={styles.statLabel}>Cobertura</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>50K+</span>
                                <span className={styles.statLabel}>Oyentes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {isMobileMenuOpen && (
                <div 
                    className={styles.backdrop}
                    onClick={closeMobileMenu}
                />
            )}
        </header>
    );
}
