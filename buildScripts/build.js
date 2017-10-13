/* eslint-disable no-console */

import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log(chalk.green('Generating minified bundle for production. This will take a moment...'))

webpack(webpackConfig).run((err, stats) => {
  if (err) {// Fatal error occured!!!
    console.log(chalk.red(err))
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalk.red(error)))
  }

  if (jsonStats.hasErrors) {
    console.log(chalk.yellow('Webpack generated the following warnings: '))
    return jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)))
  }

  console.log(`Webpack stats: ${stats}`);

  console.log(chalk.green('Your app has been build for production and written to dist/!'));

  return 0;
})
