/* eslint-disable no-console */

import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';
import chalkLine from 'chalkline';

process.env.NODE_ENV = 'production'; // set env to production

// minify and bundle
console.log(chalk.green('Generating minified bundle for production. This will take a moment...'))

// runs build for production
webpack(webpackConfig).run((err, stats) => {
  // Fatal error occured
  if (err) {
    chalkLine.red();
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStats = stats.toJson();

  // display errors
  if (jsonStats.hasErrors) {

    return jsonStats.errors.map(error => {
      chalkLine.red();
      console.log(chalk.red(error))
      chalkLine.red();
    })
  }

  // display warnings
  if (jsonStats.hadWarnings) {
    chalkLine.yellow();
    console.log(chalk.yellow('Webpack generated the following warnings: '))
    return jsonStats.warnings.map(warning => {
      console.log(chalk.yellow(warning))
      chalkLine.yellow();
    })
  }

  // all good, display stats, return 0;
  chalkLine.green();
  console.log(`Webpack stats: ${stats}`);
  console.log(chalk.green('Your app has been build for production and written to ./dist'));
  chalkLine.green();

  return 0;
})
