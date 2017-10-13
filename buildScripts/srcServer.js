import appConfig from '../src/config';
import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import chalk from 'chalk';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

/* eslint-disable no-console */

process.env.NODE_ENV = 'development';

const port = 3000;
const app = express();
const compiler = webpack(config);
mongoose.connect(appConfig.dbUri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.listen(port, (err) => {
  if (err) {
    console.log(chalk.red(err))
  }
});
