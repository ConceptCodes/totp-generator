import * as twofactor from 'node-2fa';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { prompt } from 'enquirer';
import qr from 'qrcode-terminal';
import pjson from 'pjson';

const log = console.log;

/**
 * Ask Cli Questions
 * 
 * @returns {Promise<any>}
 */
async function askCliQuestions(): Promise<any> {
  const answers: any = await prompt([
    {
      type: 'input',
      name: 'name',
      message: "What's the name of your application?",
    },
    {
      type: 'input',
      name: 'account',
      message: "What's your username?",
    }
  ]);

  log(chalk.gray('\nApplication Name: ') + chalk.blueBright(answers.name));
  log(chalk.gray('        Username: ') + chalk.blueBright(answers.account));

  const askFinalConfirmation: any = await prompt({
    type: 'confirm',
    name: 'confirm',
    message: "Does this data look good?",
  });

  if (askFinalConfirmation.confirm) { return answers; }
  else { log('\n'); await askCliQuestions(); }
}

async function verifyTOTP(secret: string): Promise<void> {
  const verification: any = await prompt({
    type: 'password',
    name: 'totp',
    message: 'Enter your totp code here'
  });

  const delta = twofactor.verifyToken(secret, verification.totp);

  if (!delta) verifyTOTP(secret)
}

(async function () {
  // TODO: showcase the cli banner 
  clear();
  log(chalk.yellowBright(figlet.textSync('TOTP Generator', { horizontalLayout: 'full' })));
  log(chalk.blue('     Author: ') + chalk.green(pjson.author));
  log(chalk.blue('    Version: ') + chalk.green(pjson.version));
  log(chalk.blue('    License: ') + chalk.green(pjson.license));
  log(chalk.blue('Description: ') + chalk.green(pjson.description) + '\n');
  // TODO: ask user for their details 
  const { name, account } = await askCliQuestions();
  // TODO: generate the totp details
  const totpDetails = twofactor.generateSecret({ name, account });
  // TODO: display in the console 
  log(chalk.green(`🔐 -> ${totpDetails.secret}\n`))
  qr.generate(totpDetails.uri, { small: true });
  // TODO: ask user to verify the token
  await verifyTOTP(totpDetails.secret);
})();
