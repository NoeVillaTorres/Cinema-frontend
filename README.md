# Cinema Catalog — Frontend

Aplicación web desarrollada con React para explorar un catálogo de películas y series, consultar información detallada y administrar títulos mediante una interfaz intuitiva.

Este proyecto forma parte de una evaluación técnica para el puesto Trainee de Desarrollo de Software en Turing Inteligencia Artificial.

## 1. Descripción

Cinema Catalog es una aplicación web de consulta y administración de películas y series.

El frontend proporciona una interfaz que permite explorar el catálogo, buscar títulos, aplicar filtros, consultar detalles e iniciar sesión para acceder a las funciones administrativas.

La aplicación consume una API REST desarrollada con FastAPI y PostgreSQL.

Su objetivo es demostrar conocimientos de desarrollo frontend, integración con servicios HTTP, manejo de estados, navegación y organización de componentes.

## 2. Tecnologías utilizadas

| Tecnología | Propósito |
|---|---|
| React | Construcción de interfaces mediante componentes |
| Vite | Entorno de desarrollo y compilación |
| JavaScript | Lógica de la aplicación |
| Tailwind CSS 4 | Estilos y diseño responsive |
| React Router | Navegación entre páginas |
| TanStack Query | Consultas, mutaciones y caché de datos |
| Lucide React | Iconografía |
| Sonner | Notificaciones y confirmaciones |

Las versiones específicas de las dependencias se encuentran en `package.json`.

## 3. Funcionalidades principales

### Catálogo

- Visualización de películas y series.
- Sección destacada con información de un título.
- Búsqueda de títulos por nombre.
- Filtros por tipo y género.
- Consulta de detalles individuales.
- Diseño adaptable a diferentes tamaños de pantalla.

### Autenticación

- Inicio de sesión mediante correo y contraseña.
- Consulta del usuario autenticado.
- Navegación según el rol del usuario.
- Cierre de sesión.

### Administración

Los usuarios con rol `admin` pueden:

- Consultar los títulos registrados.
- Crear nuevos títulos.
- Editar información de películas y series.
- Eliminar títulos mediante confirmación.

Las operaciones administrativas se realizan mediante solicitudes a la API protegidas con JWT.

## 4. Estructura del proyecto

El código está organizado por responsabilidades.

```text
src/
├── components/
├── context/
├── layouts/
├── pages/
├── router/
├── services/
├── App.jsx
└── main.jsx
```

### Responsabilidades

| Directorio o archivo | Responsabilidad |
|---|---|
| `components/` | Componentes reutilizables de la interfaz |
| `context/` | Estado compartido de autenticación |
| `layouts/` | Estructura general de las páginas |
| `pages/` | Vistas principales de la aplicación |
| `router/` | Definición y protección de rutas |
| `services/` | Comunicación HTTP con la API |
| `App.jsx` | Composición principal de la aplicación |
| `main.jsx` | Inicialización de React y proveedores |

Esta organización busca mantener una separación sencilla entre presentación, navegación, autenticación y acceso a datos.

## 5. Requisitos previos

Para ejecutar el frontend localmente se necesita:

- Node.js 22.14.0 (versión utilizada durante el desarrollo).
- npm 10.9.2 (versión utilizada durante el desarrollo).
- Un navegador web moderno.
- El backend de Cinema Catalog para consultar y administrar información.

El proyecto fue desarrollado y probado localmente en Ubuntu.

Las versiones específicas de las dependencias están definidas en `package.json`.

## 6. Instalación

### 6.1. Clonar el repositorio

```bash
git clone https://github.com/NoeVillaTorres/Cinema-frontend.git
cd Cinema-frontend
```

### 6.2. Instalar dependencias

```bash
npm ci
```

Este comando instala las dependencias registradas en `package-lock.json`.

## 7. Configuración

El frontend utiliza la variable de entorno `VITE_API_URL` para definir la dirección del backend.

Crear un archivo `.env` en la raíz del proyecto:

```dotenv
VITE_API_URL=http://localhost:8000
```



**Importante:** las variables de Vite que comienzan por `VITE_` pueden incluirse en el código enviado al navegador. No deben utilizarse para almacenar contraseñas, claves JWT u otros secretos.

## 8. Ejecución

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Por defecto, la aplicación estará disponible en:

```text
http://localhost:5173
```

### Comandos adicionales

| Comando | Descripción |
|---|---|
| `npm run build` | Genera la compilación en `dist/` |
| `npm run lint` | Revisa el código con ESLint |
| `npm run preview` | Permite previsualizar la compilación |

Para utilizar las funcionalidades del catálogo y del panel administrativo, el backend debe estar disponible en la dirección configurada mediante `VITE_API_URL`.
### Compilación

Para generar una versión compilada:

```bash
npm run build
```

Para revisar el código con ESLint:

```bash
npm run lint
```

## 9. Rutas de la aplicación

| Ruta | Descripción | Acceso |
|---|---|---|
| `/` | Página principal y catálogo | Público |
| `/titles/:id` | Detalles de una película o serie | Público |
| `/login` | Inicio de sesión | Público |
| `/admin` | Administración de títulos | Administrador |

Las rutas se gestionan mediante React Router.

El catálogo utiliza parámetros de URL para representar los filtros aplicados.

Ejemplos:

```text
/?type=movie
/?type=series
/?search=Interstellar
/?genre=Drama
```

Los parámetros pueden combinarse.

## 10. Integración con el backend

El frontend consume la API REST de Cinema Catalog mediante `fetch`.

Las funciones de comunicación HTTP se encuentran en `src/services/`.

Las operaciones incluyen:

- Consulta de títulos y géneros.
- Consulta de detalles.
- Inicio de sesión.
- Consulta del usuario autenticado.
- Creación, actualización y eliminación de títulos.

TanStack Query gestiona las consultas, sus estados de carga y error, y la actualización de datos después de las operaciones administrativas.

### Autenticación

Después de iniciar sesión, la aplicación obtiene un token JWT y consulta la información del usuario autenticado.

El token se mantiene en memoria durante la sesión actual de la aplicación.

Por esta razón, al recargar la página es necesario iniciar sesión nuevamente.

Las solicitudes administrativas incluyen el token mediante el encabezado:

```http
Authorization: Bearer TOKEN_JWT
```

La interfaz limita el acceso al panel administrativo según el rol del usuario. Sin embargo, la autorización definitiva se realiza en el backend.

Repositorio de la API:

[Cinema Catalog — Backend](https://github.com/NoeVillaTorres/cinema-backend)

## 11. Manejo de estados y errores

La aplicación contempla diferentes estados durante las consultas:

- Carga de información.
- Datos recibidos correctamente.
- Ausencia de resultados.
- Errores de conexión o solicitudes.

Cuando la API no está disponible, la página principal mantiene la estructura del Hero mediante contenido alternativo.

Las consultas pueden reintentarse cuando existen errores de conexión.

Se utiliza Sonner para mostrar notificaciones de operaciones administrativas, errores y confirmaciones de acciones.

## 12. Diseño e interfaz

La interfaz utiliza una paleta oscura con acentos turquesa.

El diseño se implementó mediante Tailwind CSS, utilizando componentes reutilizables y clases responsive.

Entre sus elementos principales se encuentran:

- Header con navegación adaptable.
- Hero con contenido destacado.
- Accesos rápidos a películas, series y catálogo.
- Buscador y filtros.
- Tarjetas de películas y series.
- Página de detalles.
- Formulario de autenticación.
- Panel administrativo con tabla y formulario.

La aplicación está orientada al descubrimiento y consulta de títulos, no a la reproducción de contenido audiovisual.

## 13. Consideraciones y limitaciones

Cinema Catalog fue desarrollado como parte de una evaluación técnica de duración limitada.

Por este motivo:

- La aplicación está preparada principalmente para demostración local.
- Requiere la API para consultar y administrar los datos.
- El token JWT se mantiene en memoria.
- No se implementó persistencia de sesión después de recargar.
- La creación de cuentas se realiza mediante el backend.
- No se incluye reproducción de películas o series.
- No se incorporaron funcionalidades externas al alcance del ejercicio.

Se priorizó una implementación funcional, organizada y comprensible.

## 14. Repositorios

Cinema Catalog está dividido en dos repositorios independientes:

- [Frontend — React y Vite](https://github.com/NoeVillaTorres/Cinema-frontend)
- [Backend — FastAPI y PostgreSQL](https://github.com/NoeVillaTorres/cinema-backend)

## 15. Autor

Proyecto desarrollado como parte del periodo de evaluación técnica para el puesto Trainee de Desarrollo de Software en Turing Inteligencia Artificial.

**Fecha:** octubre de 2026.
