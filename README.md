# CRM2026 – Frontend

Aplicación web para la gestión de productos y pedidos, desarrollada con React y Vite. Se conecta a un servidor GraphQL para consultar y administrar la información.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- Apollo Client
- GraphQL
- TAILWINDCSS

## Funcionalidades

- Registro e inicio de sesión de usuarios.
- Autenticación mediante JWT.
- Gestión de clientes.
- Gestión de productos.
- Gestión de pedidos.
- Comunicación con el backend mediante GraphQL.

## Demo

- **Frontend:** https://crm2026-apollo-react-frontend.vercel.app/
- **Backend GraphQL:** https://backend-graphql-xpa6.onrender.com/

```bash
cd crm2026-apollo-react-frontend
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_GRAPHQL_URL=http://localhost:4000/
```

Para conectarse al backend desplegado en Render, utilizar:

```env
VITE_GRAPHQL_URL=https://backend-graphql-xpa6.onrender.com/
```

### 5. Ejecutar la aplicación

```bash
npm run dev
```

Vite mostrará la dirección local para abrir la aplicación en el navegador.

## Despliegue

- Frontend alojado en Vercel.
- Backend alojado en Render.
- Base de datos gestionada con MongoDB Atlas.
