/* eslint-disable no-console */

import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import helmet from 'helmet';
import routes from '../api';
import winstonInstance from './winston';
import APIError from './APIerror';
import config from './config';
// from config


const currentEnv = config.env;

const app = express();

if (currentEnv === 'development') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());
app.use(helmet()); //secure app by setting various HTTP headers
app.use(cors()); //enable Cross Origin Resource Sharing

// enable detailed API logging in dev env
if (currentEnv === 'development') {
  /* uncomment for more detailed request and response logs */
  // expressWinston.requestWhitelist.push('body');
  // expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true,
    msg: `HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms`,
    colorStatus: true
  }));
}

app.use('/api', routes);

// log error in winston transports
app.use(expressWinston.errorLogger({
  winstonInstance
}));

app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

//catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});



// error handler, send stacktrace only during development
if (currentEnv === 'development') {
  app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
    res.status(err.status).json({
      message: err.isPublic ? err.message : httpStatus[err.status],
      stack: config.env === 'development' ? err.stack : {}
    })
  );
}



export default app;
