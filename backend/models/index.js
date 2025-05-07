const sequelize = require('../config/database');
const Cliente = require('./cliente');
const Producto = require('./producto');

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');
    
    await sequelize.sync();
    console.log('Modelos sincronizados correctamente.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

module.exports = {
  sequelize,
  Cliente,
  Producto,
  syncDatabase
};