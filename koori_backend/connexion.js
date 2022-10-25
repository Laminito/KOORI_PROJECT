// import { Client } from 'pg';

const { Client } = require('pg');

const client = new Client({
    user: "root",
    host: "petaaw_postgres_db_1",
    database: "petaaw",
    password: "root",
    port: 5432,
});

client.connect()
    .then(() => console.log('connected'))
    .catch(err => console.error('connection error', err.stack))




// const { Client } = require('pg');
// const client = new Client({
//     user: 'koori',
//     host: 'postgres_db',
//     database: 'koori',
//     password: 'koori',
//     port: 5432,
// });

// client.connect()
//     .then(() => console.log('connected'))
//     .catch(err => console.error('connection error', err.stack))