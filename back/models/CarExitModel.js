const connection = require('../database/connection')
const { Sequelize, DataTypes } = require('sequelize');

const AllRegister = connection.define('AllRegister', {

  placa: {
    type: DataTypes.STRING,
    defaultValue: "AAA0A00",
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING,
    defaultValue: "Sem Modelo",
    allowNull: true
  },
  cor: {
    type: DataTypes.STRING,
    defaultValue: "Sem Cor",
    allowNull: true
  },
  pgto: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true
  },
  entrada: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

/*
(async () => {
    await connection.sync({ force: true });

})()
*/

module.exports = AllRegister