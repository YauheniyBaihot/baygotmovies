import {Button, Stack, Text, TextInput, Textarea, Title} from '@mantine/core';
import {hasLength, isEmail, useForm} from '@mantine/form';
import {Trans, useTranslation} from 'next-i18next';
import {FC, useState} from 'react';

import {EmailMe} from '@/components/email-me/EmailMe';
import {SocialLinks} from '@/components/social-links/SocialLinks';

import styles from './ContactMe.module.css';

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export const ContactMe: FC<{
  onSubmit: (data: ContactFormData) => Promise<void>;
}> = ({onSubmit}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const {onSubmit: formOnSubmit, getInputProps} = useForm<ContactFormData>({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: hasLength({min: 2}, t('contactMePage.nameValidationMessage')),
      email: isEmail(t('contactMePage.emailValidationMessage')),
      message: hasLength({max: 4000}, t('contactMePage.messageValidationMessage')),
    },
  });

  const handleSubmit = async (values: ContactFormData) => {
    setLoading(true);
    await onSubmit(values);
    setLoading(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <Stack>
          <Title order={3} ff="text">
            <Trans t={t} i18nKey="contactMePage.title" components={{1: <br />}} />
          </Title>

          <form onSubmit={formOnSubmit(handleSubmit)}>
            <Stack>
              <Title order={3}>{t('contactMePage.subTitle')}</Title>
              <TextInput {...getInputProps('name')} className={styles.input} size="md" variant="unstyled" radius={0} placeholder={`${t('contactMePage.name')}*`} />
              <TextInput {...getInputProps('email')} className={styles.input} size="md" variant="unstyled" radius={0} placeholder={`${t('contactMePage.email')}*`} />
              <Textarea {...getInputProps('message')} className={styles.input} size="md" variant="unstyled" radius={0} placeholder={`${t('contactMePage.message')}`} />
              <Text>{t('contactMePage.requiredFields')}</Text>
              <Button type="submit" loading={loading}>
                {t('contactMePage.submit')}
              </Button>
            </Stack>
          </form>
        </Stack>
        <div className={styles.secondSection}>
          <Text c="main-grey">
            <Trans t={t} i18nKey="contactMePage.secondTitle" components={{1: <br />}} />
          </Text>
          <Stack gap="sm" mt="xl">
            <Title order={3}>{t('contactMe')}</Title>
            <SocialLinks />
            <EmailMe color="main-grey" />
          </Stack>
        </div>
      </div>
    </div>
  );
};
