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
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

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
    res.setHeader('Access-Control-Allow-Headers', 'X - PINGOTHER', 'Content - Type ');
    res.setHeader('Access-Control-Max-Age', 86400);
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
server.use('/api', apiRouter);
// server.use('/', index);

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


server.use(expressCspHeader({
    directives: {
        'default-src': [SELF],
        'report-to': 'my-report-group'
    },
    reportUri: 'https://cspreport.com/send',
    reportTo: [{
        group: 'my-report-group',
        max_age: 30 * 60,
        endpoints: [{ url: 'https://cspreport.com/send' }],
        include_subdomains: true
    }]
}));

server.use(function(req, res, next) {
    res.setHeader(
        'Content-Security-Policy-Report-Only',
        "default-src 'self'; font-src 'self'; img-src 'self' https://images.unsplash.com; script-src 'self'; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css; frame-src 'self' https://www.youtube.com https://youtube.com;"
    );
    next();
});


server.listen(PORT, () => console.log(`Server is connected on ${PORT}`))
model.sequelize.sync({ force: false }).then(() => {
    console.log("model has been re sync")
})