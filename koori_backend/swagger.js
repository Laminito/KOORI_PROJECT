const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './routes/aproposRoute.js',
    './routes/commentaireRoute.js',
    './routes/contactRoute.js',
    './routes/demandeRoute.js',
    './routes/etapesRoute.js',
    './routes/evaluation_ficheRoute.js',
    './routes/evaluation_iboxRoute.js',
    './routes/evaluation_kooriRoute.js',
    './routes/evaluation_noteRoute.js',
    './routes/ficheRoute.js',
    './routes/kooriRoute.js',
    './routes/mailRoute.js',
    './routes/phaseRoute.js',
    './routes/profilRoute.js',
    './routes/rapportRoute.js',
    './routes/serviceRoute.js',
    './routes/sessionRoute.js',
    './routes/sujetRoute.js',
    './routes/temoignageRoute.js',
    './routes/userRoute.js',
]

swaggerAutogen(outputFile, endpointsFiles)