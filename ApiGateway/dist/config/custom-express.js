'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _consign = require('consign');

var _consign2 = _interopRequireDefault(_consign);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _expressStatusMonitor = require('express-status-monitor');

var _expressStatusMonitor2 = _interopRequireDefault(_expressStatusMonitor);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

var app = (0, _express2.default)();

app.use(_helmet2.default);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((0, _cors2.default)());
app.use(_express2.default.static('./public'));
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.use((0, _expressValidator2.default)());
app.use((0, _expressStatusMonitor2.default)());
app.use((0, _compression2.default)());
app.use(_bodyParser2.default.json());
app.set('secret', _config2.default.app.DEV_APP_SECRET);

(0, _consign2.default)({
  cwd: app
});

exports.default = app;
//# sourceMappingURL=custom-express.js.map