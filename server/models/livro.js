'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Livro extends Model {
    static associate(models) {
      // Exemplo de associação, caso haja uma relação com o professor
      Livro.belongsTo(models.Professor, {
        foreignKey: 'idProfessor',  // Correspondente à chave estrangeira
        as: 'professor'  // Alias para o relacionamento
      });
    }
  }

  Livro.init({
    idLivro: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capa: {
      type: DataTypes.STRING,
      allowNull: true  // Permitindo null caso o campo não seja obrigatório
    },
    editora: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ano_publicacao: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idProfessor: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Livro',
    tableName: 'livro',  // Nome da tabela no banco de dados
  });

  return Livro;
};
