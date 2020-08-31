const APP_CONSTANTS = require('../constants/AppConstants');

const MailerLogs = (sequelize, DataTypes) => {
  const MailerLog = sequelize.define(APP_CONSTANTS.TABLES.MAILER_LOGS, {
    apiKey: DataTypes.STRING,
    module: DataTypes.STRING,
    userId: DataTypes.STRING,
    sendTo: DataTypes.STRING,
    subject: DataTypes.STRING,
    body: DataTypes.STRING,
  }, {});

  return MailerLog;
};

module.exports = MailerLogs;
