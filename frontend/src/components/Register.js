import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!userData.nombre || !userData.email || !userData.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', userData);
      console.log('Respuesta del servidor:', response.data);
      alert('Usuario registrado exitosamente');
      navigate('/login');
    } catch (error) {
      console.error('Error completo:', error);
      setError(error.response?.data?.message || 'Error al registrar usuario');
    }
  };

  return (
    <div className="form-container">
      <h2>Registro de Usuario</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            value={userData.nombre}
            onChange={(e) => setUserData({...userData, nombre: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})}
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;