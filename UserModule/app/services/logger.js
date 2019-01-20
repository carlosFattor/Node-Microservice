const winston = require('winston');
const fs = require('fs');

if(!fs.existsSync('logs')){
  fs.mkdirSync('logs');
}

module.exports = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      name: 'info',
      filename: 'logs/user-info.log',
      timestamp: true,
      colorize: true,
      maxSize: 10000,
      maxFiles: 10
    },
    {
      level: 'warn',
      name: 'warn',
      filename: 'logs/user-warning.log',
      timestamp: true,
      colorize: true,
      maxSize: 10000,
      maxFiles: 10
    },
    {
      level: 'error',
      name: 'error',
      filename: 'logs/user-error.log',
      timestamp: true,
      colorize: true,
      maxSize: 10000,
      maxFiles: 10
    })
  ],
  exitOnError: false
});
