const express = require('express');
// const sequelize = require('./util/database');
const server = express();
const apiRouter = require('./routes/apiRouter').router;
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session');
const User = require('./models/user');
// const Keycloak = require('keycloak-connect');
const memoryStore = new session.MemoryStore();
server.use(session({
    secret: 'KWhjV<T=-*VW<;cC5Y6U-{F.ppK+])Ub',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));
// const keycloak = new Keycloak({ store: memoryStore })
// server.use(keycloak.middleware());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors())
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
server.use('/api', apiRouter);
// server.get('/', keycloak.protect(), function(req, res) {
//     res.setHeader('Content-Type', 'text/html');
//     res.status(200).send('<h1>Bonjour sur le serveur de kooriibox</h1>');
// });
// server.get('/rassoul', function(req, res) {
//     res.setHeader('Content-Type', 'text/html');
//     res.status(200).send('yes');
// });

// server.use('/users', require('./routes/userRoute'));

server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('HELLO WORLD HHHH');
});

server.listen(3001, '0.0.0.0', function() {
    console.log('server en ecoute');
});

// (async() => {
//     try {
//         await sequelize.sync({ force: false }
//             //Reset db every time
//         );
//         app.listen(3001, '0.0.0.0');
//         // DEF in docker.compose.yml
//     } catch (error) {
//         console.log(error);
//     }
// })();