const Boom = require('boom');
const Regex = require('regex-email');

const { smtpTransport } = require('../helpers/mailer');
const { MailerLogsModel } = require('../models/');
const env = require('../env');

module.exports = async (req, res, next) => {
  try {
    const {
      sendto, subject, emailbody, apiKey,
    } = req.body;

    const userData = req.body.decodedUser;
    if (!sendto || !subject || !emailbody || !req.body.module) {
      return next(Boom.badRequest('Invalid params'));
    }
    if (Regex.test(sendto) === false || ((sendto).length > 100)) {
      return next(Boom.badRequest('EMAIL_SEND_TO_MALFORMED'));
    }
    if ((subject).length > 150) {
      return next(Boom.badRequest('EMAIL_SUBJECT_FIELD_MALFORMED'));
    }
    if (!emailbody || (emailbody).length > 10000) {
      return next(Boom.badRequest('EMAIL_BODY_FIELD_MALFORMED'));
    }

    const helperOptions = {
      from: req.body.from
        ? `Panacea Wallet <${req.body.from}>`
        : env.defaultEmail,
      to: sendto,
      subject,
      html: emailbody,
      id: userData.id,
    };

    const sendmail = async () => new Promise((resolve, reject) => {
      smtpTransport.sendMail(helperOptions, (error) => {
        if (error) reject(error);
        resolve(true);
      });
    });
    await sendmail();
    const newLog = {
      apiKey,
      module: req.body.module,
      userId: helperOptions.id,
      sendTo: sendto,
      subject: helperOptions.subject,
      body: emailbody,
    };
    const emailLog = await MailerLogsModel.create(newLog);
    if (!emailLog) {
      return next(Boom.badData('Failed to add log!'));
    }
    req.session.data = { message: 'MESSAGE_SENT' };
    return next();
  } catch (error) {
    if (error) {
      return next(Boom.badRequest(error.message));
    }
    return next();
  }
};
