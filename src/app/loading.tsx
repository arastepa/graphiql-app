import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Loading.module.css';
import loader from '@/img/loading.png';

const Loading = () => {
  return (
    <div className={styles.loader}>
      <Image src={loader} width={100} height={100} alt="loader" />
    </div>
  );
};

export default Loading;
