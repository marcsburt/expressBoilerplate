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
  NODE_PORT: Joi.number()
    .default(3000),
  JWT_SECRET: Joi.string()
    .description('JWT Secret required to sign'),
  MONGODB_PORT: Joi.number()
    .default(27017),
  MONGODB_USERNAME: Joi.string().required()
    .description('Mongo DB username'),
  MONGODB_PASSWORD: Joi.string().required()
    .description('Mongo DB password'),
  MONGODB_IP: Joi.string()
    .default('127.0.0.1'),
  MONGODB_DBNAME: Joi.string()
    .default('boilerplate'),
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
  port: envVars.NODE_PORT,
  // mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    user: envVars.MONGODB_USERNAME,
    pass: envVars.MONGODB_PASSWORD,
    port: envVars.MONGODB_PORT,
    db: envVars.MONGODB_DBNAME,
    role: envVars.MONGODB_ROLE,
    ip: envVars.MONGODB_IP,
  }
};

export default config;
