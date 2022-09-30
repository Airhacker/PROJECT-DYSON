import Head from 'next/head'
import Image from 'next/image'
import SignIn from '../components/SignIn'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gigachad Workout App</title>
        <meta name="description" content="THE BEST WORKOUT APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignIn/>

      
    </div>
  )
}
