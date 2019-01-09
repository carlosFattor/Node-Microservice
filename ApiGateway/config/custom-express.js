const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const expressStatusMonitor = require('express-status-monitor')
const compression = require('compression')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

module.exports = () => {

  app.use(helmet())
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.use(morgan('common', {
    stream: {
      write: (message) => {
        // logger.info('request=> ' + message);
      }
    }
  }))
  app.use(cors())
  app.use(express.static('./public'))
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(expressValidator())
  app.use(expressStatusMonitor())
  app.use(compression())
  app.use(bodyParser.json())
  app.set('secret', 'Gu14t0An4lyt1cs')

  consign({
    cwd: 'app'
  })
    .include('models')
    .then('consul')
    .then('api')
    .then('routes/auth.js')
    .then('routes')
    .into(app)

  return app
}