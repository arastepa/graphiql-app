import React from 'react';
import Image from 'next/image';
import frame from '../../public/img/frame.png';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

interface HeaderProps {
    isAuthenticated: boolean;
    onSignOut?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onSignOut }) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <Link href="/">
                    <Image 
                        src={frame} 
                        alt="frame"   
                        width={92} 
                        height={60}
                        className={styles.headerImg} 
                    />
                </Link>
                <h2 className={styles.logoText}>WaveQ3</h2>
            </div>
            <div className={styles.nav}>
                <button className={styles.langToggle}>EN</button>
                {isAuthenticated ? (
                    <button className={styles.authButton} onClick={onSignOut}>Sign Out</button>
                ) : (
                    <>
                        <button className={styles.signInButton}>Sign In</button>
                        <button className={styles.authButton}>Sign Up</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;