// const router = require('./routes/apiRouter')
// const userRoute = require('./routes/userRoute');
const express = require('express');
const apiRouter = require('./routes/apiRouter');
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session');
const User = require('./models/user');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const server = express();


server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// server.use(cors());
server.options("*", cors())
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/api', apiRouter);
server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    // server.use('/api', userRoute);




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




// server.use('/api', apiRouter);
// server.use('/test', apiRouter);



server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('HELLO WORLD HHHH');
});

server.listen(3001, '0.0.0.0', function() {
    console.log('server en ecoute');
});