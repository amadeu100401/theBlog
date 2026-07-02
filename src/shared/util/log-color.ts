import { styleText } from 'util';

const environment = process.env.ENVIRONMENT;

export function logColor(...msg: (string | number)[]) {
  if (environment !== 'DEV') {
    return;
  }

  const messages = msg
    .map(message => styleText(['bgGreen', 'whiteBright'], `${message}`))
    .join(' ');

  console.log(styleText('green', messages));
}
