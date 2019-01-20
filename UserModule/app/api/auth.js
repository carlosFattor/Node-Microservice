const model = require('../models/User');
const logger = require('../services/logger');
const http = require('http-status-codes');
const mailer = require('../services/mailer.js');
const {
  formatAnsware,
  tokenValidate,
  createToken
} = require('../utils');

const api = {};

module.exports = (app) => {
  api.refreshToken = async (req, res) => {
    try {
      const token = req.headers['x-access-token'];
      const secret = app.get('secret');
      const payload = await tokenValidate(token, secret);
      const query = {
        email: payload.email
      };
      const user = await model.findOne(query);
      const response = {
        token: user.generateJWT(secret, 20000)
      };
  
      res.status(http.ACCEPTED).json(response);
      
    } catch (error) {
      res.status(http.UNAUTHORIZED).json({
        msg: error.message
      });
    }
  };

  api.authentication = async (req, res) => {
    try {
      req.assert('email', 'Email is not valid').isEmail();
      req.assert('password', 'Password cannot be blank').notEmpty();
      const resutl = await req.getValidationResult();

      if (!resutl.isEmpty()) return res.status(http.UNAUTHORIZED).end();

      const query = {
        email: req.body.email
      };
      const user = await model.findOne(query);
      if (!user) {
        logger.warn('login not found => ' + JSON.stringify(req.body.email));
        throw Error('general.emailNotFound');
      }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (error || !isMatch) {
          logger.warn('password\'s not the same => ' + JSON.stringify(req.body.password));
          return res.status(http.UNAUTHORIZED).json({
            msg: 'password\'s not the same'
          });
        }
        const result = formatAnsware(user, app.get('secret'));
        const refreshToken = result.refreshToken;
        delete result.refreshToken;

        logger.info('User loged => ' + req.body.email);

        res.set('refreshToken', refreshToken);
        res.status(http.ACCEPTED).json(result);
      });
    } catch (error) {
      res.status(http.UNAUTHORIZED).json({
        msg: error.message
      });
    }
  };

  api.recoverPassword = async (req, res) => {
    try {
      const query = { email: req.body.email };
      const user = await model.findOne(query);
      if (user) {
        const emailParams = {
          to: user.email,
          from: 'carlos.fattor@gmail.com',
          name: user.profile.firstName,
          title: 'Email recover'
        };
        const token = createToken(emailParams);
        const update = {tokens: [token]};
        await model.findOneAndUpdate(query, update, { new: false });
        emailParams.token = token;
        mailer.sendEmail2RecoverPassword(emailParams);
        logger.info('created token to user');
        return res.status(200).end();
        
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      res.status(http.NOT_FOUND).json({
        msg: error.message
      });
    }
  };

  return Object.assign({}, api);
};