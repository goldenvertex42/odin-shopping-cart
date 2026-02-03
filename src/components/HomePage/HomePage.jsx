import styles from "./HomePage.module.css";
import fireplace from "../../assets/fireplaceGIF.gif"

export default function HomePage() {
  return(
    <main className={styles.main}>
      <div className={styles.textContent}>
        <h2>Welcome to Brigid's General Store!</h2>
        <p className={styles.welcome}>
          Come on in and get warm and cozy and grab something that speaks to you!
          We have a variety of items from all kinds of places, so try something new!
        </p>
      </div>
      <div className={styles.fireplace}>
        <img src={fireplace} alt="a cozy fireplace gif" />
        <a href="https://giphy.com/gifs/fireplace-fire-warm-Hj7mksbFWIOdO" className={styles.attribution}>Giphy</a>
      </div>
    </main>
  );
}