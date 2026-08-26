# FORTIORI ABOGADOS S.A.S.

Sitio web corporativo - Arquitectura nativa sin WordPress

---

## 🏛️ ARQUITECTURA

**Frontend público**: HTML5 + CSS3 + JavaScript Vanilla (estático)
**Backend admin**: PHP 8+ + SQLite + JavaScript Vanilla (dinámico)
**Generador**: Templates PHP que convierten SQLite → HTML estático

Ver documentación detallada en `/docs/ARCHITECTURE.md`

---

## 📁 ESTRUCTURA

```
fortiori/
├── public_html/          # Directorio público web
│   ├── admin/            # Panel administrativo (PHP)
│   ├── assets/           # CSS, JS, imágenes públicas
│   ├── templates/        # Templates del generador
│   ├── uploads/          # Archivos subidos
│   └── [páginas]         # HTML estático
│
├── private/              # Fuera de public_html
│   ├── database/         # SQLite
│   ├── backups/          # Backups automáticos
│   ├── logs/             # Logs del sistema
│   └── config/           # Configuración
│
└── docs/                 # Documentación arquitectónica
```

---

## 📚 DOCUMENTACIÓN

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Arquitectura general del proyecto
- **[DATABASE.md](docs/DATABASE.md)** - Modelo de datos SQLite
- **[GENERATOR.md](docs/GENERATOR.md)** - Sistema de generación estática
- **[SECURITY.md](docs/SECURITY.md)** - Seguridad y protección
- **[BACKUPS_REDIRECTS.md](docs/BACKUPS_REDIRECTS.md)** - Backups y redirects 301
- **[MIGRATION.md](docs/MIGRATION.md)** - Guía de migración desde WordPress
- **[RISKS.md](docs/RISKS.md)** - Riesgos técnicos y mitigación

---

## 🚀 INSTALACIÓN

### Requisitos

- PHP 8.0+
- SQLite3 extension
- PDO extension
- Apache con mod_rewrite
- HTTPS disponible

### Pasos

1. **Clonar repositorio**
```bash
git clone [repo-url]
cd fortiori
```

2. **Crear base de datos**
```bash
cd private/database
sqlite3 fortiori.sqlite < schema.sql
```

3. **Configurar permisos**
```bash
chmod 755 public_html/
chmod 755 public_html/admin/
chmod 755 public_html/uploads/
chmod 600 private/database/fortiori.sqlite
chmod 700 private/backups/
chmod 700 private/logs/
```

4. **Configurar Apache**
- Apuntar DocumentRoot a `public_html/`
- Habilitar mod_rewrite
- Configurar HTTPS

5. **Cambiar password admin**
- Acceder a `/admin/login.php`
- Login: `admin`
- Password temporal: (ver documentación)
- **CAMBIAR INMEDIATAMENTE**

---

## 🛠️ DESARROLLO

### Fases del proyecto

El desarrollo se realiza en **21 fases secuenciales**:

- **FASE 0**: Auditoría y arquitectura ✅
- **FASE 1**: Fundación (CSS, componentes base)
- **FASE 2**: Layout global (header, footer)
- **FASE 3**: Home
- **FASE 4**: UGPP
- **FASE 5**: Colpensiones
- **FASE 6**: Empresa y Laboral
- **FASE 7**: Blog público
- **FASE 8**: Migración blog WordPress
- **FASE 9**: Login Admin
- **FASE 10**: Dashboard
- **FASE 11**: Editor
- **FASE 12**: Media Manager
- **FASE 13**: Generador estático
- **FASE 14**: Versiones y backups
- **FASE 15**: Cookies y formulario
- **FASE 16**: SEO técnico
- **FASE 17**: Apache y seguridad
- **FASE 18**: Responsive y accesibilidad
- **FASE 19**: Performance
- **FASE 20**: Staging y QA
- **FASE 21**: Migración producción

### Trabajar en una fase

```bash
# Leer la documentación de la fase
# Implementar los cambios
# Testing
# Commit
git add .
git commit -m "FASE X: [descripción]"
```

---

## 🔐 SEGURIDAD

Ver `/docs/SECURITY.md` para documentación completa.

**Checklist crítico**:
- [ ] SQLite protegido (fuera de public_html o con .htaccess)
- [ ] Password admin cambiado
- [ ] HTTPS habilitado
- [ ] Headers de seguridad configurados
- [ ] CSRF protection activo
- [ ] Rate limiting implementado
- [ ] Uploads validados

---

## 📊 DATOS CORPORATIVOS

**Razón social**: FORTIORI ABOGADOS S.A.S.
**NIT**: 901.013.525-1
**Dominio**: https://fortioriabogados.com
**Email**: contactenos@fortioriabogados.com
**WhatsApp**: +57 314 476 0999

Ver `/private/config/site.php` para configuración completa.

---

## 🧪 TESTING

### Antes de producción

```
[ ] Todas las páginas estáticas cargan
[ ] Admin funciona (login, crear post, publicar)
[ ] Imágenes se suben y optimizan
[ ] Generador crea HTML correctamente
[ ] Backups funcionan
[ ] Redirects funcionan
[ ] Formulario envía
[ ] WhatsApp funciona
[ ] SEO metadata correcta
[ ] Lighthouse > 90
[ ] Accesibilidad WCAG AA
[ ] HTTPS funciona
[ ] Responsive funciona
```

---

## 🚨 SOPORTE

Para problemas técnicos:
1. Revisar `/private/logs/errors.log`
2. Revisar `/private/logs/activity.log`
3. Verificar permisos de archivos
4. Verificar configuración Apache
5. Consultar documentación en `/docs/`

---

## 📝 LICENCIA

Propietario: FORTIORI ABOGADOS S.A.S.
Desarrollado para uso exclusivo de la firma.

---

## 🏗️ ESTADO DEL PROYECTO

**Versión actual**: 0.1.0-alpha
**Fase actual**: FASE 0 - Arquitectura completada
**Última actualización**: 2026-08-25

---

## 🎯 PRÓXIMOS PASOS

1. Esperar confirmación para iniciar **FASE 1**
2. Implementar fundación CSS
3. Desarrollar componentes base
4. Continuar según roadmap de fases

---

**Desarrollado con arquitectura limpia, segura y escalable.**
