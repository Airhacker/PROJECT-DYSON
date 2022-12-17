import Head from "next/head";
import GymTime from "../components/GymTime";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gigachad Workout App</title>
        <meta name="description" content="THE BEST WORKOUT APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GymTime />
    </div>
  );
}
