/* eslint-disable no-console */

import Joi from 'joi';
import chalk from 'chalk';

// load and configure dotenv.
// load vars in .env in proccess.env
require('dotenv').config();

// validation for all env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .default('development'),
  PORT: Joi.number()
    .default(3000),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017)
}).unknown()
  .required();

// check env vars
const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(chalk.red(`Config validation error ${error.message}`));
} else {
  console.log(chalk.green('Config validation succeeded'))
}

// make config for app to consume
const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  }
};

export default config;
