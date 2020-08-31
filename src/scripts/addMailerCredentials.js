const randomize = require('randomatic');
const { MailerCredentialsModel } = require('../models/');

async function init() {
  try {
    const isEmpty = await MailerCredentialsModel.findOne();
    if (isEmpty == null) {
      for (let i = 1; i <= 10; i += 1) {
        const mailerCredential = {
          apiKey: randomize('*', 50),
          apiPass: randomize('*', 20),
          disabled: 0,
        };
        // eslint-disable-next-line no-await-in-loop
        await MailerCredentialsModel.create(mailerCredential);
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error during adding mailer credentials', error);
  }
}
init();
