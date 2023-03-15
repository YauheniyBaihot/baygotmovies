import styles from './InstagramPost.module.scss';

export type InstagramPostProps = {
  instagramUrl: string;
  imagePreview: string;
};

export function InstagramPost(props: InstagramPostProps) {
  const { instagramUrl, imagePreview } = props;

  return (
    <div
      className={styles.post}
      style={{
        backgroundImage: `url(${imagePreview})`,
      }}
    >
      <a href={instagramUrl} target="_blank">
        <img className={styles.post__image} src="media/play.svg" alt="play" />
      </a>
    </div>
  );
}
