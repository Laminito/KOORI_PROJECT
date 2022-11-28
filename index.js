const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors')
const session = require('express-session');
const morgan = require('morgan');
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const model = require('./models')
const apiRouter = require('./routes/apiRouter');
const index = require('./routes/index');
const cont = require('./controllers/userCtrl');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit')
const errorHandler = require('./middleware/error')

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Mins
    max: 100,
})


const server = express();
const PORT = process.env.PORT || 3001

server.use(limiter);
server.set('trust proxy', 1);
// Error handler middleware
server.use(errorHandler)
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
server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// const memoryStore = new session.MemoryStore();
// server.use(session({
//     secret: 'KWhjV<T=-*VW<;cC5Y6U-{F.ppK+])Ub',
//     resave: false,
//     saveUninitialized: true,
//     store: memoryStore
// }));

//EndPoint
// server.use('/api', apiRouter);
server.use('/api', index);

// Info GET endpoint
// server.use('/test', (req, res, next) => {
//     res.send('This is a proxy service which proxies to Billing and Account APIs.');
// });

// Authorization
// server.use('', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// });

// Proxy endpoints
// server.use('/proxy', createProxyMiddleware({
//     target: API_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         [`^/proxy`]: '',
//     },
// }));

// Start the Proxy
// server.listen(PORT, HOST, () => {
//     console.log(`Starting Proxy at ${HOST}:${PORT}`);
//     model.sequelize.sync({ force: false }).then(() => {
//         console.log("model has been re sync")
//     })
// });


server.listen(PORT, () => console.log(`Server is connected on ${PORT}`))
model.sequelize.sync({ force: false }).then(() => {
    console.log("model has been re sync")
})