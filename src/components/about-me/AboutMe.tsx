import styles from './AboutMe.module.scss';
import Image from 'next/image';

import variables from '@/styles/Variables.module.scss';

export function AboutMe() {
  return (
    <div className={styles.aboutMe} id="about-me">
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        overflow: 'hidden',
        clipPath: 'inset(0)',
        backfaceVisibility: 'hidden',
      }}>
        <div style={{ position: 'fixed', width: '100vw', height: '100vh', top: 0 }}>
          <Image fill src="backgrounds/1.jpg" sizes="100vw" alt="background image" style={{ objectFit: 'cover' }} />
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
          I&apos;m a wedding videographer who aims to capture more than just staged shots of a love story. My goal is to
          preserve the real emotions of you and your loved ones, documenting genuine smiles, tears and profound love
        </p>
        <p>
          In the teaser, I schow the most beautiful and highlight moments of your special day. The longer video is a
          blend of touching and joyful part's, capturing the significant words of your guests, along with an edited,
          condensed version of the ceremony.The congratulations, contests and the whole ceremony, I provide you with
          separately edited files.
        </p>
        <p>
          My priority is to film your wedding beautiful, unique in a cozy and heartfelt manner. I allow you to relive
          the same feelings you had on your special day even thousands of days later.
        </p>
      </div>
    </div>
  );
}
