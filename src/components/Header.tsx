import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
    const [isSticky, setIsSticky] = useState(false);
    const router = useRouter();

    const handleScroll = () => {
        setIsSticky(window.scrollY > 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSignOut = () => {
        console.log('User signed out');
        router.push('/');
    };

    const switchLanguage = () => {
    };

    return (
        <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
            <div className={styles.container}>
                <div className={styles.logo} onClick={() => router.push('/')}>Logo</div>
                <div className={styles.nav}>
                    <button onClick={switchLanguage} className={styles.langToggle}>Language Toggle</button>
                    <button onClick={handleSignOut} className={styles.signOut}>Sign Out</button>
                </div>
            </div>
        </header>
    );
};

export default Header;