import Image from "next/image";
import React from "react";

import styles from "./Film.module.scss";
import { FilmItemProps, FilmItem } from "./films-item/FilmItem";

type FilmsProps = {
  items: FilmItemProps[];
};

export function Films(props: FilmsProps) {
  // const { items } = props;
  // TODO: pass items from top

  const items: FilmItemProps[] = [
    {
      name: "Family",
      previewImage: "images/6.jpg",
      link: "https://youtu.be/25C_5yDh5Os"
    },
    {
      name: "Love story",
      previewImage: "images/7.jpg",
      link: "https://youtu.be/r15qIPDlXeI"
    },
    {
      name: "About you",
      previewImage: "images/8.jpg",
      link: "https://www.instagram.com/reel/Ckn16dyovQT/?igshid=ZjE2NGZiNDQ="
    },
    {
      name: "Event",
      previewImage: "images/9.jpg",
      link: "https://www.instagram.com/reel/Ckp-BMtDaal/?igshid=ZjE2NGZiNDQ="
    }
  ];

  const itemsElements = items.map(item => (
    <FilmItem key={item.name} {...item} />
  ));

  return (
    <div className={styles.films} id="moments">
      <div style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        overflow: "hidden",
        clipPath: "inset(0)",
        transform: "translateZ(0)"
      }}>
        <div style={{ position: "fixed", width: "100vw", height: "100vh", top: 0 }}>
          <Image fill src="backgrounds/2.jpg" sizes="100vw" alt="background image" style={{ objectFit: "cover" }} />
        </div>
      </div>
      <h2 className={styles.title}>Welcome to my cinema</h2>
      <div className={styles.container}>{itemsElements}</div>
    </div>
  );
}
