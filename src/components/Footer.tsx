import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <a href="" target="_blank" rel="noopener noreferrer">GitHub</a>
                <span>{new Date().getFullYear()}</span>
                <a href="" target="_blank" rel="noopener noreferrer">Course Logo</a>
            </div>
        </footer>
    );
};

export default Footer;