import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useRouter} from 'next/router';
import {FC} from 'react';

import {ContactFormData, ContactMe} from '@/components/contact-me/ContactMe';
import {Header} from '@/components/header/Header';

const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'data'])),
    },
  };
};

const Contact: FC = () => {
  const {push} = useRouter();

  const handleSubmit = async (data: ContactFormData) => {
    await fetch('/api/submit-contact-form', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    });
    await push('thanks');
  };

  return (
    <>
      <Header />
      <ContactMe onSubmit={handleSubmit} />
    </>
  );
};

export {getStaticProps};

export default Contact;
