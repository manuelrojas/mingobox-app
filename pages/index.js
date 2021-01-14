import React from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import FormMingo from '../components/FormMingo';

export default function Home() {


  return (
    <div className={styles.container}>
      <Head>
        <title>MingoBox App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full m-8 flex flex-col flex-grow">
        <FormMingo  />
      </div>

      <footer className={styles.footer}>
        <a
          href="https://www.facebook.com/mingo.box.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          Desarrollada por{' '}
          <img src="/mingo.png" alt="MingoBox Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
