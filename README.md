# E-commerce Application

Aplicación de comercio electrónico desarrollada con React, Node.js y MySQL.

## Requisitos Previos

- Docker y Docker Compose
- Node.js (v14 o superior)
- Git

## Instalación y Configuración

1. Clonar el repositorio:
```bash
git clone https://github.com/RosaLopezC/EVA2.git
cd EVA2
```

2. Configurar variables de entorno:
   Crear archivo `.env` en la raíz del proyecto:
```env
DB_HOST=mysql_db
DB_USER=root
DB_PASSWORD=root
DB_NAME=ecommerce
DB_PORT=3306
JWT_SECRET=your_secret_key
```

3. Iniciar la aplicación:
```bash
docker-compose up -d
```

4. Acceder a la aplicación:
- Frontend: http://localhost:4000
- Backend API: http://localhost:8000

## Funcionalidades

- Autenticación de usuarios
- Gestión de productos (CRUD)
- Listado de clientes registrados

## Tecnologías Utilizadas

- Frontend: React.js con Bootstrap
- Backend: Node.js con Express
- Base de datos: MySQL
- Contenedorización: Docker
