const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: async (cliente) => {
      const salt = await bcrypt.genSalt(10);
      cliente.password = await bcrypt.hash(cliente.password, salt);
    }
  }
});

Cliente.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Cliente;