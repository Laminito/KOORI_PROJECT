    const { Client } = require('pg');

    const client = new Client({
        user: "root",
        host: "172.17.0.1:",
        database: "petaaw",
        password: "root",
        port: 5432,
    });

    client.connect()
        .then(() => console.log('connected'))
        .catch(err => console.error('connection error', err.stack))


    module.exports = client;