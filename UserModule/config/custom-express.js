const config = require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const expressStatusMonitor = require('express-status-monitor')
const compression = require('compression')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('./database')
const consign = require('consign')
const logger = require('../app/services/logger')

const app = express()

module.exports = () => {

  app.use(helmet())
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.use(morgan('common', {
    stream: {
      write: (message) => {
        logger.info('request=> ' + message)
      }
    }
  }))
  app.use(cors())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(expressValidator())
  app.use(expressStatusMonitor())
  app.use(compression())
  app.use(bodyParser.json())
  app.set('secret', 'Gu14t0An4lyt1cs')

  mongoose(config)

  consign({
    cwd: 'app'
  })
    .include('consul')
    .then('api')
    .then('routes')
    .then('services')
    .into(app)

  return app
}
