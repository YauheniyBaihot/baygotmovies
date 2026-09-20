import {NextRequest, NextResponse} from 'next/server';
import {md} from 'telegram-escape';

import {ContactFormData} from '@/components/contact-me/ContactMe';

const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

export async function POST(req: NextRequest) {
  try {
    const data: ContactFormData = await req.json();

    // noinspection SuspiciousTypeOfGuard
    const isValidName = typeof data.name === 'string' && data.name.length > 2 && data.name.length < 50;
    const isValidEmail = emailRegex.test(data.email);
    // noinspection SuspiciousTypeOfGuard
    const isValidMessage = data.message === undefined || (typeof data.name === 'string' && data.message.length < 4000);

    if (!isValidEmail || !isValidMessage || !isValidName) {
      console.log('Invalid message');
      return NextResponse.json({error: 'Invalid message'}, {status: 400});
    }

    const botApiKey = process.env.TELEGRAM_BOT_API_KEY;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const message = encodeURIComponent(
      `\`Name\`: ${md`${data.name}`}
\`Email\`: ${md`${data.email}`}
\`Message\`: ${md`${data.message}`}`
    );

    const url = `https://api.telegram.org/bot${botApiKey}/sendMessage?chat_id=${chatId}&text=${message}&parse_mode=MarkdownV2`;

    console.log('New contact request', JSON.stringify(data));
    console.log('Url', url);
    const response = await fetch(url);

    console.log(response.status);

    return NextResponse.json({status: 'ok'});
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}
