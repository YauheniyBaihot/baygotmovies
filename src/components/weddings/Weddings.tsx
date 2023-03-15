import { WeddingsItem, WeddingsItemProps } from './weddings-item/WeddingsItem';
import styles from './Weddings.module.scss';
import image1 from '/public/images/1.jpg';
import image2 from '/public/images/2.jpg';
import image3 from '/public/images/3.jpg';
import image4 from '/public/images/4.jpg';
import image5 from '/public/images/5.jpg';

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
      photoPath: 'images/1.jpg', //image1,
      languages: ['Lithuanian'],
      reversed: true,
      header: 'VILNIUS, LITHUANIA',
      text:
        " I'm so excited to show you this fashionable wedding.\n" +
        '          <br>\n' +
        '            I fell in love with this couple at first sight. They are the epitome of style and grace.\n' +
        '            I can watch their videos million of times and never get bored',
      fullUrl: 'R0jkgXrXk44',
      teaserUrl: 'TODO: url',
    },
    {
      photoPath: 'images/2.jpg',
      languages: ['Russian'],
      header: 'VILNIUS, LITHUANIA',
      text:
        ' It was an incredibly touching wedding of Maria and Edgar filled with sincere good wishes and love\n' +
        '          coming from each guest.',
      fullUrl: '5sd7gJTnFRM',
      teaserUrl: 'TODO: url',
    },
    {
      photoPath: 'images/3.jpg',
      languages: ['Lithuanian'],
      reversed: true,
      header: 'NIDA, LITHUANIA',
      text:
        '   The wedding can be in sneakers, in a comfortable wedding dress and your lovely Dog is involved in\n' +
        '          the ceremony and brings you your wedding rings.\n' +
        '          At the end of the ceremony instead of rose petals, volleyballs fly over you.\n' +
        '          Your friends make you surprised and your favorite singer sings just for you and your friends.',
      fullUrl: 'iw9yGlVeO4c',
      teaserUrl: 'TODO: url',
    },
    {
      photoPath: 'images/4.jpg',
      languages: ['English'],
      header: 'KLAIPĖDA, LITHUANIA',
      text:
        '  Sterre and Eduardas and their wonderful international wedding\n' +
        '          in a luxurious manor in Sveksna.',
      fullUrl: '4A67iTiOD_g',
      teaserUrl: 'TODO: url',
    },
    {
      photoPath: 'images/5.jpg',
      languages: ['Lithuanian'],
      reversed: true,
      header: 'MOLĖTAI, LITHUANIA',
      text: 'Amazing wedding day of Joana and Donatas in Moletai manor and with the ceremony in church.',
      fullUrl: 'M48jLQtG93E',
      teaserUrl: 'TODO: url',
    },
  ];

  const itemsElems = items.map(item => (
    <WeddingsItem key={item.text} {...item} />
  ));

  return (
    <div className={styles.weddings} id="weddings">
      <div className={styles.backgroundOverlay3}></div>
      <h3 className={styles.weddings__title}>
        Even thousands of days later
        <br />
        you can still feel
        <br />
        what you felt on that day
      </h3>

      {itemsElems}
    </div>
  );
}
