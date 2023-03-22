const Sequelize = require('sequelize');

const connection = new Sequelize('parking', 'root', 'abcd@123', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

const teste = async function() {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connection