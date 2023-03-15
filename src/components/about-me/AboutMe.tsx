import styles from './AboutMe.module.scss';

export function AboutMe() {
  return (
    <div className={styles.aboutMe} id="about-me">
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.aboutMe__container}>
        <img className={styles.aboutMe__photo} src="/images/me.JPG" />
        <div className={styles.aboutMe__text}>
          <p className={styles.aboutMe__title}>Hi, I`m Alyona</p>
          <p>
            I am a wedding videographer. 2 years ago I started off my
            film-making journey with shooting my travel videos. I have learnt to
            tell a powerful story with my camera and now I would like to tell
            your stories, too.
          </p>

          <p>
            Every story is unique, be it a dazzling wedding or a passionate
            romance; a solemn christening service, or a warm family celebration.
            I am here to capture the unique spirit of your special occasion and
            shape it in the creative style that works best for you. We will
            bring every detail of your story to life: the moments, the sounds,
            the emotions - to reflect the magic ambience of your event.
          </p>

          <p>
            No languid looks or wedding dress shot from thousands of angles. No
            posing or rehearsal: sincerity and authenticity and the power of
            true feelings are what your story will convey.
          </p>

          <p>The moments are fleeting, so let’s capture them together.</p>

          <p>I would be honored to be part of your special day.</p>
        </div>
      </div>
    </div>
  );
}
