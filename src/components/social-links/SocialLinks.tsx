import {
  SocialNetworkLink,
  SocialNetworkLinkProps
} from "./social-network-link/SocialNetworkLink";
import styles from "./SocialLinks.module.scss";

type SocialLinksProps = {
  className?: string;
  items: SocialNetworkLinkProps[];
};

export function SocialLinks(props: SocialLinksProps) {
  const { className, items } = props;

  const links = items.map(item => (
    <SocialNetworkLink key={item.variant} {...item} />
  ));

  return <div className={[className, styles.items].join(" ")}>{links}</div>;
}
