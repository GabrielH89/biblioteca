'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Emprestimo', {
      idEmprestimo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser: {  // Chave estrangeira para User
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'idUser'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'  // Exclui o empréstimo se o usuário for deletado
      },
      idLivro: {  // Chave estrangeira para Livro
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Livro',
          key: 'idLivro'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'  // Exclui o empréstimo se o livro for deletado
      },
      data_emprestimo: {
        type: Sequelize.DATE,
        allowNull: false
      },
      data_devolucao: {
        type: Sequelize.DATE,
        allowNull: true  // Pode ser null até que o livro seja devolvido
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
    await queryInterface.dropTable('Emprestimo');
  }
};
