// app logger file 
var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: './log/' + 'debug.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: './log/' + '/exceptions.log', json: false })
  ],
  exitOnError: false
});
// Set log levels 
logger.setLevels({debug:0, info: 1, silly:2, warn: 3, error:4});

module.exports = logger;