require('dotenv').load();
const env = process.env.NODE_ENV;

const development = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT),
    secret: process.env.DEV_APP_SECRET
  }
};

const production = {
  app: {
    port: parseInt(process.env.PROD_APP_PORT)
  }
};

const config = {
  development,
  production
};

module.exports = config[env];