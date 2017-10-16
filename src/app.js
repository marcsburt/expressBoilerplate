import appConfig from './local.env';
import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import chalk from 'chalk';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './api';
import cors from 'cors';
import helmet from 'helmet';

// import http from 'http';

/* eslint-disable no-console */

const port = appConfig.port;
const app = express();
const compiler = webpack(config);
mongoose.set('debug', true);
mongoose.Promise = require('bluebird');
mongoose.connect(appConfig.dbUri, {
  useMongoClient: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(helmet());

app.use(cors());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use('/api', routes);


if (!module.parent) {
  app.listen(port, (err) => {
    if (err) {
      console.log(chalk.red(err));
    } else {
      console.log(chalk.green(`APP STARTED ON PORT ${port}`));
    }
  });
}

export default app;
