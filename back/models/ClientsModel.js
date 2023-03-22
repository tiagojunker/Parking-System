
const connection = require('../database/connection')
const { Sequelize, DataTypes } = require('sequelize');

const Clients = connection.define('clients', {

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placa: {
        type: DataTypes.STRING,
        defaultValue: "AAA0A00",
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING,
        defaultValue: "Sem Modelo",
        allowNull: false
    },
    cor: {
        type: DataTypes.STRING,
        defaultValue: "Sem Cor",
        allowNull: false
    },
    pgto: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true
    }
});

/*
(async () => {
    await connection.sync({ force: true });

})()
*/




module.exports = Clients