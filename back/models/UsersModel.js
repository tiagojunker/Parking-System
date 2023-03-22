const connection = require('../database/connection')
const { Sequelize, DataTypes } = require('sequelize');

const Users = connection.define('Users', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }

});

/*
(async () => {
    await connection.sync({ force: true });

})()
*/

module.exports = Users