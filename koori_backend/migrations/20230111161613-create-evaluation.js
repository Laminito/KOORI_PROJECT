'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Evaluations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commentaire: {
        type: Sequelize.TEXT
      },
      note: {
        type: Sequelize.INTEGER
      },
      UserId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
          model: 'Users',
          key: 'id'
          }
      },
      KooriId: {
        allowNull: true,
        defaultValue:null,
        type: Sequelize.INTEGER,
        references: {
            model: 'Kooris',
            key: 'id'
        }
      },
      IboxId: {
        allowNull: true,
        defaultValue:null,
        type: Sequelize.INTEGER,
        references: {
            model: 'Iboxs',
            key: 'id'
        }
      },
      SessionId: {
        allowNull: true,
        defaultValue:null,
        type: Sequelize.INTEGER,
        references: {
            model: 'Sessions',
            key: 'id'
        }
      },
      RapportId: {
        allowNull: true,
        defaultValue:null,
        type: Sequelize.INTEGER,
        references: {
            model: 'Rapports',
            key: 'id'
        }
      },
      FicheId: {
        allowNull: true,
        defaultValue:null,
        type: Sequelize.INTEGER,
        references: {
            model: 'Fiches',
            key: 'id'
        }
      },
      etat: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:true
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:new Date()
      }
    });
    await queryInterface.bulkInsert('Evaluations', [
      {
        UserId: 2,
        KooriId: 1,
        note: 5,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 2,
        IboxId: 1,
        note: 5,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 2,
        SessionId: 1,
        note: 5,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 2,
        RapportId: 1,
        note: 5,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 3,
        IboxId: 1,
        note: 4,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 5,
        RapportId: 1,
        note: 2,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 5,
        SessionId:1,
        note: 5,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 4,
        KooriId: 1,
        note: 3,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 4,
        RapportId: 1,
        note: 3,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 1,
        KooriId: 1,
        note: 5,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 4,
        FicheId: 1,
        note: 4,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 3,
        FicheId: 2,
        note: 4,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 2,
        FicheId: 3,
        note: 5,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 1,
        FicheId: 4,
        note: 5,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
      {
        UserId: 5,
        FicheId: 2,
        note: 5,
        commentaire: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps."
      },
  ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Evaluations');
  }
};