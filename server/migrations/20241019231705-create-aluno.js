'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Aluno', {
      idAluno: {  
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      matricula: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idUser: {  // Chave estrangeira para User
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user', // Nome da tabela referenciada
          key: 'idUser'  // Nome do campo referenciado
        },
        onUpdate: 'CASCADE',  // Atualização em cascata
        onDelete: 'CASCADE'   // Remoção em cascata
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Aluno');
  }
};
