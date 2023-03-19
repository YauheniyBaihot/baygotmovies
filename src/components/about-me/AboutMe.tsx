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
          <Image src={me} alt="photo of myself" fill/>
        </div>
      </div>
      <div className={styles.aboutMeText}>
        <h3 className={styles.aboutMeTitle}>Hi, I`m Alyona!</h3>
        <p>
          I&apos;m a wedding videographer. Every video I create is made as if it were made for me. My wedding videos are a
          combination of touching moments and hilarious ones.
        </p>
        <p>
          The most important thing to me is that while watching my videos even hundred years later you feel the same
          feelings you you had on your wedding day.
        </p>
        <p>
          Your wedding day isn&apos;t just about you—it&apos;s also about your parents, grandparents, and friends. I want to keep
          as
          a memory not staged shots of a love story, but the real emotions of people who are dear to you capturing their
          smiles, tears, and great love.
        </p>
        <p>
          I will bring every detail of your story to life: the moments, the sounds, the emotions, to reflect the magical
          ambiance of your event. No rehearsed moments, no wedding dress shot from thousands of angles —sincerity,
          authenticity, and the power of true feelings are what your story will convey.
        </p>
        <p>
          I would be honored to be a part of your special day.
          
        </p>
      </div>
      {/*<div className={styles.backgroundOverlay}></div>*/}
      {/*<div className={styles.aboutMe__container}>*/}
      {/*<Image src={me} alt="my photo"  />*/}
      {/*<img className= src="/images/me.JPG" />*/}
      {/*<div className={styles.aboutMe__text}>*/}

    </div>
  );
}
