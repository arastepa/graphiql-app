"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WelcomeSection from "../components/WelcomeSection";
// import UserSection from '../components/UserSection';
import styles from "./page.module.css";
import { LanguageProvider } from "../context/LanguageContext";

const HomePage: React.FC = () => {
  return (
    <LanguageProvider>
      <div className={styles.page}>
        <Header isAuthenticated={false} onSignOut={() => {}} />
        <main className={styles.main}>
          <WelcomeSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default HomePage;
