const Sequelize = require('sequelize');
const config = require('../env');

const sequelize = new Sequelize(config.mysql.database,
  config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    logging: false,
    dialect: config.mysql.dialect,
    operatorsAliases: false,
  });

sequelize.getModules = () => new Promise((resolve) => {
  sequelize.query('SELECT * from mailer_addresses').spread((results) => {
    resolve(results);
  });
});

module.exports = sequelize;
