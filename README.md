# REMSYSTEM

Sistema CRM/ERP interno para la gestión de clientes, usuarios y operaciones comerciales.

El repositorio está organizado en las siguientes carpetas:

- `frontend/alpha-erp` — Aplicación web (React + TypeScript + Vite)
- `backend` — API REST (Spring Boot)
- `database` — Scripts de base de datos

---

## Ramas

| Rama | Uso |
|---|---|
| `main` | Rama estable, código revisado |
| `develop` | Rama de desarrollo, se prueba antes de pasar a main |

Ambas ramas principales están protegidas, solo se pueden modificar mediante Pull Request.
---


## frontend/alpha-erp

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm v9 o superior

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/bfp2608/app-remsystem-erp.git
cd frontend/alpha-erp

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
```

### Variables de entorno

El proyecto utiliza archivos .env para gestionar credenciales de forma segura. Por seguridad, los archivos .env.* (excepto el example) están excluidos del repositorio.

### Correr el proyecto

```bash
npm run dev
```

### Dependencias principales

| Paquete | Versión | Uso |
|---|---|---|
| React | ^19.2.0 | Framework de UI |
| TypeScript | ~5.9.3 | Tipado estático |
| Vite (rolldown-vite) | 7.2.5 | Bundler y servidor de desarrollo |
| React Router DOM | ^7.13.1 | Navegación entre páginas |
| Zustand | 5.0.12 | Manejo de estado global |
| Tailwind CSS | ^4.0.0 | Estilos utilitarios |
| Lucide React | ^0.562.0 | Iconos |
| @supabase/supabase-js | ^2.103.3 | Cliente para Supabase (base de datos/auth) |
| React-select | ^5.10.2 | Componente de selects avanzados |
| Sonner | ^2.0.7 | Notificaciones/toasts |

---

## backend

*Por documentar.*
