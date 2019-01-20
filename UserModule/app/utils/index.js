const Roles = require('../models/Roles');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = 'd6F3Efeq';
const moment = require('moment');
const formatType = 'DD/MM/YYYY';

function _formatAnsware(user, secret) {
  console.log(user);
  const simpleUser = user.profile;
  const token = user.generateJWT(secret, 20000);
  const refreshToken = user.generateJWT(secret, 86000);

  if (user.profile.roles.includes(Roles.ADMIN)) {
    simpleUser.redirect = 'dashboard';
    return {
      token,
      refreshToken,
      user: simpleUser,
      isAdmin: true
    };
  } else if (user.profile.roles.includes(Roles.GOOD)) {
    simpleUser.redirect = 'goodDashboard';
    return {
      token: token,
      refreshToken,
      user: simpleUser,
      isAdmin: true
    };
  } else {
    return {
      redirect: 'userDashboard',
      user: simpleUser,
      token: token,
      refreshToken
    };
  }
}

function _tokenValidate(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token.split(' ')[1], secret, (error, decoded) => {
      if (error) {
        reject(undefined);
      }
      resolve(decoded);
    });
  });
}

function _createToken(params) {
  params.validate = moment().add('1', 'days').format(formatType);
  var cipher = crypto.createCipher(algorithm, password);
  var crypted = cipher.update(JSON.stringify(params), 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function _validateToken(token) {
  const decipher = crypto.createDecipher(algorithm, password);
  let params = decipher.update(token, 'hex', 'utf8');
  params += decipher.final('utf8');
  params = JSON.parse(params);
  const validate = moment(params.validate, formatType);

  if (moment().isAfter(validate)) {
    return null;
  }
  return params;
}
module.exports = {
  formatAnsware: _formatAnsware,
  tokenValidate: _tokenValidate,
  createToken: _createToken,
  validateToken: _validateToken
};