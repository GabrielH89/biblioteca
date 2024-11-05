'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Professor extends Model {
    static associate(models) {
      // Associação com User
      Professor.belongsTo(models.User, {
        foreignKey: 'idUser',
        as: 'user'
      });
    }
  }

  Professor.init({
    idProfessor: {  // Correspondência com a migration
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    disciplina: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idUser: {  // Nome consistente com a migration
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Professor',
    tableName: 'professor',  // Especifica o nome correto da tabela
  });

  return Professor;
};
