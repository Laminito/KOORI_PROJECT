let aproposAllRoutes = require('../routes/aproposRoute')
let contactAllRoutes = require('../routes/contactRoute')
let commentaireAllRoutes = require('../routes/commentaireRoute')
let demandeAllRoutes = require('../routes/demandeRoute')
let etapeAlRoutes = require('../routes/etapesRoute')
let evaluation_ficheAllRoutes = require('../routes/evaluation_ficheRoute')
let evaluation_iboxAllRoutes = require('../routes/evaluation_iboxRoute')
let evaluation_kooriAllRoutes = require('../routes/evaluation_kooriRoute')
let evaluation_noteAllRoutes = require('../routes/evaluation_noteRoute')
let ficheAllRoutes = require('../routes/ficheRoute')
let iboxAllRoutes = require('../routes/iboxRoute')
let kooriAllRoutes = require('../routes/kooriRoute')
let mailAllRoutes = require('../routes/mailRoute')
let phaseAllRoutes = require('../routes/phaseRoute')
let profilAllRoutes = require('../routes/ficheRoute')
let rapportAllRoutes = require('../routes/rapportRoute')
let serviceAllRoutes = require('../routes/serviceRoute')
let sessionAllRoutes = require('../routes/sessionRoute')
let sujetAllRoutes = require('../routes/sujetRoute')
let temoignageAllRoutes = require('../routes/temoignageRoute')
let userAllRoutes = require('../routes/userRoute')
let AuthRoutes = require('../routes/authRoutes')
let handlersRoutes = require('../routes/handlersRoute')


module.exports = [
    aproposAllRoutes,
    commentaireAllRoutes,
    contactAllRoutes,
    demandeAllRoutes,
    etapeAlRoutes,
    evaluation_ficheAllRoutes,
    evaluation_iboxAllRoutes,
    evaluation_kooriAllRoutes,
    evaluation_noteAllRoutes,
    ficheAllRoutes,
    iboxAllRoutes,
    kooriAllRoutes,
    mailAllRoutes,
    phaseAllRoutes,
    profilAllRoutes,
    rapportAllRoutes,
    serviceAllRoutes,
    sessionAllRoutes,
    sujetAllRoutes,
    temoignageAllRoutes,
    userAllRoutes,
    AuthRoutes,
    handlersRoutes
]