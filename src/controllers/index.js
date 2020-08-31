const { ExpressMiddlewares } = require('ias-utils');
const healthCheck = require('./healthcheck');
const sendMail = require('./sendMail');
const sendSMS = require('./sendSMS');
const sendWhatsapp = require('./sendWhatsapp');

module.exports = {
  healthCheck: ExpressMiddlewares.asyncMiddleware(healthCheck),
  sendMail: ExpressMiddlewares.asyncMiddleware(sendMail),
  sendSMS: ExpressMiddlewares.asyncMiddleware(sendSMS),
  sendWhatsapp: ExpressMiddlewares.asyncMiddleware(sendWhatsapp),
};
