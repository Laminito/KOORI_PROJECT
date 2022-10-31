const express = require('express');
// const multer = require('./multer-config')
// const apiRouter = require('./routes/userRoute');
// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const sequelize = require('./util/database');
const apiRouter = require('./routes/apiRouter');
const bodyParser = require('body-parser');
const server = express();



// const swaggerDefinition = {
//     openapi: '3.0.0',
//     info: {
//         title: 'Express API for JSONPlaceholder',
//         version: '1.0.0',
//         description: 'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
//         license: {
//             name: 'Sonatel',
//             url: 'https://sonatel.sn/',
//         },
//         contact: {
//             name: 'JSONPlaceholder',
//             url: 'https://jsonplaceholder.typicode.com',
//         },
//     },
//     servers: [{
//         url: 'http://localhost:8001',
//         description: 'Development server',
//     }, ],
// };


// const options = {
//     swaggerDefinition,
//     // Paths to files containing OpenAPI definitions
//     apis: ['./routes/*.js'],
// };

// const swaggerSpec = swaggerJSDoc(options);

// server.use('/docs/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use('/api', apiRouter);




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
server.use(cors());
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});




// server.use('/api', apiRouter);
// server.use('/test', apiRouter);



server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('HELLO WORLD HHHH');
});

server.listen(3001, '0.0.0.0', function() {
    console.log('server en ecoute');
});