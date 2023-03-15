import { useEffect, useState } from 'react';

type MediaQuerySourceProps = {
  query: string;
  paths: string[];
  onChange: () => void;
};

export function MediaQuerySource(props: MediaQuerySourceProps) {
  const { query, paths, onChange } = props;

  const [matches, setMatches] = useState(false);

  const handleChange = (event: MediaQueryListEvent) => {
    setMatches(event.matches);
    onChange();
  };

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    setMatches(matchMedia.matches);

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  if (!matches) return null;

  const sources = paths.map(path => <source key={path} src={path} />);

  return <>{sources}</>;
}
