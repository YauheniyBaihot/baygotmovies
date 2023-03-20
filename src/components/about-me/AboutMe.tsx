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
        <h3 className={styles.aboutMeTitle}>Hi, I`m Alyona!</h3>
        <p>
          For me, the most important goal is to create a touching movie that allows you to experience the same feelings
          that you felt on your special day even thousands of days later.
        </p>
        <p>
          While beautiful video-shots are important, I believe that true love should never be lost in the process. Your
          wedding day is not just about you, but also about your loved ones who have played a special role in your life.
          After all, this day is not only about you, but also about our parents, grandparents, friends.
        </p>
        <p>
          I strive to capture the genuine emotions of those closest to you, preserving their smiles, tears and heartfelt
          love as a memory. I want to freeze this moment in time, so you can always remember how everyone felt and
          looked on that day.
        </p>
        <p>
          My approach is simple yet powerful. I won't stage anything or capture a thousand angles of your wedding dress
          in slow motion. Instead, I will create a film that captures the sounds, emotions and magical atmosphere of
          your day, conveying the sincerity, authenticity and true power of your love.
        </p>
        <p>
          If you want to have a film that truly captures your special day and the love shared between you and your loved
          ones, please don&apos;t hesitate to contact me. I would be honored to be a part of your unforgettable celebration.
        </p>
      </div>
    </div>
  );
}
