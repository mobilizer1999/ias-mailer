const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  const envFileName = process.env.NODE_ENV ? `.${process.env.NODE_ENV.trim()}` : '';
  dotenv.config({ path: path.resolve(__dirname, `../config/.env${envFileName}`) });
}

const env = {
  nodeEnv: process.env.NODE_ENV,
  defaultEmail: process.env.DEFAULT_EMAIL,
  api: {
    key: process.env.API_KEY,
    pass: process.env.API_PASS,
  },
  mysql: {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: process.env.DEVELOPMENT_DIALECT,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    secure: process.env.SMTP_SECURE,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNTSID,
    authToken: process.env.TWILIO_AUTHTOKEN,
    phoneNumber: process.env.TWILIO_PHONENUMBER,
    countryCode: process.env.TWILIO_COUNTRYCODE,
  },
};

module.exports = env;
