import path from 'path';
import webpack from 'webpack';

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  browser: {
    vertex: false
  },
  // node: {
  //   fs: 'empty'
  // },
  entry: [
    path.resolve(__dirname, 'src/app')
  ],
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js',
    libraryTarget: 'commonjs'
  },
  externals: [
    /^(?!\.|\/).+/i
  ],
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
    new webpack.IgnorePlugin(/fsevents/),
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.json$/, loader: "json-loader" }
    ]
  }
}
