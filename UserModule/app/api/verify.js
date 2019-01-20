const HttpStatus = require('http-status-codes');

const api = {};

api.verifyVersion = (req, res) => {
  res.status(HttpStatus.OK).json({
    version: 'v1'
  });
};

module.exports = Object.assign({}, api);
