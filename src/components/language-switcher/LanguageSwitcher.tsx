import styles from './LanguageSwitcher.module.scss';

type Language = {
  name: string;
  code: string;
};

type LanguageSwitcherProps = {
  currentLanguage: Language;
  languages: Language[];
  onChange: (lang: Language) => void;
};

export function LanguageSwitcher(props: LanguageSwitcherProps) {
  const { languages, currentLanguage, onChange } = props;

  const items = languages.map(language => {
    const isCurrent = language.code == currentLanguage.code;

    return (
      <a
        className={styles.lang + ' ' + (isCurrent ? styles.langActive : '')}
        key={language.code}
        href="TODO: link"
      >
        {language.code}
      </a>
    );
  });

  return <div className={styles.items}>{items}</div>;
}
