import path from 'path';
import webpack from 'webpack';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    main: path.resolve(__dirname, 'src/app'),
    vendor: path.resolve(__dirname, 'src/vendor')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),
    // Hash files using MD5 so that thier name changes when content changes
    new WebpackMd5Hash(),
    // Use CommonsChunkPlugin to create a seperate bundle if vendor libs so that they're cached seperately
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // // Create HTML file that includes referecnce to bundled JS.
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeStyleLinkTypeAttributes: true,
    //     keepClosingSlash: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true
    //   },
    //   // Property you define here will be available in index.html using htmlWebPackPlugin.options.varName
    //   trackJSToken: 'TRACKJSTOKEN'
    // }),
    new webpack.optimize.DedupePlugin(), // Eliminate duplicate packages when generating bundle
    new webpack.optimize.UglifyJsPlugin(), // Minify JS

  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap') }
    ]
  }
}
