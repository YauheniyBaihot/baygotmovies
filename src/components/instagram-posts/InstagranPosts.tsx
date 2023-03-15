import {
  InstagramPostProps,
  InstagramPost,
} from './instagram-post/InstagramPost';
import styles from './InstagramPosts.module.scss';

type InstagramPostsProps = {
  items: InstagramPostsProps[];
};

export function InstagramPosts(props: InstagramPostsProps) {
  //const {items} = props;

  const items: InstagramPostProps[] = [
    {
      instagramUrl: 'images/1.jpg',
      imagePreview: 'instagram/1.jpg',
    },
    {
      instagramUrl: 'media/instagram/2.jpg',
      imagePreview: 'instagram/2.jpg',
    },
    {
      instagramUrl: 'media/instagram/3.jpg',
      imagePreview: 'instagram/3.jpg',
    },
    {
      instagramUrl: 'media/instagram/4.jpg',
      imagePreview: 'instagram/4.jpg',
    },
  ];

  const itemsElements = items.map(item => (
    <InstagramPost key={item.instagramUrl} {...item} />
  ));

  return <div className={styles.instagramPosts}>{itemsElements}</div>;
}
