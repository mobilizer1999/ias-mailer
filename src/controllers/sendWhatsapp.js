const twilio = require('twilio');
const Boom = require('boom');

const env = require('../env');
const { MailerLogsModel } = require('../models');

module.exports = async (req, res, next) => {
  const {
    to, body, apiKey,
  } = req.body;

  try {
    if (!to || !body || !req.body.module) {
      return next(Boom.badRequest('Invalid params'));
    }

    const client = twilio(env.twilio.accountSid, env.twilio.authToken);
    let sendTo = `whatsapp:${req.body.to}`;
    if (to.indexOf('+', 0) === -1) {
      sendTo = `whatsapp:+${to}`;
    }
    const messageResponse = await client.messages.create({
      body,
      from: 'whatsapp:+14155238886',
      to: sendTo,
    });
    const userData = req.body.decodedUser;
    const newLog = {
      apiKey,
      module: req.body.module,
      userId: userData.id,
      sendTo: to,
      body,
    };
    const smsLog = await MailerLogsModel.create(newLog);
    if (!smsLog) {
      return next(Boom.badRequest('INTERNAL_SERVER_ERROR'));
    }
    if (messageResponse.errorCode || messageResponse.errorMessage) {
      return next(Boom.badRequest(messageResponse.message || 'INTERNAL_SERVER_ERROR'));
    }
    req.session.data = { message: 'MESSAGE_SENT' };
    return next();
  } catch (error) {
    return next(Boom.badRequest(error.message));
  }
};
