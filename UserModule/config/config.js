require('dotenv').load()
const env = process.env.NODE_ENV

const development = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT),
    secret: process.env.DEV_APP_SECRET,
    host: process.env.DEV_HOST
  },
  db: {
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    host: process.env.DEV_DB_HOST,
    mongoDebug: process.env.DEV_DB_DEBUGGER,
    name: process.env.DEV_DB_NAME
  }
}

const production = {
  app: {
    port: parseInt(process.env.PROD_APP_PORT),
    secret: process.env.PROD_APP_SECRET,
    host: process.env.PROD_HOST
  },
  db: {
    user: process.env.PROD_DB_USER,
    password: process.PROD_DB_PASSWORD,
    host: process.env.PROD_DB_HOST,
    mongoDebug: process.env.PROD_DB_DEBUGGER,
    name: process.env.PROD_DB_NAME
  }
}

const config = {
  development,
  production
}

module.exports = config[env]
