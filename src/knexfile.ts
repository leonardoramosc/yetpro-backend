const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });

interface knexConfig {
  [propName: string]: any;
}

const config: knexConfig = {
  development: {
    client: 'postgresql',
    connection: process.env.DB_URI,
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    migrations: {
      directory: './migrations',
      extension: 'ts',
      tableName: 'knex_migrations',
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      extension: 'ts',
      tableName: 'knex_migrations',
    }
  }
}

export default config;
