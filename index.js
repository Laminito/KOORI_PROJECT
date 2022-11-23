const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors')
const session = require('express-session');
const morgan = require('morgan');
const apiRouter = require('./routes/apiRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');


const server = express();
const PORT = process.env.PORT || 3001


//#####################################################
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const model = require('./models')
    // const userRoutes = require('./routes/userRoutes')

server.use(cookieParser())

model.sequelize.sync({ force: false }).then(() => {
    console.log("model has been re sync")
})



//#####################################################


server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
/**
 * CORS signifie Cross-Origin Resource Sharing.
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

//EndPoint
server.use('/api', apiRouter);

//Entrypoint de mon swagger
server.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));




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



// server.get('/', function(req, res) {
//     res.setHeader('Content-Type', 'text/html');
//     res.status(200).send('HELLO WORLD HHHH');
// });

// server.listen(3001, '0.0.0.0', function() {
//     console.log('server en ecoute');
// });
server.listen(PORT, () => console.log(`Server is connected on ${PORT}`))