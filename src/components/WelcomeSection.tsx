"use client";
import React from 'react';
import Image from 'next/image';
import styles from '../app/page.module.css';
import mainImage from '../../public/img/homeImg.png';

const WelcomeSection: React.FC = () => {
    return (
        <div className={styles.welcome}>
            <h1>Welcome to Rest/Graphiql Client</h1>
            <h4>Our platform supports various endpoints and allows you to input queries, variables, and headers.</h4>
            <Image 
                src={mainImage} 
                alt="home img" 
                width={600} 
                height={400} 
            />
            <div>
                <button onClick={() => console.log('Redirect to Sign In')}>Sign In</button>
                <button onClick={() => console.log('Redirect to Sign Up')}>Sign Up</button>
            </div>
        </div>
    );
};

export default WelcomeSection;