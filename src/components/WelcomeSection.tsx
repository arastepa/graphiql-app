"use client";
import React from 'react';
import Image from 'next/image';
import mainImage from '../../public/img/homeImg.png';
import styles from '../styles/Welcome.module.css';

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
                <button className={styles.welcomeButton} onClick={() => console.log('Redirect to Sign In')}>Sign In</button>
                <button className={styles.welcomeButton} onClick={() => console.log('Redirect to Sign Up')}>Sign Up</button>
            </div>
        </div>
    );
};

export default WelcomeSection;