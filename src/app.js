const express = require('express');
const debug = require('debug')('dev');
const bugsnag = require('@bugsnag/js');
const bugsnagExpress = require('@bugsnag/plugin-express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser');
const { ExpressMiddlewares } = require('ias-utils');

const env = require('./env');
const appConfig = require('./lib/AppConfig');
const { sequelize } = require('../src/models/index');
const sendRoutes = require('./routes/send');

const app = express();

const sessionStore = new SequelizeStore({
  db: sequelize,
});

const bugsnagClient = bugsnag('407b56310ae38dc41e813a12f0d99e12');
bugsnagClient.use(bugsnagExpress);
const bugsnagMiddleware = bugsnagClient.getPlugin('express');

app.use(bugsnagMiddleware.requestHandler);
app.use(ExpressMiddlewares.logData(env));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(ExpressMiddlewares.bootstrap);
app.use(ExpressMiddlewares.defaultErrorMiddleware);
app.use(ExpressMiddlewares.xhrErrorMiddleware);
app.use(session({
  store: sessionStore,
  secret: 'MYSECRETISVERYSECRET',
  resave: false,
  saveUninitialized: false,
}));

app.use('/send', sendRoutes);

app.use(appConfig.handleError);
app.use(appConfig.handleSuccess);
app.use(appConfig.handle404);
app.use(bugsnagMiddleware.errorHandler);

// Catch uncaught exceptions
process.on('uncaughtException', (error) => {
  debug('Inside uncaughtException', error);
  return error;
});

module.exports = app;
