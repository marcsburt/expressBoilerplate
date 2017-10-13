import express from 'express';
import compression from 'compression';
import chalk from 'chalk';
import mongoose from 'mongoose';
import appConfig from '../src/config';

/* eslint-disable no-console */
process.env.NODE_ENV = 'production';

const port = 3000;
const app = express();
mongoose.connect(appConfig.dbUri);

app.use(compression());
app.use(express.static('dist'));

app.listen(port, (err) => {
  if (err) {
    console.log(chalk.red(err))
  }
});
