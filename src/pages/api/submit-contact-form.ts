import type {NextApiRequest, NextApiResponse} from 'next';
import {md} from 'telegram-escape';

import {ContactFormData} from '@/components/contact-me/ContactMe';

const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data: ContactFormData = req.body;

  // noinspection SuspiciousTypeOfGuard
  const isValidName = typeof data.name === 'string' && data.name.length > 2 && data.name.length < 50;
  const isValidEmail = emailRegex.test(data.email);
  // noinspection SuspiciousTypeOfGuard
  const isValidMessage = data.message === undefined || (typeof data.name === 'string' && data.message.length < 4000);

  res.status(200).json({status: 'ok'});

  if (!isValidEmail || !isValidMessage || !isValidName) {
    console.log('Invalid message');
    return;
  }

  const botApiKey = process.env.TELEGRAM_BOT_API_KEY; // '6157132338:AAF7zFsL7kjt0A4xMktMOMzwYIk313qUMMY';
  const chatId = process.env.TELEGRAM_CHAT_ID; // '-1002316893963';
  const message = encodeURIComponent(
    `\`Name\`: ${md`${data.name}`}
\`Email\`: ${md`${data.email}`}
\`Message\`: ${md`${data.message}`}`
  );

  await fetch(`https://api.telegram.org/bot${botApiKey}/sendMessage?chat_id=${chatId}&text=${message}&parse_mode=MarkdownV2`);
};

export default handler;
