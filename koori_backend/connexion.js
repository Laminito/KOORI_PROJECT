import { Client } from 'pg';

const client = new Client({
    user: "root",
    host: '172.21.0.1',
    password: "root",
    database: "root",
    port: 5432,
});

client.connect()
    .then(() => console.log('connected'))
    .catch(err => console.error('connection error', err.stack))