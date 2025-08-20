const winston = require('winston');

// Создаем простой логгер для разработки
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Stream для Morgan
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

module.exports = { logger };
