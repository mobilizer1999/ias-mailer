/* eslint-disable consistent-return */
const Boom = require('boom');
const { MailerCredentialsModel } = require('../../models/');

module.exports = async (req, res, next) => {
  try {
    const { apiKey, apiPass } = req.body;
    if (!apiKey || !apiPass) {
      return next(Boom.unauthorized('Invalid apiKey or apiPass'));
    }
    const filter = {
      apiKey, apiPass,
    };
    const mailerCred = await MailerCredentialsModel.findOne({
      where: filter,
    });
    if (!mailerCred) {
      return next(Boom.unauthorized('Unauthorized User'));
    }
    req.body.decodedUser = mailerCred.dataValues;
    return next();
  } catch (error) {
    return next(error);
  }
};
