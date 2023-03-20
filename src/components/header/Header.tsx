import { LanguageSwitcher } from "@/components/language-switcher/LanguageSwitcher";
import { MediaQueryVideo } from "@/components/media-query-video/MediaQueryVideo";
import { Navigation } from "@/components/navigation/Navigation";
import { SocialLinks } from "@/components/social-links/SocialLinks";
import { useState } from "react";
import styles from "./Header.module.scss";
import { motion } from "framer-motion";


import variables from "@/styles/Variables.module.scss";

type HeaderProps = {};

export function Header(props: HeaderProps) {
  // TODO: move to props
  const navigationItems = [
    {
      link: "#about-me",
      text: "About me"
    },
    {
      link: "#weddings",
      text: "Wedding"
    },
    {
      link: "#moments",
      text: "Moments"
    },
    {
      link: "#contact",
      text: "Contact"
    }
  ];


  const languages = [
    {
      name: "Русский",
      code: "RU"
    },
    {
      name: "Litueviskai",
      code: "LT"
    },
    {
      name: "English",
      code: "EN"
    }
  ];

  const [currentLang, changeLanguage] = useState(languages[2]);

  const sources = [
    {
      query: `(max-width: ${variables.mediaSm})`,
      path: "/video/background/width-sm.mp4"
    },
    {
      query: `(max-width:  ${variables.mediaMd})`,
      path: "/video/background/width-md.mp4"
    },
    {
      query: `(max-width: ${variables.mediaLg})`,
      path: "/video/background/width-lg.mp4"
    },
    {
      query: `(max-width: ${variables.mediaXl})`,
      path: "/video/background/width-xl.mp4"
    },
    {
      query: `(max-width: ${variables.mediaXxl})`,
      path: "/video/background/width-xxl.mp4"
    },
    {
      query: "",
      path: "/video/background/width-original.mp4"
    }
  ];

  const socialMedias = [
    {
      path: "https://www.instagram.com/baygotfilm/",
      variant: "instagram"
    },
    {
      path: "https://t.me/fraubaygot",
      variant: "telegram"
    },
    {
      path: "https://m.me/baygotfilms",
      variant: "messenger"
    },
    {
      path: "https://wa.me/37068413646",
      variant: "whatsapp"
    }
  ];

  return (
    <header className={styles.header} id="home">
      <MediaQueryVideo sources={sources} className={styles.backgroundVideo} />

      <div className={styles.navigation}>
        <Navigation items={navigationItems} />
        {/*<LanguageSwitcher*/}
        {/*  languages={languages}*/}
        {/*  currentLanguage={currentLang}*/}
        {/*  onChange={changeLanguage}*/}
        {/*/>*/}
      </div>

      <a className={styles.logo} href="./">
        baygotfilm
      </a>

      <SocialLinks className={styles.contacts} items={socialMedias} />

      <h1 className={styles.title}>
        The moments are fleeting
        <br />
        let’s capture them together
      </h1>

      <motion.div className={styles.overlay}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 3 }}>
      </motion.div>
    </header>
  );
}
