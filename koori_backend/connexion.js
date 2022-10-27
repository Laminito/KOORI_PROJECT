<<<<<<< HEAD
const { Client } = require('pg');

const client = new Client({
    user: "root",
    host: "172.17.0.1:",
    database: "petaaw",
    password: "root",
=======
import { Client } from 'pg';

const client = new Client({
    user: "root",
    host: '172.21.0.1',
    password: "root",
    database: "root",
>>>>>>> e83f12046cab025fe45318f87acd97704f3a3c6d
    port: 5432,
});

client.connect()
    .then(() => console.log('connected'))
    .catch(err => console.error('connection error', err.stack))