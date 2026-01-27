# 🚀 Deploy en Render.com

Esta guía te ayudará a hacer deploy de la aplicación Community en Render.

## 📋 Requisitos Previos

- ✅ Cuenta en [Render.com](https://render.com)
- ✅ Repositorio Git (GitHub, GitLab, o Bitbucket)
- ✅ Código subido al repositorio

## 🔧 Pasos para Deploy

### 1. Preparar el Repositorio

Asegúrate de que todos los archivos estén commiteados:

```bash
git add .
git commit -m "Preparar para deploy en Render"
git push origin main
```

### 2. Crear Servicios en Render

#### Opción A: Deploy Automático con Blueprint (Recomendado)

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click en **"New +"** → **"Blueprint"**
3. Conecta tu repositorio
4. Render detectará automáticamente el archivo `render.yaml`
5. Click en **"Apply"**

Render creará automáticamente:
- ✅ Web Service (Laravel)
- ✅ PostgreSQL Database

#### Opción B: Deploy Manual

Si prefieres crear los servicios manualmente:

**2.1. Crear Base de Datos PostgreSQL**

1. Click en **"New +"** → **"PostgreSQL"**
2. Nombre: `community-db`
3. Database: `community`
4. Plan: **Free**
5. Click en **"Create Database"**

**2.2. Crear Web Service**

1. Click en **"New +"** → **"Web Service"**
2. Conecta tu repositorio
3. Configuración:
   - **Name**: `community-app`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Runtime**: Docker
   - **Build Command**: `./build.sh`
   - **Start Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`
   - **Plan**: Free

### 3. Configurar Variables de Entorno

En el Web Service, ve a **"Environment"** y agrega:

#### Variables Requeridas:

```env
APP_NAME=Community
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tu-app.onrender.com
APP_KEY=base64:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

DB_CONNECTION=pgsql
DB_HOST=[Copiar de la base de datos]
DB_PORT=[Copiar de la base de datos]
DB_DATABASE=[Copiar de la base de datos]
DB_USERNAME=[Copiar de la base de datos]
DB_PASSWORD=[Copiar de la base de datos]

SESSION_DRIVER=file
CACHE_DRIVER=file
QUEUE_CONNECTION=sync

MAIL_MAILER=smtp
MAIL_FROM_ADDRESS=hello@example.com
MAIL_FROM_NAME=Community
```

#### Generar APP_KEY:

```bash
php artisan key:generate --show
```

Copia el resultado y úsalo en `APP_KEY`.

### 4. Deploy

1. Render detectará cambios automáticamente
2. El build tomará 5-10 minutos la primera vez
3. Una vez completado, tu app estará en: `https://community-app.onrender.com`

## 🔄 Deploys Futuros

Cada vez que hagas `git push` a la rama `main`, Render automáticamente:

1. ✅ Ejecutará el build
2. ✅ Instalará dependencias
3. ✅ Compilará assets
4. ✅ Ejecutará migraciones
5. ✅ Optimizará la aplicación

## 📊 Monitoreo

- **Logs**: Dashboard → Tu servicio → "Logs"
- **Métricas**: Dashboard → Tu servicio → "Metrics"
- **Shell**: Dashboard → Tu servicio → "Shell"

## 🐛 Troubleshooting

### Error: "APP_KEY not set"
```bash
# Genera una nueva key
php artisan key:generate --show
# Agrégala en Environment variables
```

### Error: "Database connection failed"
- Verifica que las credenciales de la BD estén correctas
- Asegúrate de que el servicio web y la BD estén en la misma región

### Error: "Build failed"
- Revisa los logs en Render
- Verifica que `build.sh` tenga permisos de ejecución
- Asegúrate de que todas las dependencias estén en `composer.json`

### Assets no se cargan
- Verifica que `npm run build` se ejecutó correctamente
- Revisa que `VITE_APP_NAME` esté configurado
- Asegúrate de que `APP_URL` sea correcto

## 🔒 Seguridad

- ✅ Nunca commitees el archivo `.env`
- ✅ Usa variables de entorno en Render
- ✅ Mantén `APP_DEBUG=false` en producción
- ✅ Usa HTTPS (Render lo proporciona gratis)

## 💰 Costos

**Plan Free:**
- ✅ Web Service: Gratis (con limitaciones)
- ✅ PostgreSQL: 90 días gratis, luego $7/mes
- ⚠️ El servicio se duerme después de 15 min de inactividad
- ⚠️ 750 horas/mes de uso

**Plan Starter ($7/mes):**
- ✅ Sin sleep
- ✅ Más recursos
- ✅ Mejor rendimiento

## 📚 Recursos

- [Documentación de Render](https://render.com/docs)
- [Laravel Deployment](https://laravel.com/docs/deployment)
- [Render Community](https://community.render.com)

## ✅ Checklist Final

Antes de hacer deploy, verifica:

- [ ] Código subido a Git
- [ ] `build.sh` tiene permisos de ejecución
- [ ] `.env.example` está actualizado
- [ ] Migraciones están listas
- [ ] Assets compilados localmente (para verificar)
- [ ] Variables de entorno configuradas en Render
- [ ] `APP_KEY` generado
- [ ] Base de datos creada

---

¡Listo! Tu aplicación debería estar corriendo en Render 🎉
