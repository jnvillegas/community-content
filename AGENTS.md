# AGENTS.md - Directrices de Codificación para Agentes de IA

Este documento proporciona información esencial para los agentes de codificación de IA que trabajan en este proyecto de kit de inicio de Laravel + React.

## Descripción General del Proyecto

- **Framework**: Laravel 12 + React 19 + TypeScript + Inertia.js
- **PHP**: 8.2+ con framework de pruebas Pest
- **Frontend**: React + TypeScript + Tailwind CSS v4 + componentes shadcn/ui
- **Autenticación**: Laravel Fortify con autenticación de dos factores
- **Autorización**: Spatie Laravel Permission para RBAC
- **Herramienta de Compilación**: Vite con plugin Wayfinder

## Comandos de Compilación / Lint / Pruebas

### PHP (Laravel)

```bash
# Ejecutar todas las pruebas
php artisan test

# Ejecutar archivo de prueba específico
php artisan test tests/Feature/ExampleTest.php

# Ejecutar pruebas con filtro
php artisan test --filter=nombreDelMetodo

# Lint de código PHP (auto-corrección)
composer lint

# Verificar estilo de código PHP (modo dry-run)
composer test:lint

# Suite completa de pruebas (lint + pruebas)
composer test
```

### JavaScript/TypeScript

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Compilar con SSR
npm run build:ssr

# Verificación de tipos
npm run types

# Lint y auto-corrección
npm run lint

# Formatear código
npm run format

# Verificar formateo
npm run format:check
```

### Desarrollo Combinado

```bash
# Iniciar todos los servicios de desarrollo (servidor Laravel, cola, logs, Vite)
composer dev

# Configurar proyecto nuevo
composer setup
```

## Directrices de Estilo de Código

### General

- **EditorConfig**: 4 espacios para la mayoría de archivos, 2 espacios para YAML
- **Fin de línea**: LF (estilo Unix)
- **Codificación**: UTF-8
- **Recortar espacios al final**: Sí (excepto Markdown)

### PHP

- **Estándar**: Laravel Pint (basado en PSR-12)
- **Indentación**: 4 espacios
- **Nombres de clases**: PascalCase (ej., `UserController`)
- **Nombres de métodos**: camelCase (ej., `storeUser`)
- **Nombres de propiedades**: camelCase
- **Constantes**: UPPER_SNAKE_CASE
- **Nombres de archivos**: Coincidir con nombre de clase (ej., `UserController.php`)

**Importaciones**:

- Usar nombres de clase completamente calificados en docblocks
- Agrupar importaciones: PHP Nativo, Laravel, Terceros, App
- Ordenadas alfabéticamente dentro de grupos

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
```

**Declaraciones de Tipos de Retorno**:

- Siempre declarar tipos de retorno en métodos
- Usar type hints adecuados para parámetros

```php
public function index(): Response
public function store(StoreUserRequest $request): RedirectResponse
```

### TypeScript / React

- **Indentación**: 4 espacios (2 para YAML)
- **Comillas**: Comillas simples
- **Punto y coma**: Requeridos
- **Ancho de impresión**: 80 caracteres
- **Longitud de línea**: Máximo 80 caracteres

**Nomenclatura**:

- **Componentes**: PascalCase (ej., `UserModal`, `Button`)
- **Funciones**: camelCase (ej., `handleSubmit`)
- **Constantes**: UPPER_SNAKE_CASE para constantes verdaderas
- **Tipos/Interfaces**: PascalCase con nombres descriptivos
- **Hooks**: camelCase comenzando con "use" (ej., `useClipboard`)
- **Archivos**: Coincidir con nombre de componente (ej., `UserModal.tsx`)

**Importaciones** (ordenadas automáticamente por Prettier):

1. React y librerías externas
2. Componentes internos (@/components)
3. Hooks (@/hooks)
4. Utilidades (@/lib)
5. Tipos (@/types)
6. Importaciones relativas al final

```typescript
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn } from '@/lib/utils';
import { User } from '@/types';
```

**Componentes React**:

- Usar declaraciones de función, no const
- Interfaz de props nombrada con sufijo "Props"
- Desestructurar props en el parámetro
- Usar `React.ComponentProps` para extensiones de elementos HTML

```typescript
interface UserModalProps {
    user: User | null;
    onClose: () => void;
}

function UserModal({ user, onClose }: UserModalProps) {
    // ...
}
```

**Tipos TypeScript**:

- Usar interfaces para formas de objetos
- Usar types para uniones/tipos complejos
- Exportar tipos compartidos desde `@/types/index.d.ts`
- Usar extensión `PageProps` para páginas Inertia

```typescript
interface UsersPageProps extends PageProps {
    users: {
        data: User[];
        links: any[];
    };
}
```

## Manejo de Errores

### PHP

- Validar entrada usando clases FormRequest
- Retornar redirect con mensajes flash para errores de formulario
- Usar declaraciones de retorno seguras por tipo
- Aprovechar el manejador de excepciones de Laravel

```php
public function store(StoreUserRequest $request): RedirectResponse
{
    try {
        $user = User::create($request->validated());
        return redirect()->back()->with('success', 'Usuario creado.');
    } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Error al crear usuario.');
    }
}
```

### React

- Usar el manejo de errores de Inertia para envíos de formularios
- Mostrar errores usando mensajes flash de Laravel
- Manejar errores asíncronos con try-catch
- Usar tipos de error TypeScript adecuados

```typescript
const handleDelete = (user: User) => {
    if (confirm('¿Estás seguro?')) {
        router.delete(`/users/${user.id}`);
    }
};
```

## Convenciones Clave

1. **Inertia.js**: Usar `Inertia.render()` en controladores, `usePage()` para datos compartidos
2. **Rutas**: Definir en `routes/web.php`, usar rutas nombradas
3. **Controladores**: Controladores de recursos excepto create/edit/show para rutas admin
4. **Validación**: Siempre usar clases FormRequest
5. **Componentes UI**: Usar componentes shadcn/ui desde `@/components/ui/`
6. **Estilos**: Tailwind CSS v4 con clases utilitarias
7. **Íconos**: Íconos Lucide React
8. **Formularios**: Formularios Inertia con validación del lado del servidor
9. **Notificaciones**: Usar sistema de notificaciones de Laravel con flash de Inertia

## Pruebas

- **Framework**: Pest (PHP)
- **Ubicación**: `tests/Feature/` y `tests/Unit/`
- **Base de datos**: Usar trait `RefreshDatabase` en Pest.php para pruebas Feature
- **Estilo**: Pruebas basadas en closures con nombres descriptivos

```php
it('returns a successful response', function () {
    $response = $this->get('/');
    $response->assertStatus(200);
});
```

## Organización de Archivos

```
app/
  Http/
    Controllers/       # Controladores de recursos
    Requests/          # Validación de peticiones de formulario
    Middleware/        # Middleware personalizado
  Models/              # Modelos Eloquent
  Actions/Fortify/     # Personalización de Fortify

resources/js/
  components/ui/       # Componentes shadcn/ui
  layouts/             # Layouts de páginas
  pages/               # Componentes de páginas Inertia
  hooks/               # Hooks personalizados de React
  lib/                 # Utilidades (utils.ts)
  types/               # Definiciones TypeScript

routes/
  web.php              # Rutas principales de la aplicación
  settings.php         # Rutas de configuración
  admin-commands.php   # Rutas de comandos de admin
```

## Notas Importantes

- Siempre ejecutar `composer test` y `npm run types` antes de hacer commit
- Usar alias de ruta `@/` para importaciones (configurado en vite.config.ts)
- Mantener componentes pequeños y enfocados en una sola responsabilidad
- Usar validación de Laravel para toda entrada de usuario
- Seguir patrones existentes en archivos similares
- Usar utilidad `cn()` para clases Tailwind condicionales
- Respetar reglas PSR-12 y ESLint
