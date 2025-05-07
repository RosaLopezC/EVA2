import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  Navigate, 
  useNavigate 
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Productos from './components/Productos';
import ProductoForm from './components/ProductoForm';
import Clientes from './components/Clientes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

// Separate Navigation component to use hooks
function Navigation() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Ecommerce App</Link>
        <div className="navbar-nav">
          {isAuthenticated && (
            <>
              <Link className="nav-link" to="/clientes">Clientes</Link>
              <Link className="nav-link" to="/productos">Productos</Link>
              <button 
                className="nav-link btn btn-link" 
                onClick={handleLogout}
                style={{ 
                  border: 'none', 
                  background: 'none', 
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                Cerrar Sesión
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// Main App component
function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <div className="container">
        <Navigation />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/productos" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clientes" element={isAuthenticated ? <Clientes /> : <Navigate to="/login" />} />
          <Route path="/productos/nuevo" element={isAuthenticated ? <ProductoForm /> : <Navigate to="/login" />} />
          <Route path="/productos/editar/:id" element={isAuthenticated ? <ProductoForm /> : <Navigate to="/login" />} />
          <Route path="/productos" element={isAuthenticated ? <Productos /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;