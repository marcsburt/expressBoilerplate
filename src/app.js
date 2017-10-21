import mongoose from 'mongoose';

import config from './config/config';
import app from './config/express';

/* eslint-disable no-console */

// from config
const port = config.port;
//build mongoURI from config
const mongo = config.mongo;

const mongoURI = `mongodb://${mongo.user}:${mongo.pass}@${mongo.ip}:${mongo.port}/${mongo.db}`

// mongoose.set('debug', true);
mongoose.Promise = require('bluebird'); // use bluebird to return promises from request
mongoose.connect('mongodb://database/mean-docker', {
  useMongoClient: true,
});

console.log(mongoose);

// !module.parent to make tests work in watch mode.
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
