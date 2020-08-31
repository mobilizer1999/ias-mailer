const nodemailer = require('nodemailer');
const env = require('../env');

const smtpTransport = nodemailer.createTransport({
  service: env.smtp.service,
  host: env.smtp.host,
  secure: env.smtp.secure,
  port: env.smtp.port,
  auth: {
    user: env.smtp.user,
    pass: env.smtp.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  smtpTransport,
};
