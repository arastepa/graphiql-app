import React from "react";
import styles from "../styles/NotFound.module.css";
import Image from "next/image";
import notFound from "../../public/img/not-found.svg";

const NotFound = () => {
  return (
    <section className={styles.notFound}>
      <div className={styles.notFoundContent}>
        <h2 className={styles.title}>Sorry, Page Not Found</h2>
        <Image src={notFound} alt="not found image" />
        <p>Could not found requested resource </p>
      </div>
    </section>
  );
};

export default NotFound;
