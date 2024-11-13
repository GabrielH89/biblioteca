'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Estoque', {
      idEstoque: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idLivro: {  // Chave estrangeira para Livro
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,  // Garante relação 1:1 com Livro
        references: {
          model: 'Livro',
          key: 'idLivro'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'  // Exclui o estoque se o livro for deletado
      },
      quantidade_disponivel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0  // Inicializa a quantidade de exemplares
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
    await queryInterface.dropTable('Estoque');
  }
};
