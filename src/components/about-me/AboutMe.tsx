import styles from "./AboutMe.module.scss";
import me from "/public/images/me.jpg";
import background from "/public/backgrounds/1.jpg";
import Image from "next/image";

export function AboutMe() {
  return (
    <div className={styles.aboutMe} id="about-me">
      <div className={styles.backgroundOverlay}>
        <Image fill src={background} alt="background image" style={{ objectFit: "cover" }} />
      </div>
      <div className={styles.aboutMePhoto}>
        <div className={styles.aboutMePhotoContainer}>
          <Image src={me} alt="photo of myself" fill />
        </div>
      </div>
      <div className={styles.aboutMeText}>
        <h3 className={styles.aboutMeTitle}>Hi, I&apos;m Alyona!</h3>
        <p>
          I&apos;m a wedding videographer. My wedding movie will allow you to relive the same feelings you had on your
          special day even thousands of days later.
          For me, the most important goal is to create a touching movie that allows you to experience the same feelings
          that you felt on your special day even thousands of days later.
        </p>
        <p>
          I want to keep not just staged shots of a love story, but the real emotions of you and the people who are dear
          to you, capturing their smiles, tears and great love as a memory.
        </p>
        <p>
          The time is fleeting, so I want to freeze everyone at moment in time.
        </p>
        <p>
          No staged shoots, no slow-mo — the sounds, emotions and magical atmosphere of your day is what your story will
          convey.
        </p>
        <p>
          If your view is the same as mine, please don&apos;t hesitate to contact me. I would be honored to be a part of your
          unforgettable celebration.
        </p>
      </div>
    </div>
  );
}
