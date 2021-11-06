import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
const environment = process.env.NODE_ENV || 'development';
import config from '../knexfile';
const environmentConfig = config[environment];
import knex from 'knex';
const db = knex(environmentConfig);

export default db;