const APP_CONSTANTS = require('../constants/AppConstants');


const MailerCredentials = (sequelize, DataTypes) => {
  const MailerCredential = sequelize.define(APP_CONSTANTS.TABLES.MAILER_CREDENTIALS, {
    apiKey: DataTypes.STRING,
    apiPass: DataTypes.STRING,
    disabled: DataTypes.BOOLEAN,
  }, {});

  return MailerCredential;
};

module.exports = MailerCredentials;
