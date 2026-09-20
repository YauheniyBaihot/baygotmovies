'use client';

import {useT} from 'next-i18next/client';
import {useRouter} from 'next/navigation';
import {FC} from 'react';

import {ContactFormData, ContactMe} from '@/components/contact-me/ContactMe';
import {Header} from '@/components/header/Header';

const Contact: FC = () => {
  const router = useRouter();
  const {i18n} = useT();
  const locale = i18n.language || 'en';

  const handleSubmit = async (data: ContactFormData) => {
    await fetch('/api/submit-contact-form', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    });
    router.push(locale === 'en' ? '/thanks' : `/${locale}/thanks`);
  };

  return (
    <>
      <Header />
      <ContactMe onSubmit={handleSubmit} />
    </>
  );
};

export default Contact;
