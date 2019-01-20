const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');

const api = {};

module.exports = (app) => {
  api.verifyVersion = (req, res) => {
    res.status(HttpStatus.OK).json({
      version: '1.0-snapshot'
    });
  };
  
  api.verifyToken = (req, res, next) => {
    console.log('Verificando token?!');
    next();
    // let token = req.headers['x-access-token'];
    // if (token) {
    //     jwt.verify(token.split(" ")[1], app.get('secret'), (error, decoded) => {
    //         if (error) {
    //             logger.warn('Token reject => ' + token);
    //             return res.sendStatus(401);
    //         }
    //         req.user = decoded;
    //         next();
    //     });
    // } else {
    //     logger.error("Token rejected not found");
    //     return res.sendStatus(401).end();
    // }
  };

  return Object.assign({}, api);
};
