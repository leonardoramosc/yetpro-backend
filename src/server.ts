import dotenv from 'dotenv';
import app from './app';
import db from './db';

dotenv.config({ path: './config.env' });

// const pg = require('knex')({
//     client: 'pg',
//     connection: DB_URI,
//     debug: process.env.NODE_ENV === "development",
// })

// db('users').insert({first_name: 'leonardo', last_name: 'ramos', email: 'leo@gmail.com'}, "*").then(result => {
//     console.log('RECORD INSERTADO:');
//     console.log(result);
// })

const SERVER_PORT = process.env.SERVER_PORT || 8001;

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
})