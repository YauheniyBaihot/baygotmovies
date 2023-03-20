import Image from "next/image";
import background from "../../../public/backgrounds/2.jpg";
import styles from "./Film.module.scss";
import { FilmItemProps, FilmItem } from "./films-item/FilmItem";
import image6 from "public/images/6.jpg";
import image7 from "public/images/7.jpg";
import image8 from "public/images/8.jpg";
import image9 from "public/images/9.jpg";

type FilmsProps = {
  items: FilmItemProps[];
};

export function Films(props: FilmsProps) {
  // const { items } = props;
  // TODO: pass items from top

  const items: FilmItemProps[] = [
    {
      name: "Family",
      previewImage: image6,
      link: "https://youtu.be/25C_5yDh5Os"
    },
    {
      name: "Love story",
      previewImage: image7,
      link: "https://youtu.be/r15qIPDlXeI"
    },
    {
      name: "About you",
      previewImage: image8,
      link: "https://www.instagram.com/reel/Ckn16dyovQT/?igshid=ZjE2NGZiNDQ="
    },
    {
      name: "Event",
      previewImage: image9,
      link: "https://www.instagram.com/reel/Ckp-BMtDaal/?igshid=ZjE2NGZiNDQ="
    }
  ];

  const itemsElements = items.map(item => (
    <FilmItem key={item.name} {...item} />
  ));

  return (
    <div className={styles.films} id="moments">
      <div className={styles.backgroundOverlay}>
        <Image fill src={background} alt="background image" style={{ objectFit: "cover" }} />
      </div>
      <h2 className={styles.title}>Welcome to my cinema</h2>
      <div className={styles.container}>{itemsElements}</div>
    </div>
  );
}
