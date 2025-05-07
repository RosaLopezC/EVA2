const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ecommerce_db',
  process.env.DB_USER || 'user',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'mysql_db', // Debe coincidir con el nombre del servicio en docker-compose
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306
  }
);

module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    retry: {
      max: 5,
      timeout: 3000
    }
  }