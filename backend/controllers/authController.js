const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cliente = require('../models/cliente');

// Registro de cliente
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Validaciones
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si el email ya existe
    const existingUser = await Cliente.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Crear el usuario
    const cliente = await Cliente.create({
      nombre,
      email,
      password // El hash se genera automáticamente por el hook en el modelo
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      userId: cliente.id
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Login de cliente
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const cliente = await Cliente.findOne({ where: { email } });
    
    if (!cliente) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const isValid = await cliente.validPassword(password);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign(
      { id: cliente.id, email: cliente.email },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1h' }
    );
    
    res.json({ 
      token,
      user: {
        id: cliente.id,
        nombre: cliente.nombre,
        email: cliente.email
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para listar clientes
router.get('/clientes', async (req, res) => {
  console.log('Recibida petición a /api/auth/clientes');
  console.log('Headers:', req.headers);
  try {
    const clientes = await Cliente.findAll({
      attributes: ['id', 'nombre', 'email', 'createdAt']
    });
    console.log('Clientes encontrados:', clientes);
    res.json(clientes);
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
});

module.exports = router;