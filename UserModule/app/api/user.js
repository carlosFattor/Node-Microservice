const HttpStatus = require('http-status-codes')
const model = require('../models/User')

const api = {}

api.verifyVersion = (req, res) => {
  res.status(HttpStatus.OK).json({
    version: 'v1'
  })
}

api.register = (req, res) => {

}

module.exports = Object.assign({}, api)
