import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

function Clientes() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Agregamos el token a la petición
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.API_URL}/auth/clientes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('URL de la petición:', `${config.API_URL}/auth/clientes`);
        console.log('Respuesta:', response.data);
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error completo:', error);
        setError('Error al cargar la lista de usuarios registrados');
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Usuarios Registrados</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha de Registro</th>
            </tr>
          </thead>
          <tbody>
            {usuarios && usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{new Date(usuario.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;