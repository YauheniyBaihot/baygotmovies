import {
  InstagramPostProps,
  InstagramPost
} from "./instagram-post/InstagramPost";
import styles from "./InstagramPosts.module.scss";


type InstagramPostsProps = {
  items: InstagramPostsProps[];
};

export function InstagramPosts(props: InstagramPostsProps) {
  //const {items} = props;

  const items: InstagramPostProps[] = [
    {
      instagramUrl: "https://www.instagram.com/tv/CfHs1XqsImB/?igshid=ZjE2NGZiNDQ=",
      imagePreview: "instagram/1.jpg"
    },
    {
      instagramUrl: "https://www.instagram.com/reel/CkBJjC2jTQB/?igshid=ZjE2NGZiNDQ=",
      imagePreview: "instagram/2.jpg"
    },
    {
      instagramUrl: "https://www.instagram.com/reel/Cou1bGfrjgj/?igshid=ZjE2NGZiNDQ=",
      imagePreview: "instagram/3.jpg"
    },
    {
      instagramUrl: "https://www.instagram.com/reel/CozHLSyMk8i/?igshid=ZjE2NGZiNDQ=",
      imagePreview: "instagram/4.jpg"
    }
  ];

  const itemsElements = items.map(item => (
    <InstagramPost key={item.instagramUrl} {...item} />
  ));

  return <div className={styles.instagramPosts}>{itemsElements}</div>;
}
