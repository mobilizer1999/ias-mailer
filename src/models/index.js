/* eslint-disable global-require */
const Sequelize = require('sequelize');
const debug = require('debug')('dev');
const { logger: Logger } = require('ias-utils');
const MailerCredentials = require('./mailer-credentials');
const MailerLogs = require('./mailer-logs');
const env = require('./../env');

const logger = Logger({
  LOGLEVEL: env.logLevel,
});
const {
  user, password, database, host, dialect,
} = env.mysql;
const sequelizeConf = new Sequelize(
  {
    username: user,
    password,
    database,
    host,
    dialect,
    logging: (msg) => { logger.debug(msg); },
  },
);

const models = {
  sequelize: sequelizeConf,
  MailerCredentialsModel: MailerCredentials(sequelizeConf, Sequelize),
  MailerLogsModel: MailerLogs(sequelizeConf, Sequelize),
};

sequelizeConf.authenticate()
  .then(() => {
    sequelizeConf.sync({ alter: true })
      .then(async () => {
        debug('Database & Tables Initiated Successfully.');
        // DB changes script
        require('../lib/db');
      }).catch((error) => {
        debug('Database & Tables Not Initiated.', error);
      });
  })
  .catch((error) => {
    debug('Database Not Authenticated.', error);
  });


module.exports = models;
