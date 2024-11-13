'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Livro', {
      idLivro: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      autor: {
        type: Sequelize.STRING
      },
      capa: {
        type: Sequelize.STRING
      },
      editora: {
        type: Sequelize.STRING
      },
      ano_publicacao: {
        type: Sequelize.INTEGER
      },
      genero: {
        type: Sequelize.STRING
      },
      idProfessor: {  // Chave estrangeira para Professor
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Professor',
          key: 'idProfessor'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'  // Exclui os livros do professor se ele for deletado
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
    await queryInterface.dropTable('Livro');
  }
};
