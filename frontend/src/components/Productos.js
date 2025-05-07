import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/products`);
        setProductos(response.data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setError('Error al cargar los productos');
      }
    };

    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este producto?')) {
      return;
    }

    try {
      await axios.delete(`${config.API_URL}/products/${id}`);
      setProductos(productos.filter(producto => producto.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      setError('Error al eliminar el producto');
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <Link to="/productos/nuevo" className="btn btn-primary mb-3">Nuevo Producto</Link>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.filter(p => p.nombre.toLowerCase().includes(searchTerm)).map(producto => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>${producto.precio}</td>
              <td>{producto.stock}</td>
              <td>
                <Link to={`/productos/editar/${producto.id}`} className="btn btn-sm btn-warning me-2">Editar</Link>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(producto.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productos;