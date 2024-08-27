import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <a href="" target="_blank" rel="noopener noreferrer">
                GitHub Link
            </a>
            <span>{new Date().getFullYear()}</span>
            <a href="" target="_blank" rel="noopener noreferrer">
                Course Logo
            </a>
        </footer>
    );
};

export default Footer;