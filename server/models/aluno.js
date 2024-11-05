'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Aluno extends Model {
    static associate(models) {
      // Associação com User
      Aluno.belongsTo(models.User, {
        foreignKey: 'idUser',
        as: 'user'
      });
    }
  }

  Aluno.init({
    idAluno: {  // Correspondência com a migration
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idUser: {  // Nome consistente com a migration
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Aluno',
    tableName: 'aluno',  // Certifique-se de que o nome da tabela esteja correto
  });

  return Aluno;
};
