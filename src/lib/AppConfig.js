const debug = require('debug')('ias-mailer:appconfig');

const url = (req) => `${req.protocol}://${req.get('host')}`;

exports.handleSuccess = (req, res, next) => {
  if (req.session.data === undefined) {
    debug('Return from undefined req.session.data ');
    return next();
  }
  const resObject = req.session.data || [];
  req.session = null;
  return res.json(resObject);
};

exports.handle404 = (req, res, next) => {
  const api = /send/;
  debug('handle404 :: ', api.test(req.path));
  if (api.test(req.path) === true) {
    res.status(404).send(`Invalid request ${url(req)}${req.url}`);
  }
  return next();
};

exports.handleError = (err, req, res, next) => {
  if (!err) {
    return next();
  }
  const errorResponse = {
    error: { stack: err.message, ...(err.output && err.output.payload ? err.output.payload : err) },
  };
  debug('Error stack :: ');
  debug(err.stack);
  const statusCode = err.output && err.output.statusCode ? err.output.statusCode : 500;
  return res.status(statusCode).json(errorResponse);
};
