import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/app')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    //
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      liveReload: true
    }),
    new LiveReloadPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
    ]
  }
}
