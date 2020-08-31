const debug = require('debug')('ias-mailer:server');
const http = require('http');
const { logger: Logger, DBHelper } = require('ias-utils');
const app = require('./src/app');
const env = require('./src/env');

const logger = Logger({
  LOGLEVEL: env.logLevel,
});

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const port = normalizePort(process.env.PORT || '3001');
const server = http.createServer(app);
app.set('port', port);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  logger.info(`ias-mailer module listening on port: TCP ${port}`);
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.stdout.write('Port is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

Promise.all([DBHelper.canConnect(env.mysql)])
  .then(() => {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  })
  .catch((err) => {
    logger.error(`Could not start ias-mailer module: ${err.info}`);
    process.exit();
  });
