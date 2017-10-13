import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', (req, res) => {
  console.log('res', res);
});


app.listen(port, (err) => {
  if (err) {
    console.log(err)
  }
});
