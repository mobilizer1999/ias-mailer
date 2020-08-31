const twilio = require('twilio');
const Boom = require('boom');
const env = require('../env');
const { MailerLogsModel } = require('../models/');


module.exports = async (req, res, next) => {
  const {
    to, body, apiKey, subject,
  } = req.body;

  try {
    if (!to || !body || !req.body.module) {
      return next(Boom.badRequest('Invalid params'));
    }

    let sendTo = to;
    if (to.indexOf('+', 0) === -1) {
      sendTo = `+${to}`;
    }

    const twilioClient = twilio(env.twilio.accountSid, env.twilio.authToken);
    const messageResponse = await twilioClient.messages.create({
      body,
      to: sendTo,
      from: env.twilio.phoneNumber,
    });
    const userData = req.body.decodedUser;
    const newLog = {
      apiKey,
      module: req.body.module,
      userId: userData.id,
      sendTo,
      body,
      subject,
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
    if (error) {
      return next(Boom.badRequest(error.message));
    }
    return next();
  }
};
