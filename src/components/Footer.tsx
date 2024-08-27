import React from 'react';
import Image from 'next/image';
import gitIcon from '../../public/img/gitIcon.png';
import logoRs from '../../public/img/logoRs.png';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerIcons}>
                <a href="" target="_blank" rel="noopener noreferrer">
                    <Image 
                        src={gitIcon} 
                        alt="git icon"   
                        width={40} 
                        height={30} 
                    />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                    <Image 
                        src={gitIcon} 
                        alt="git icon"   
                        width={40} 
                        height={30} 
                    />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                    <Image 
                        src={gitIcon} 
                        alt="git icon"   
                        width={40} 
                        height={30} 
                    />
                </a>
            </div>
            <span className={styles.footerDate}>{new Date().getFullYear()}</span>
            <a href="" target="_blank" rel="noopener noreferrer">
                <Image 
                    src={logoRs} 
                    alt="logo Rs"   
                    width={60} 
                    height={30} 
                />
            </a>
        </footer>
    );
};

export default Footer;