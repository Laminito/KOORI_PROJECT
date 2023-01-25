'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Fiches', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            IboxId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Iboxes',
                    key: 'id'
                }
            },
            avatar: {
                allowNull: true,
                type: Sequelize.BLOB,
                get() {
                    return this.getDataValue('avatar').toString('utf8'); // or whatever encoding is right
                },
            },
            titre: {
                allowNull: false,
                type: Sequelize.STRING
            },
            sous_titre: {
                allowNull: false,
                type: Sequelize.STRING
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            prerequis: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            dureeMin: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            dureeMax: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            equipeMin: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            equipeMax: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            outils: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            etat: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue:true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()

            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        });
        await queryInterface.bulkInsert('Fiches', [{
                IboxId: 1,
                avatar: "https://s1.edi-static.fr/Img/FICHEOUTIL/2017/12/326008/354641.jpg",
                titre: 'Carte des acteurs',
                sous_titre: 'Identification des acteurs concernes par un challenge',
                description: 'utile pour l’identification des acteurs liés à des challenges tel que la revue d’un processus, l’identification de nouveaux services…\n' +
                    'L’output représente tout le système associé au challenge en question\n' +
                    'Il doit donner comme résultat un schéma conceptuel représentant les  acteurs ainsi que leurs sentiments, aspirations et interdépendances',
                prerequis: 'challenge, ' +
                    'probleme',
                dureeMin: 30,
                dureeMax: 60,
                equipeMin: 2,
                equipeMax: 10,
                outils: 'feutre, post-it(2 couleurs), tableau blanc',
            },
            {
                IboxId: 1,
                avatar: "https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/updates/customer-journey-map-example.png",
                titre: 'Customer Journey Map',
                sous_titre: 'Cartographie de l’expérience d’un client/utilisateur',
                description: 'Cette méthode permet de cartographier l’expérience de l’utilisateur étape par étape lors de l’utilisation d’un produit, d’un service ou de toute  solution à un espace de problèmes.\n' +
                    'Elle permet à l’équipe de se mettre à la place de l’utilisateur afin d’identifier les pains points, les opportunités à créer pour améliorer l’expérience utilisateur.',
                prerequis: 'acteurs du parcours',
                dureeMin: 30,
                dureeMax: 50,
                equipeMin: 2,
                equipeMax: 10,
                outils: 'feutre, post-it, papiers, tableau'
            },
            {
                IboxId: 1,
                avatar: "https://innocherche.com/wp-content/uploads/2017/03/Image-TT-OI-CK.png",
                titre: 'Méthode CK',
                sous_titre: 'Créer des ruptures en naviguant entre concepts et connaissances',
                description: 'Cet exercice permet de penser différemment afin de créer des ruptures en réconciliant deux grands approches : la créativité et la science. Elle fonctionne avec deux espaces : \n' +
                    'Concept Space dans lequel on s’autorise à imaginer et explorer de nouveaux concepts qui semblent parfois farfelus, impossibles, voire insensés.\n' +
                    'Knowledge Space nous rangeons toutes les connaissances sur lesquelles nous devons nous appuyer ou dont nous avons besoin pour rendre plus concret les concepts',
                prerequis: 'Idea Map',
                dureeMin: 60,
                dureeMax: 60,
                equipeMin: 2,
                equipeMax: 10,
                outils: 'feutre, post-it, padex, tableau'
            },
            {
                IboxId: 1,
                avatar: "http://atlas-content-cdn.pixelsquid.com/stock-images/product-box-cardboard-3yLDvz6-600.jpg",
                titre: 'Product Box',
                sous_titre: 'Prototypage primaire d’une idée (produit sur étagère)',
                description: 'Il s’agit d’une boîte en carton sur laquelle les participants expriment de façon très visuelle :\n' +
                    'Le nom du produit / Service\n' +
                    'Son slogan\n' +
                    'Les bénéfices qu’il apporte à l’utilisateur / client\n' +
                    'Le mode d’utilisation\n' +
                    'Les précautions d’usages\n' +
                    'Elle permet ainsi de présenter un concept à un potentiel client ou utilisateur afin d’obtenir ses feedbacks avant de le prototyper de façon plus couteuse.',
                prerequis: 'concept, idee',
                dureeMin: 30,
                dureeMax: 60,
                equipeMin: 2,
                equipeMax: 20,
                outils: 'feutre, post-it, papiers, boites'
            },
            {
                IboxId: 1,
                avatar: "https://img.freepik.com/premium-vector/business-model-canvas-vector-illustration_683773-157.jpg?w=2000",
                titre: 'Business model canvas',
                sous_titre: 'brainstorming sur les 09 axes de votre business',
                description: 'le business model Canvas n’est autre qu’une représentation très visuelle et flexible de la façon dont une organisation réalise du chiffre d’affaires, ou plus simplement comment elle gagne de l’argent. Il détaille donc la façon dont l’organisation crée de la valeur pour ses clients et la monétise (concept lié à celui de chaîne de valeur).\n' +
                    'Les objectifs de cet outil sont de :\n' +
                    'Décrire et analyser chacun des 9 blocs \n' +
                    'Générer des idées en utilisant des techniques de créativité pour chaque boc',
                prerequis: 'idee, solution, definis',
                dureeMin: 60,
                dureeMax: 120,
                equipeMin: 2,
                equipeMax: 40,
                outils: 'feutre, affiche en grand format, post-it'
            }
        ])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Fiches');
    }
};