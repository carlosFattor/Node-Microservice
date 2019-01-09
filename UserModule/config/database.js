const mongoose = require('mongoose')
const logger = require('../app/services/logger')

class Database {

  constructor(config) {
    this._connect(config)
  }

  _connect(config) {
    const URI = `mongodb://${config.db.host}/${config.db.name}`
    mongoose.connect(URI, {
      useNewUrlParser: true
    })
      .then(() => {
        logger.info('Database connection successful')
      })
      .catch(err => {
        logger.warn(`Database connection error: ${err.message}`)
      })
    mongoose.set('debug', config.db.mongoDebug)
  }
}


module.exports = (config) => {
  new Database(config)
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Closed connection with app ended')
      process.exit(0)
    })
  })
}
