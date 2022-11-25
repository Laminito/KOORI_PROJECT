const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors')
const session = require('express-session');
const morgan = require('morgan');
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const model = require('./models')
const apiRouter = require('./routes/apiRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const { createProxyMiddleware } = require('http-proxy-middleware');


const server = express();
const PORT = process.env.PORT || 3001
const HOST = "localhost";
const API_SERVICE_URL = "https://psm.onrender.com";


server.use(cookieParser())




server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
/**
 *CORS signifie Cross-Origin Resource Sharing.
 *Cela permet d 'assouplir la sécurité appliquée à une API.
 *Cela se fait en contournant les en - têtes Access - Control - Allow - Origin,
 *qui spécifient quelles origines peuvent accéder à l 'API.
 */
server.options("*", cors())

//Ajout d'Helmet pour améliorer la sécurité de notre API
server.use(helmet());

//Ajout de morgan pour consigner les requêtes HTTP
server.use(morgan('dev'));

//Utiliser bodyParser pour analyser les corps JSON en objets JS
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//Entrypoint de mon swagger
// server.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const memoryStore = new session.MemoryStore();
server.use(session({
    secret: 'KWhjV<T=-*VW<;cC5Y6U-{F.ppK+])Ub',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

//EndPoint
server.use('/api', apiRouter);

// Info GET endpoint
server.use('/', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

// Authorization
// server.use('', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// });

// Proxy endpoints
server.use('/proxy', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/test`]: '',
    },
}));

// Start the Proxy
server.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
    model.sequelize.sync({ force: false }).then(() => {
        console.log("model has been re sync")
    })
});


// server.listen(PORT, () => console.log(`Server is connected on ${PORT}`))
// model.sequelize.sync({ force: false }).then(() => {
//     console.log("model has been re sync")
// })