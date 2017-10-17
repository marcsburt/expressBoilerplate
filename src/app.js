import mongoose from 'mongoose';
// import util from 'util';

import config from './config/config';
import app from './config/express';

/* eslint-disable no-console */

// from config
const port = config.port;
const mongoUri = config.mongo.host;

// mongoose.set('debug', true);
mongoose.Promise = require('bluebird'); // use bluebird to return promises from request
mongoose.connect(mongoUri, {
  useMongoClient: true,
});


if (!module.parent) {
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.info(`server started on port ${config.port} (${config.env})`)
    }
  });
}

export default app;
