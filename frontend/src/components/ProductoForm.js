import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

function ProductoForm() {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchProducto = async () => {
        try {
          const response = await axios.get(`${config.API_URL}/products/${id}`);
          setProducto(response.data);
        } catch (error) {
          setError('Error al cargar el producto');
        }
      };
      fetchProducto();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!producto.nombre || !producto.precio || !producto.stock) {
      setError('Nombre, precio y stock son obligatorios');
      return;
    }

    try {
      const formData = {
        nombre: producto.nombre,
        descripcion: producto.descripcion || '',
        precio: parseFloat(producto.precio),
        stock: parseInt(producto.stock)
      };

      if (id) {
        await axios.put(`${config.API_URL}/products/${id}`, formData);
      } else {
        await axios.post(`${config.API_URL}/products`, formData);
      }
      navigate('/productos');
    } catch (error) {
      console.error('Error completo:', error.response?.data);
      setError(error.response?.data?.message || 'Error al guardar el producto');
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            value={producto.nombre}
            onChange={(e) => setProducto({...producto, nombre: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            className="form-control"
            value={producto.descripcion}
            onChange={(e) => setProducto({...producto, descripcion: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio:</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={producto.precio}
            onChange={(e) => setProducto({...producto, precio: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock:</label>
          <input
            type="number"
            className="form-control"
            value={producto.stock}
            onChange={(e) => setProducto({...producto, stock: e.target.value})}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Actualizar' : 'Crear'} Producto
        </button>
      </form>
    </div>
  );
}

export default ProductoForm;