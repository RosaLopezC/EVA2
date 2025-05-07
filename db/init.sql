CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;
CREATE TABLE IF NOT EXISTS Clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT IGNORE INTO Productos (nombre, descripcion, precio, stock) VALUES
('Laptop HP', 'Laptop de 15 pulgadas, 8GB RAM, 256GB SSD', 899.99, 10),
('Smartphone Samsung', 'Galaxy S21, 128GB, 8GB RAM', 799.99, 15),
('Tablet Amazon', 'Fire HD 10, 32GB, pantalla Full HD', 149.99, 20),
('Auriculares Sony', 'Wireless, cancelación de ruido', 199.99, 8),
('Smart TV LG', '55 pulgadas, 4K UHD, Smart TV', 699.99, 5);

-- Crear usuario admin por defecto
INSERT IGNORE INTO Clientes (nombre, email, password) VALUES
('Admin', 'admin@ecommerce.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MqrqL3Lmbr5F/JD4s4WXrQTp7YdYQ1O');

-- Otorgar privilegios al usuario
GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'user'@'%';
FLUSH PRIVILEGES;