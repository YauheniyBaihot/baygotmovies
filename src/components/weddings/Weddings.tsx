import React from "react";
import Image from "next/image";
import { WeddingsItem, WeddingsItemProps } from "./weddings-item/WeddingsItem";
import styles from "./Weddings.module.scss";
import image1 from "/public/images/1.jpg";
import image2 from "/public/images/2.jpg";
import image3 from "/public/images/3.jpg";
import image4 from "/public/images/4.jpg";
import image5 from "/public/images/5.jpg";
import background from "/public/backgrounds/3.jpg";

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
      image: image2,
      languages: ["Russian"],
      header: "VILNIUS, LITHUANIA",
      text:
        (<p>
          It was an incredibly touching wedding of Maria and Edgar filled with sincere good wishes and love coming from
          each guest.
        </p>),
      teaserUrl: "7ZJvi0wpAjA",
      fullUrl: "_0Ch-eF9PDQ"
    },

    {
      image: image1,
      languages: ["Lithuanian"],
      header: "VILNIUS, LITHUANIA",
      text:
        (<p>
          I'm so excited to show you this fashionable wedding.
          <br />
          I fell in love with this couple at first sight. They are the epitome of style and grace.
          I can watch their videos million of times and never get bored",
        </p>),
      teaserUrl: "Ew0pjNmzt_s",
      fullUrl: "S_fL4hSvtE4"
    },

    {
      image: image3,
      languages: ["Lithuanian"],
      header: "NIDA, LITHUANIA",
      text:
        (<p>
          The wedding can be in sneakers, in a comfortable wedding dress and your lovely Dog is involved in the ceremony
          and brings you your wedding rings.
          At the end of the ceremony instead of rose petals, volleyballs fly over you. Your friends make you surprised
          and your favorite singer sings just for you and your friends.
        </p>),
      teaserUrl: "tQlLuSZanYE"
    },
    {
      image: image4,
      languages: ["English"],
      header: "KLAIPĖDA, LITHUANIA",
      text:
        (<p>
          Sterre and Eduardas and their wonderful international wedding in a luxurious manor in Sveksna.
        </p>),
      teaserUrl: "yNyEhWWea_w",
      fullUrl: "lsm-ZUPgMgM"
    },
    {
      image: image5,
      languages: ["Lithuanian"],
      header: "MOLĖTAI, LITHUANIA",
      text:
        (<p>
          Amazing wedding day of Joana and Donatas in Moletai manor and with the ceremony in church.
        </p>),
      teaserUrl: "XMvrzf5RWAI"
    }
  ];

  const itemsElements = items.map(item => (
    <WeddingsItem key={item.fullUrl || item.teaserUrl || item.header} {...item} />
  ));

  return (
    <div className={styles.weddings}>
      <div className={styles.backgroundOverlay}>
        <Image src={background} fill alt="background image" style={{ objectFit: "cover" }} />
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
