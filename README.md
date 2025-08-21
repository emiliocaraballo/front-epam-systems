# 📚 Reseña de Libros - EPAM Systems

Una aplicación web moderna para gestionar tu biblioteca personal de libros con reseñas y calificaciones. Desarrollada con **Nuxt 3**, **Vue 3**, **Pinia** y **TypeScript**.

## 🚀 Características

- **🔍 Búsqueda de libros** - Integración con Open Library API
- **📖 Biblioteca personal** - Guarda y organiza tus libros favoritos
- **⭐ Sistema de calificaciones** - Califica libros con estrellas (1-5)
- **✍️ Reseñas personalizadas** - Escribe tus propias reseñas
- **🔐 Autenticación completa** - Registro, login y gestión de sesiones
- **🎨 Interfaz moderna** - Diseño responsive y atractivo
- **📱 PWA Ready** - Optimizada para dispositivos móviles

## 🛠️ Tecnologías

- **Frontend**: Nuxt 3, Vue 3, TypeScript
- **Estado**: Pinia
- **Estilos**: SCSS con variables CSS
- **Iconos**: Lucide Vue Next
- **Autenticación**: JWT con localStorage
- **API**: Fetch API con interceptores personalizados

## 📋 Prerrequisitos

- **Node.js** 18.x o superior
- **npm** 8.x o superior
- **Backend API** ejecutándose en `http://localhost:3111`

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/emiliocaraballo/front-epam-systems.git
cd front-epam-systems
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Verificar configuración

El archivo `nuxt.config.ts` ya está configurado con:
- **API base URL**: `http://localhost:3111/api/v1`
- **Pinia** para gestión de estado
- **SCSS** con variables globales
- **TypeScript** configurado
- **Compatibilidad** con Nuxt 3.16.0

Si necesitas cambiar la URL de la API, modifica esta línea en `nuxt.config.ts`:

```typescript
runtimeConfig: {
  public: {
    apiBase: 'http://localhost:3111/api/v1' // ← Cambia aquí
  }
}
```

## 🏃‍♂️ Comandos Disponibles

### Desarrollo

```bash
# Servidor de desarrollo con hot reload
npm run dev
```

### Producción

```bash
# Construir para producción
npm run build

# Vista previa de la versión de producción
npm run preview

# Ejecutar servidor de producción
npm run prod
```

### PM2 - Gestión de Procesos

#### Instalación de PM2
```bash
npm install -g pm2   # Instalar PM2 globalmente
```

#### Comandos PM2
```bash
# Desarrollo con PM2
npm run pm2:dev      # Iniciar en modo desarrollo
npm run pm2:prod     # Iniciar en modo producción

# Gestión de procesos
npm run pm2:stop     # Detener todos los procesos
npm run pm2:restart  # Reiniciar todos los procesos
npm run pm2:status   # Ver estado de los procesos
npm run pm2:logs     # Ver logs en tiempo real
npm run pm2:delete   # Eliminar todos los procesos

# Comandos directos de PM2
pm2 start ecosystem.config.cjs --only frontend-dev    # Solo desarrollo
pm2 start ecosystem.config.cjs --only frontend-prod   # Solo producción
pm2 start ecosystem.config.cjs                        # Ambos modos
pm2 monit                                           # Monitor en tiempo real
```

### Otros comandos

```bash
# Generar sitio estático
npm run generate

# Limpiar caché
rm -rf .nuxt .output node_modules/.cache
```

## 📁 Estructura del Proyecto

```
frontend/
├── assets/
│   └── styles/
│       ├── _variables.scss    # Variables de color y estilos
│       ├── _buttons.scss      # Estilos de botones
│       └── main.scss          # Estilos principales
├── components/
│   ├── BookDetails.vue        # Modal de detalles del libro
│   ├── EditBookModal.vue      # Modal de edición
│   └── ConfirmDialog.vue      # Diálogo de confirmación
├── composables/
│   └── useApi.ts              # Cliente API con interceptores
├── layouts/
│   └── default.vue            # Layout principal con navegación
├── middleware/
│   └── auth.ts                # Middleware de autenticación
├── pages/
│   ├── index.vue              # Página principal (búsqueda)
│   ├── login.vue              # Página de login
│   ├── register.vue           # Página de registro
│   ├── my-library.vue         # Biblioteca personal
│   └── book-detail.vue        # Detalles del libro
├── plugins/
│   └── api.ts                 # Plugin de inicialización
├── stores/
│   ├── auth.ts                # Store de autenticación
│   └── books.ts               # Store de libros
└── types/
    └── index.ts               # Definiciones de tipos
```

## 🔐 Autenticación

### Flujo de Autenticación

1. **Registro**: Crear cuenta con nombre, email, usuario y contraseña
2. **Login**: Iniciar sesión con usuario y contraseña
3. **Token JWT**: Se almacena automáticamente en localStorage
4. **Persistencia**: La sesión se mantiene entre recargas
5. **Logout**: Limpia el token y redirige al login

### Protección de Rutas

- `/my-library` - Requiere autenticación
- `/book-detail` - Requiere autenticación para guardar libros
- Otras rutas son públicas

## 📚 Funcionalidades de Libros

### Búsqueda
- Integración con Open Library API
- Búsqueda por título
- Resultados con portadas y información básica
- Historial de búsquedas recientes

### Biblioteca Personal
- **Guardar libros**: Agregar libros desde la búsqueda
- **Calificar**: Sistema de estrellas (1-5)
- **Reseñar**: Escribir reseñas personales
- **Editar**: Modificar calificaciones y reseñas
- **Eliminar**: Remover libros de la biblioteca
- **Filtrar**: Por título, autor, calificación
- **Ordenar**: Por calificación ascendente/descendente

### Gestión de Estado
- **Pinia stores** para autenticación y libros
- **Reactive state** para filtros y búsquedas
- **Optimistic updates** para mejor UX

## 🎨 Sistema de Estilos

### Variables SCSS
```scss
// Colores principales
$primary-color: #4299e1;    // Azul principal
$secondary-color: #38b2ac;  // Verde azulado
$error-color: #e53e3e;      // Rojo para errores
$success-color: #48bb78;    // Verde para éxito
```

### Componentes Estilizados
- **Botones**: Estilos consistentes con hover effects
- **Modales**: Backdrop blur y animaciones suaves
- **Formularios**: Validación visual y estados de error
- **Navegación**: Diseño responsive con información de usuario

## 🔧 Configuración de Desarrollo

### Variables de Entorno

La aplicación está configurada para usar la API en `http://localhost:3111/api/v1` por defecto.

Para cambiar la URL de la API, modifica el archivo `nuxt.config.ts`:

```typescript
runtimeConfig: {
  public: {
    apiBase: 'http://localhost:3111/api/v1' // ← Cambia aquí
  }
}
```

Para desarrollo local:
```env
NODE_ENV=development
```

### TypeScript
- Configuración estricta deshabilitada para desarrollo
- Verificación de tipos en build
- Definiciones de tipos para API responses

### SCSS
- Variables globales importadas automáticamente
- Módulos de color para funciones deprecadas
- Estilos modulares y reutilizables

## 🚀 Despliegue

### Producción Local
```bash
# 1. Construir la aplicación
npm run build

# 2. Ejecutar servidor de producción
npm run prod
```

### Servidor de Producción
```bash
# 1. Instalar dependencias
npm ci --only=production

# 2. Construir
npm run build

# 3. Ejecutar
node .output/server/index.mjs
```

### Variables de Entorno de Producción

Para producción, modifica la URL de la API en `nuxt.config.ts`:

```typescript
runtimeConfig: {
  public: {
    apiBase: 'https://tu-api.com/api/v1' // ← URL de producción
  }
}
```

O usa variables de entorno:
```env
NODE_ENV=production
```

## 🐛 Solución de Problemas

### Errores Comunes

#### 1. Error de Build
```bash
# Limpiar caché
rm -rf .nuxt .output node_modules/.cache
npm install
npm run build
```

#### 2. Error de Importación
```bash
# Verificar que no hay importaciones de rutas internas de Nuxt
# Cambiar: import { definePageMeta } from "nuxt/dist/pages/runtime"
# Por: definePageMeta({ layout: "default" })
```

#### 3. Error de SASS
```bash
# Verificar que las funciones de color usen color.adjust()
# En lugar de darken() o lighten()
```

### Logs de Desarrollo
- **Vue DevTools**: Disponible en desarrollo
- **Nuxt DevTools**: Shift + Option + D en el navegador
- **Console**: Errores de API y validación

## 📝 API Endpoints

La aplicación espera los siguientes endpoints en el backend:

### Autenticación
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Login de usuario
- `POST /auth/logout` - Logout de usuario
- `GET /auth/profile` - Obtener perfil de usuario

### Libros
- `GET /books/search` - Búsqueda de libros
- `POST /books/my-library` - Guardar libro en biblioteca
- `GET /books/my-library` - Obtener biblioteca personal
- `PUT /books/my-library/:id` - Actualizar libro
- `DELETE /books/my-library/:id` - Eliminar libro

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Emilio Caraballo**
- GitHub: [@emiliocaraballo](https://github.com/emiliocaraballo)
- Email: emiliocaraballo9812@gmail.com

## 🙏 Agradecimientos

- **EPAM Systems** por la oportunidad
- **Open Library** por la API de libros
- **Nuxt Team** por el framework increíble
- **Vue.js Team** por la reactividad

---

⭐ **¡Dale una estrella al proyecto si te gustó!**
