"use client";
import React from 'react';
import Image from 'next/image';
import mainImage from '../../public/img/homeImg.png';
import styles from '../styles/Welcome.module.css';
import Link from 'next/link';

const WelcomeSection: React.FC = () => {
    return (
        <div className={styles.welcome}>
            <h1 className={styles.welcomePart}>Welcome to Rest/Graphiql Client</h1>
            <h4 className={styles.welcomeText}>Our platform supports various endpoints and allows you to input queries, variables, and headers.</h4>
            <Image 
                src={mainImage} 
                alt="home img" 
                width={600} 
                height={337} 
                className={styles.welcomeImg}
            />
            <div className={styles.welcomeButtons}>
                <Link href="#" className={styles.welcomeButton}>Sign In</Link>
                <Link href="#" className={styles.welcomeButton}>Sign Up</Link>
            </div>
        </div>
    );
};

export default WelcomeSection;