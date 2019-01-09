const model = require('../models/User')
const Roles = require('../models/Roles')
const logger = require('../services/logger')
const jwt = require('jsonwebtoken')
const http = require('http-status-codes')

const api = {}

module.exports = (app) => {
  api.authentication = async (req, res) => {
    try {
      req.assert('email', 'Email is not valid').isEmail()
      req.assert('password', 'Password cannot be blank').notEmpty()
      const resutl = await req.getValidationResult()
      if (!resutl.isEmpty()) res.status(http.UNAUTHORIZED)

      const query = {
        email: req.body.email
      }
      const user = await model.findOne(query)
      if (!user) {
        logger.warn('login not found => ' + JSON.stringify(req.body.email))
        throw Error('general.emailNotFound')
      }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (error || !isMatch) {
          logger.warn('password\'s not the same => ' + JSON.stringify(req.body.password))
          return res.status(http.UNAUTHORIZED).json({
            msg: 'password\'s not the same'
          })
        }
        const result = _formatAnsware(user, app)

        logger.info('User loged => ' + req.body.email)

        res.status(http.ACCEPTED).json(result)
      })
    } catch (error) {
      res.status(http.UNAUTHORIZED).json({
        msg: error.message
      })
    }
  }

  api.teste = async (req, res) => {
    res.status(200).json({teste: 'teste'})
  }

  return Object.assign({}, api)
}

function _formatAnsware(user, app) {
  const simpleUser = user.simpleUser(user)
  const token = _generateToken(user, app, 20000)
  const refreshToken = _generateToken(user, app, 86000)

  if (user.roles.includes(Roles.ADMIN)) {
    simpleUser.redirect = 'dashboard'
    return {
      token,
      refreshToken,
      user: simpleUser,
      isAdmin: true
    }
  } else if (user.roles.includes(Roles.GOOD)) {
    simpleUser.redirect = 'goodDashboard'
    return {
      token: token,
      refreshToken,
      user: simpleUser,
      isAdmin: true
    }
  } else {
    return {
      redirect: 'userDashboard',
      user: simpleUser,
      token: token,
      refreshToken
    }
  }
}

function _generateToken(user, app, expiresIn) {
  return jwt.sign({
    _id: user._id,
    email: user.email,
    accountId: user.accountId,
    role: user.role
  }, app.get('secret'), {
    expiresIn: expiresIn
  })
}
