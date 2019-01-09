'use strict';

var _customExpress = require('./config/custom-express');

var _customExpress2 = _interopRequireDefault(_customExpress);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

_customExpress2.default.listen(_config2.default.app.port, function () {
  console.log('Server runing in PORT:' + _config2.default.app.port);
});
//# sourceMappingURL=index.js.map