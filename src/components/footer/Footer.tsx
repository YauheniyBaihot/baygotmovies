import { InstagramPosts } from '@/components/instagram-posts/InstagranPosts';
import { Navigation } from '@/components/navigation/Navigation';
import { SocialLinks } from '@/components/social-links/SocialLinks';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Navigation items={[]} />

      <div className={styles.footer__items}>
        <div className={styles.footer__items__item}>
          <InstagramPosts items={[]} />
        </div>
        <div className={styles.footer__items__item}>
          <h2 className={styles.footer__title}>baygotfilm</h2>
          <p>
            Based in Lithuania, Vilnius.
            <br />
            Available Worldwide
          </p>

          <p>
            I speak English, Russian, German, Spanish, Lithuanian, Belarussian
            languages.
          </p>
          <SocialLinks items={[]} />
        </div>
        <div className={styles.footer__items__item}>
          <h2 className={styles.footer__pricing}>LOOKING FOR PRICING?</h2>
          <button className={styles.playButton}>Contact me</button>
          <p>
            I will get back to you within 24 hours
            <br />
            and send you my proposal
          </p>
        </div>
      </div>
      <div className={styles.footer__cc}>
        © 2023 baygotfilm, Site by Yauheniy Baihot
      </div>
    </footer>
  );
}
