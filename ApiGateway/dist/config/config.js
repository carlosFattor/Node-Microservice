'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();
var env = process.env.NODE_ENV;

var development = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT),
    secret: process.env.DEV_APP_SECRET
  }
};

var production = {
  app: {
    port: parseInt(process.env.PROD_APP_PORT)
  }
};

var config = {
  development: development,
  production: production
};

exports.default = config[env];
//# sourceMappingURL=config.js.map