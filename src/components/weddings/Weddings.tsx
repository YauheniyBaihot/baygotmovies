import React from 'react';
import Image from 'next/image';
import { WeddingsItem, WeddingsItemProps } from './weddings-item/WeddingsItem';
import styles from './Weddings.module.scss';

type WeddingsProps = {
  items: WeddingsItemProps[];
};

export function Weddings(props: WeddingsProps) {
  // TODO: get provided items;
  // const { items } = props;

  // TODO: how to deal with id?
  // TODO: set auto reversed item with scss
  // TODO: header lower case then upper
  const items: WeddingsItemProps[] = [
    {
      image: 'img/2.jpg',
      header: 'Love is every moment',
      text:
        (<p>
          This is a story about Irma and Miguel and their wonderful international wedding held in Lithuania. I like
          every part of this story because it feels so true, so real. I was particularly impressed by their ability to
          engage in heartfelt conversations, share warm smiles, and gracefully dance together throughout the
          celebration.
        </p>),
      teaserUrl: 'sirEQ8GICtc',
      fullUrl: 'CvrW3vt_mII',
    },

    {
      image: 'img/1.jpg',
      header: 'VILNIUS, LITHUANIA',
      text:
        (<p>
          I&apos;m so excited to show you this fashionable wedding.
          <br />
          I fell in love with this couple at first sight. They are the epitome of style and grace.
          I can watch their videos million of times and never get bored.
        </p>),
      teaserUrl: 'Ew0pjNmzt_s',
      fullUrl: 'S_fL4hSvtE4',
    },

    {
      image: 'img/5.jpg',
      header: 'Ačiū tau',
      text:
        (<p>
          Such an incredible dream wedding, organized with taste, care and love! The atmosphere was relaxed, comfortable
          and sincere. The rain stopped, so we could take cool pictures by the sea. At the end of the day, fireworks
          surprised everyone. I was striving to catch every little thing, every feeling and capture everything in a
          beautiful way. Upon receiving feedback from the couple after watching their wedding film, honestly, I felt
          touched and inspired.
        </p>),
      teaserUrl: 'ioQmE_ihkRU',
    },

    {
      image: 'img/4.jpg',
      header: 'Real love',
      text:
        (<p>
          The wedding took place at the Lithuanian estate of Jakiškių Dvaros. Ugnė and Lucas have been together for many
          years and continue to gaze at each other with immense love. As the guests remarked - their love sets an
          example for many. And what a celebration the guests had!
        </p>),
      teaserUrl: 'LfPq44L8lqM',
      fullUrl: 'Ug7Vq637l-A',
    },

    {
      image: 'img/3.jpg',
      header: 'Mes turime kalbą',
      text:
        (<p>
          Paziürékite i vaizdo jrasa is lauko vestuviy! Linksmi ir sirdingi jaunavedziai bei nuostabi vakaro atmosfera!
        </p>),
      teaserUrl: '9rxtaob6P9c',
    },
    {
      image: 'img/10.jpg',
      header: 'Lietuviškos tradicijos Švėkšnoje',
      text:
        (<p>
          Sterre and Eduardas and their wonderful international wedding in a luxurious manor in Švėkšna
        </p>),
      teaserUrl: 'yNyEhWWea_w',
      fullUrl: 'lsm-ZUPgMgM',
    },
  ];

  const itemsElements = items.map(item => (
    <WeddingsItem key={item.fullUrl || item.teaserUrl || item.header} {...item} />
  ));

  return (
    <div className={styles.weddings}>
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
          <Image fill src="backgrounds/3.jpg" sizes="100vw" alt="background image" style={{ objectFit: 'cover' }} />
        </div>
      </div>

      <div className={styles.titleContainer}>
        <h2 className={styles.title}>
          Even thousands of days later
          <br />
          you can still feel
          <br />
          what you felt on that day
        </h2>
      </div>

      <div className={styles.weddingsItems} id="weddings">

        {itemsElements}
      </div>
    </div>
  );
}
