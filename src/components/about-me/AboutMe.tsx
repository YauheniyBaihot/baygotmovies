import styles from "./AboutMe.module.scss";
import Image from "next/image";

import variables from "@/styles/Variables.module.scss";

export function AboutMe() {
  return (
    <div className={styles.aboutMe} id="about-me">
      <div style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        overflow: "hidden",
        clipPath: "inset(0)",
        backfaceVisibility: 'hidden'
      }}>
        <div style={{ position: "fixed", width: "100vw", height: "100vh", top: 0 }}>
          <Image fill src="backgrounds/1.jpg" sizes="100vw" alt="background image" style={{ objectFit: "cover" }} />
        </div>
      </div>

      <div className={styles.photo}>
        <div className={styles.photoContainer}>
          <Image src="images/me.jpg" sizes={`(max-width: ${variables.mediaSm}) 100vw, ${variables.mediaSm}`}
                 alt="photo of myself"
                 fill />
        </div>
      </div>
      <div className={styles.text}>
        <h3 className={styles.title}>Hi, I&apos;m Alyona!</h3>
        <p>
          I&apos;m a wedding videographer. My wedding movie will allow you to relive the same feelings you had on your
          special day even thousands of days later.
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
          If your view on the video aligns with mine, please don&apos;t hesitate to contact me. I would be honored to be
          a
          part of your unforgettable celebration and create a touching but also entertaining movie.
        </p>
      </div>
    </div>
  );
}
