// Imports
const _ = require('lodash')
const models = require('../models');

module.exports = {

	getPhaseFiches: (req, res) => {
        models.Phase_fiche.findAll({
                // where: { id_phase: PhaseId },

                include: [
					{
                        model: models.Fiche,
						attributes:['id','titre','description']
                    },
                    {
                        model: models.Phase,
						attributes:['id','titre','description']
                    }
                ],
            }).then((phaseFiches) => {
                //return res.status(200).json(phases)
                return res.status(200).json(phaseFiches)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },

    getPhaseFicheById: (req, res) => {
        const PhaseFicheId = parseInt(req.params.id)
        models.Phase_fiche.findOne({
                include: [
                    {
                        model: models.Fiche,
                        attributes:['id','titre','description']
                        
                        // include: [{
                        //     model: models.Etape,
                        // }],
                    },
                    {
                        model: models.Phase,
                        
                    }
                ],
                where:{id:PhaseFicheId}
            }).then((phase) => {
                if (phase.avatar) {
                    let buff = new Buffer(phase.avatar);
                    phase.avatar = buff.toString('base64');
                }
                return res.status(200).json(phase)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },

    // getFichesByPhase: (req, res) => {
    //     const Phase = parseInt(req.params.id)
    //     models.Phase_fiche.findAll({
    //             where: { id_phase: Phase },
    //             include: [{
    //                     model: models.Fiche
    //                 },
    //                 {
    //                     model: models.Phase
    //                 }
    //             ],
    //         }).then((phasesfiche) => {
    //             res.status(200).json(phasesfiche)
    //         })
    //         .catch((err) => {
    //             return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
    //         })
    // }
}