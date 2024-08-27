import React from 'react';
import styles from '../styles/Header.module.css';

interface HeaderProps {
    isAuthenticated: boolean;
    onSignOut?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onSignOut }) => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>My App</div>
            <div className={styles.nav}>
                <button className={styles.langToggle}>EN</button>
                {isAuthenticated ? (
                    <button className={styles.authButton} onClick={onSignOut}>Sign Out</button>
                ) : (
                    <>
                        <button className={styles.authButton}>Sign In</button>
                        <button className={styles.authButton}>Sign Up</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;