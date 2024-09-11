import styles from './Footer.module.scss';
import { FC } from 'react';

const Footer: FC = () => {
  const socialMedias = [
    {
      path: 'https://www.instagram.com/baygot_movies/',
      variant: 'instagram',
    },
    {
      path: 'https://t.me/fraubaygot',
      variant: 'telegram',
    },
    {
      path: 'https://m.me/baygotmovies',
      variant: 'messenger',
    },
    {
      path: 'https://wa.me/37068413646',
      variant: 'whatsapp',
    },
  ];

  return (
    <footer className={styles.footer}>

      <h1>Baygot Movies</h1>
      <ul>
        <li>
          <a href="/#weddings">Weddings</a>
        </li>
        <li>
          <a href="/#love-stories"> Love stories</a>
        </li>
        <li>
          <a href="/#santorini">Santorini</a>
        </li>
        <li>
          <a href="/#other-works"> Other works</a>
        </li>
      </ul>

      <ul>
        <li>
          <a href="/about">About me</a>
        </li>
        <li>
          EN | LT
        </li>
        <li>
          <a href="/policy"> Policy confidential</a>
        </li>
      </ul>

      <ul>
        <li>Intstagram</li>
        <li>Telegram</li>
        <li>WhatsUp</li>
        <li>Messenger</li>
      </ul>


      <button>Contact ME</button>
    </footer>
  );
};

export default Footer;
