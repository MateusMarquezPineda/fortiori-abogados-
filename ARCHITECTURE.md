# ARQUITECTURA FORTIORI ABOGADOS S.A.S.

## PRINCIPIO FUNDAMENTAL

```
FRONTEND PÚBLICO = SITIO ESTÁTICO MULTIPÁGINA (HTML/CSS/JS)
BACKEND ADMIN = DINÁMICO (PHP 8+ / SQLite)
GENERADOR = Convierte contenido de SQLite → HTML estático
```

## ÁRBOL DEL PROYECTO

```
fortiori/
│
├── public_html/                              # Directorio público web
│   │
│   ├── index.html                            # Home
│   │
│   ├── ugpp/
│   │   └── index.html                        # Fiscalización UGPP
│   │
│   ├── depuracion-de-deuda-real-y-presunta-de-colpensiones/
│   │   └── index.html                        # Depuración Colpensiones
│   │
│   ├── la-empresa-y-el-empresario/
│   │   └── index.html                        # Derecho Empresarial
│   │
│   ├── derecho-laboral-y-seguridad-social/
│   │   └── index.html                        # Derecho Laboral
│   │
│   ├── blog/
│   │   └── index.html                        # Índice del blog
│   │
│   ├── contacto/
│   │   └── index.html                        # Formulario contacto
│   │
│   ├── politicas-de-privacidad/
│   │   └── index.html                        # Privacidad
│   │
│   ├── terminos-y-condiciones/
│   │   └── index.html                        # Términos
│   │
│   ├── {article-slug}/                       # Artículos del blog (generados)
│   │   └── index.html                        # URL: /article-slug/
│   │
│   ├── admin/                                # PANEL ADMINISTRATIVO
│   │   │
│   │   ├── index.php                         # Redirect a dashboard/login
│   │   ├── login.php                         # Autenticación
│   │   ├── logout.php                        # Cerrar sesión
│   │   ├── dashboard.php                     # Panel principal
│   │   │
│   │   ├── posts.php                         # Listado de publicaciones
│   │   ├── post-create.php                   # Crear artículo
│   │   ├── post-edit.php                     # Editar artículo
│   │   ├── post-delete.php                   # Eliminar (a papelera)
│   │   ├── post-preview.php                  # Vista previa
│   │   │
│   │   ├── media.php                         # Gestor de medios
│   │   ├── media-upload.php                  # Upload de archivos
│   │   │
│   │   ├── users.php                         # Gestión usuarios
│   │   ├── user-create.php                   # Crear usuario
│   │   ├── user-edit.php                     # Editar usuario
│   │   │
│   │   ├── settings.php                      # Configuración
│   │   ├── redirects.php                     # Gestión 301
│   │   ├── backups.php                       # Gestión backups
│   │   ├── activity-log.php                  # Log actividad
│   │   │
│   │   ├── api/                              # Endpoints API REST
│   │   │   ├── post-save.php                 # Guardar artículo
│   │   │   ├── post-publish.php              # Publicar artículo
│   │   │   ├── post-trash.php                # Mover a papelera
│   │   │   ├── post-restore.php              # Restaurar
│   │   │   ├── media-upload.php              # Subir imagen
│   │   │   ├── media-delete.php              # Eliminar imagen
│   │   │   ├── generate-slug.php             # Generar slug automático
│   │   │   ├── check-slug.php                # Validar slug único
│   │   │   └── auth-check.php                # Verificar sesión
│   │   │
│   │   ├── includes/                         # Lógica PHP compartida
│   │   │   ├── config.php                    # Configuración admin
│   │   │   ├── db.php                        # Conexión SQLite
│   │   │   ├── auth.php                      # Sistema autenticación
│   │   │   ├── session.php                   # Manejo de sesiones
│   │   │   ├── csrf.php                      # Protección CSRF
│   │   │   ├── rate-limit.php                # Rate limiting
│   │   │   ├── sanitize.php                  # Sanitización inputs
│   │   │   ├── validation.php                # Validaciones
│   │   │   ├── image-processor.php           # Procesamiento imágenes
│   │   │   ├── backup.php                    # Sistema backups
│   │   │   ├── logger.php                    # Sistema logs
│   │   │   └── generator.php                 # GENERADOR ESTÁTICO
│   │   │
│   │   ├── templates/                        # Templates del admin
│   │   │   ├── header.php                    # Header admin
│   │   │   ├── footer.php                    # Footer admin
│   │   │   ├── nav.php                       # Navegación admin
│   │   │   └── alerts.php                    # Mensajes sistema
│   │   │
│   │   └── assets/                           # Assets del admin
│   │       ├── css/
│   │       │   └── admin.css                 # Estilos admin
│   │       ├── js/
│   │       │   ├── admin.js                  # JS común admin
│   │       │   ├── editor.js                 # Editor contenido
│   │       │   ├── media-manager.js          # Gestor medios
│   │       │   └── seo-checker.js            # Validador SEO
│   │       └── icons/
│   │
│   ├── assets/                               # ASSETS PÚBLICOS
│   │   │
│   │   ├── css/
│   │   │   ├── reset.css                     # Reset CSS
│   │   │   ├── variables.css                 # Variables globales
│   │   │   ├── typography.css                # Tipografía
│   │   │   ├── layout.css                    # Layout global
│   │   │   ├── components.css                # Componentes
│   │   │   ├── utilities.css                 # Utilidades
│   │   │   └── main.css                      # Import principal
│   │   │
│   │   ├── js/
│   │   │   ├── main.js                       # JS principal
│   │   │   ├── nav.js                        # Navegación móvil
│   │   │   ├── blog-filters.js               # Filtros blog
│   │   │   ├── search.js                     # Buscador
│   │   │   ├── cookies.js                    # Consentimiento cookies
│   │   │   ├── contact-form.js               # Formulario contacto
│   │   │   └── analytics.js                  # Eventos analítica
│   │   │
│   │   ├── images/
│   │   │   ├── logo.svg                      # Logo Fortiori
│   │   │   ├── og-default.jpg                # Imagen OG default
│   │   │   └── hero/                         # Imágenes hero
│   │   │
│   │   ├── icons/
│   │   │   ├── favicon.ico
│   │   │   ├── favicon-32x32.png
│   │   │   ├── favicon-16x16.png
│   │   │   ├── apple-touch-icon.png
│   │   │   └── site.webmanifest
│   │   │
│   │   └── fonts/                            # Fuentes (si se usan locales)
│   │
│   ├── uploads/                              # ARCHIVOS SUBIDOS
│   │   ├── 2026/
│   │   │   ├── 08/
│   │   │   │   ├── imagen-original.jpg
│   │   │   │   ├── imagen-1200.webp
│   │   │   │   ├── imagen-768.webp
│   │   │   │   ├── imagen-480.webp
│   │   │   │   └── imagen-thumbnail.webp
│   │   │   └── 09/
│   │   │       └── ...
│   │   └── .htaccess                         # Protección directa
│   │
│   ├── templates/                            # TEMPLATES GENERADOR
│   │   ├── article.php                       # Template artículo
│   │   ├── blog-index.php                    # Template índice blog
│   │   ├── sitemap.php                       # Template sitemap
│   │   ├── feed.php                          # Template RSS
│   │   ├── search-index.php                  # Template search JSON
│   │   └── partials/
│   │       ├── head.php                      # <head> común
│   │       ├── header.php                    # Header público
│   │       ├── footer.php                    # Footer público
│   │       ├── breadcrumb.php                # Breadcrumb
│   │       ├── related-posts.php             # Posts relacionados
│   │       └── disclaimer.php                # Disclaimer jurídico
│   │
│   ├── sitemap.xml                           # Sitemap (generado)
│   ├── feed.xml                              # RSS (generado)
│   ├── search-index.json                     # Índice búsqueda (generado)
│   ├── robots.txt                            # Robots.txt
│   ├── 404.html                              # Página error 404
│   └── .htaccess                             # Config Apache
│
├── private/                                  # FUERA DE public_html
│   │
│   ├── database/
│   │   ├── fortiori.sqlite                   # Base de datos principal
│   │   └── schema.sql                        # Schema SQL
│   │
│   ├── backups/                              # Backups automáticos
│   │   ├── db/
│   │   │   ├── fortiori-2026-08-25-143000.sqlite
│   │   │   └── ...
│   │   └── posts/
│   │       ├── article-slug-2026-08-25-143000.html
│   │       └── ...
│   │
│   ├── logs/
│   │   ├── activity.log                      # Log actividad admin
│   │   ├── auth.log                          # Log autenticación
│   │   ├── errors.log                        # Log errores PHP
│   │   └── rate-limit.log                    # Log rate limiting
│   │
│   ├── config/
│   │   ├── site.php                          # Datos corporativos
│   │   ├── redirects.json                    # Redirects 301
│   │   └── settings.json                     # Settings generales
│   │
│   └── migrations/                           # Migración WordPress
│       ├── wordpress-export.xml              # Export WP
│       ├── urls-inventory.csv                # Inventario URLs
│       ├── media-inventory.csv               # Inventario media
│       └── migration-script.php              # Script migración
│
└── docs/                                     # DOCUMENTACIÓN
    ├── ARCHITECTURE.md                       # Este archivo
    ├── DATABASE.md                           # Schema base de datos
    ├── GENERATOR.md                          # Lógica generador
    ├── SECURITY.md                           # Seguridad
    ├── DEPLOYMENT.md                         # Despliegue
    └── MIGRATION.md                          # Guía migración WP
```

## FLUJO DE PUBLICACIÓN

```
EDITOR (admin)
    ↓
Escribe artículo
    ↓
Guarda en SQLite
    ↓
Presiona "PUBLICAR"
    ↓
generator.php ejecuta:
    1. Validar datos
    2. Crear backup HTML anterior (si existe)
    3. Crear backup SQLite
    4. Generar HTML desde template
    5. Guardar temporalmente
    6. Validar HTML generado
    7. Mover atómicamente a /{slug}/index.html
    8. Regenerar /blog/index.html
    9. Regenerar sitemap.xml
    10. Regenerar feed.xml
    11. Regenerar search-index.json
    12. Registrar actividad
    13. Retornar éxito
    ↓
VISITANTE
    ↓
Accede a /article-slug/
    ↓
Apache sirve index.html (ESTÁTICO)
    ↓
Sin consulta a SQLite
    ↓
Velocidad máxima
```

## SEPARACIÓN DE RESPONSABILIDADES

### FRONTEND PÚBLICO
- **Tecnología**: HTML5 + CSS3 + JS Vanilla
- **Datos**: Archivos estáticos generados
- **Base de datos**: NO consulta SQLite
- **SEO**: Optimizado para rastreo
- **Performance**: Máxima velocidad

### BACKEND ADMIN
- **Tecnología**: PHP 8+ + SQLite + JS Vanilla
- **Datos**: SQLite como fuente de verdad
- **Usuarios**: Autenticación + sesiones
- **Generador**: Convierte SQLite → HTML
- **Seguridad**: Máxima protección

## PRINCIPIOS ARQUITECTÓNICOS

1. **Separación Frontend/Backend**: El público NO debe depender de PHP/SQLite
2. **Generación estática**: Artículos se generan como HTML físico
3. **Fuente única de verdad**: SQLite almacena el contenido maestro
4. **Publicación atómica**: Nunca dejar archivos incompletos
5. **Backups automáticos**: Antes de cada operación destructiva
6. **Seguridad por capas**: Validación + sanitización + protección Apache
7. **Sin dependencias externas**: Minimizar Composer/npm
8. **Código nativo**: No frameworks pesados
9. **SEO-first**: URLs amigables, semántica, schema
10. **Performance-first**: Core Web Vitals como prioridad

## DECISIONES TÉCNICAS CLAVE

### ¿Por qué SQLite?
- No requiere servidor MySQL
- Fácil backup (un solo archivo)
- Suficiente para volumen de contenido
- Portable
- Menos superficie de ataque

### ¿Por qué generación estática?
- Máxima velocidad
- Mejor SEO
- Menor carga servidor
- Mayor seguridad
- Cacheable indefinidamente

### ¿Por qué sin frameworks?
- Menor peso
- Mayor control
- Más rápido
- Menos dependencias
- Código mantenible a largo plazo

### ¿Por qué templates PHP para generación?
- Familiaridad del equipo
- Control total sobre HTML
- Sin compilación adicional
- Fácil debug
- Output predecible
