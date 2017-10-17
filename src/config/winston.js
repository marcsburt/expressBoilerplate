import winston from 'winston';
import config from './config';
import path from 'path';

let transports = []

if (config.env === 'development') {
  transports.push(new winston.transports.Console({
    json: true,
    colorize: true
  }))
}

if (config.env === 'production') {
  transports.push(new winston.transports.File({
    filename: path.resolve(__dirname, '../../info.log'),
    json: true
  }))
}

const logger = new winston.Logger({
  transports
})



export default logger;
