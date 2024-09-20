import React from 'react';
import Image from 'next/image';
import gitIcon from '../../public/img/gitIcon.png';
import logoRs from '../../public/img/logoRs.png';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerIcons}>
        <a
          href="https://github.com/arastepa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={gitIcon} alt="git icon" width={40} height={30} />
        </a>
        <a
          href="https://github.com/guranda26"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={gitIcon} alt="git icon" width={40} height={30} />
        </a>
        <a
          href="https://github.com/PaytsarHarutyunyan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={gitIcon} alt="git icon" width={40} height={30} />
        </a>
      </div>
      <span className={styles.footerDate}>{new Date().getFullYear()}</span>
      <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
        <Image src={logoRs} alt="logo Rs" width={60} height={30} />
      </a>
    </footer>
  );
};

export default Footer;
