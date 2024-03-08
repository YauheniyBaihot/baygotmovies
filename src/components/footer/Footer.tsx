import { InstagramPosts } from "@/components/instagram-posts/InstagranPosts";
import { Navigation } from "@/components/navigation/Navigation";
import { SocialLinks } from "@/components/social-links/SocialLinks";
import styles from "./Footer.module.scss";

export function Footer() {

  const socialMedias = [
    {
      path: "https://www.instagram.com/baygot_movies/",
      variant: "instagram"
    },
    {
      path: "https://t.me/fraubaygot",
      variant: "telegram"
    },
    {
      path: "https://m.me/baygotmovies",
      variant: "messenger"
    },
    {
      path: "https://wa.me/37068413646",
      variant: "whatsapp"
    }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.items}>
        <div className={styles.item}>
          <InstagramPosts items={[]} />
        </div>
        <div className={styles.item}>
          <h3 className={styles.title}>BAYGOTMOVIES</h3>
          <p>
            Based in Lithuania, Vilnius.
            <br />
            Available Worldwide
          </p>
          <p>
            I speak English, Russian, and German, and a little bit of Lithuanian.
          </p>
          <div className={styles.socialLinks}>
            {/*<SocialLinks items={socialMedias} />*/}
          </div>

        </div>
        <div className={styles.item} id="contact">
          <h3 className={styles.pricing}>LOOKING FOR PRICING?</h3>
          <p>Get in touch with me</p>
          <a className={styles.email} href="mailto:alena.parhamovich@gmail.com" target="_blank">alena.parhamovich@gmail.com</a>
          <div className={styles.socialLinks}>
            <SocialLinks items={socialMedias} />
          </div>
          {/*<button className={styles.button}>Contact me</button>*/}
          <p>
            I will get back to you within 24 hours
            <br />
            and send you my proposal
          </p>
        </div>
      </div>
      <div className={styles.cc}>
        © 2024 BAYGOTMOVIES, Site by Yauheniy Baihot
      </div>
    </footer>
  );
}
