const url = require('url');

function _formatResource(req, consul) {
  const service = req.path.split('/')[3];
  const URI = consul.getData(service);
  const URL = url.format({
    pathname: URI + req.path,
    query: req.query
  });
  return {
    URI,
    service,
    URL
  };
}

/*
 * handler services unavaliable
 */
function _serviceUnavaliable(res, service) {
  return res.status(404).json({
    info: `service ${service} temporarily unavailable`
  });
}

module.exports = {
  formatResource: _formatResource,
  serviceUnavaliable: _serviceUnavaliable
};