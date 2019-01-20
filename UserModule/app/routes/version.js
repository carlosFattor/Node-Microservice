const HTTP = require('http-status-codes');

module.exports = (app) => {
  const api = app.api.verify;

  app.get('/api/v1/user-service/version', api.verifyVersion);

  app.get('/api/user-service/health', (req, res) => {
    res.send(HTTP.OK);
  });
};
