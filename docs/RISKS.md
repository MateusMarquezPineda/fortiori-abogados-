# RIESGOS TÉCNICOS Y MITIGACIÓN

## CLASIFICACIÓN DE RIESGOS

```
CRÍTICO: Puede detener el proyecto o causar pérdida de datos/negocio
ALTO: Puede causar problemas significativos
MEDIO: Puede causar inconvenientes manejables
BAJO: Puede causar molestias menores
```

---

## 1. RIESGOS DE ARQUITECTURA

### RIESGO: SQLite no escala para alto tráfico de escritura

**Severidad**: MEDIO
**Probabilidad**: BAJA (el sitio es principalmente lectura)

**Descripción**:
SQLite no maneja bien escrituras concurrentes masivas. Si múltiples usuarios escriben simultáneamente, puede haber bloqueos.

**Impacto**:
- Lentitud en el admin
- Conflictos de escritura
- Database locks

**Mitigación**:
- El diseño separa lectura (estático) de escritura (admin)
- Solo 1-2 usuarios escribirán simultáneamente
- Backups automáticos previenen pérdida de datos
- Si escala, migrar a MySQL/PostgreSQL es posible

**Aceptable**: ✅ SÍ (para el caso de uso actual)

---

### RIESGO: Generación de HTML falla y deja página rota

**Severidad**: ALTO
**Probabilidad**: MEDIA

**Descripción**:
Si el generador falla durante la publicación, podría dejar una página incompleta o eliminar la anterior sin crear la nueva.

**Impacto**:
- URL retorna 404 o HTML roto
- Pérdida de SEO
- Mala experiencia de usuario

**Mitigación**:
- **Publicación atómica**: Escribir a `.tmp` primero, validar, luego `rename()` atómico
- **Backups automáticos** antes de publicar
- **Validación de HTML** antes de sustituir
- **Rollback automático** si falla
- **Logging detallado** de errores

**Aceptable**: ✅ SÍ (con mitigaciones implementadas)

---

### RIESGO: Templates PHP tienen errores y generan HTML inválido

**Severidad**: MEDIO
**Probabilidad**: MEDIA

**Descripción**:
Errores en templates pueden generar HTML roto, warnings PHP visibles, o estructura incorrecta.

**Impacto**:
- HTML inválido
- SEO afectado
- Renderizado roto

**Mitigación**:
- **Testing exhaustivo** de templates
- **Validación automática** de HTML generado
- **Error handling** en templates
- **Display_errors = Off** en producción
- **Error logging** a archivo
- **Preview** antes de publicar

**Aceptable**: ✅ SÍ (con testing adecuado)

---

## 2. RIESGOS DE SEGURIDAD

### RIESGO: SQLite accesible públicamente

**Severidad**: CRÍTICO
**Probabilidad**: ALTA (si no se protege)

**Descripción**:
Si SQLite está en `public_html/` y no se protege con Apache, puede descargarse directamente.

**Impacto**:
- **PÉRDIDA TOTAL DE DATOS**
- Passwords de usuarios
- Contenido no publicado
- Información confidencial

**Mitigación**:
1. **Opción A (ideal)**: Almacenar fuera de `public_html/` en `private/`
2. **Opción B**: Proteger con `.htaccess`:
```apache
<FilesMatch "\.(sqlite|db)$">
    Require all denied
</FilesMatch>
```
3. **Verificación en checklist** pre-producción
4. **Monitoreo** de intentos de acceso

**Aceptable**: ✅ SÍ (SOLO con mitigación implementada)

---

### RIESGO: Admin sin autenticación robusta

**Severidad**: CRÍTICO
**Probabilidad**: ALTA (si no se implementa bien)

**Descripción**:
Admin vulnerable a brute force, session hijacking, CSRF.

**Impacto**:
- Acceso no autorizado
- Modificación de contenido
- Eliminación de datos
- Inyección de malware

**Mitigación**:
- **Password hashing** (Argon2id/bcrypt)
- **HTTPS obligatorio**
- **Sesiones seguras** (HttpOnly, Secure, SameSite)
- **CSRF tokens** en todos los forms
- **Rate limiting** en login
- **Bloqueo por intentos fallidos**
- **2FA** (futura feature)
- **Logging** de accesos
- **Session timeout**

**Aceptable**: ✅ SÍ (con todas las mitigaciones)

---

### RIESGO: XSS en contenido del editor

**Severidad**: ALTO
**Probabilidad**: MEDIA

**Descripción**:
Usuarios malintencionados (o comprometidos) inyectan JavaScript malicioso en artículos.

**Impacto**:
- Robo de sesiones
- Redirección a sitios maliciosos
- Desfiguración del sitio

**Mitigación**:
- **Sanitización** de HTML en servidor
- **Whitelist** de tags permitidos
- **Eliminación** de `<script>`, `onclick`, etc.
- **Content Security Policy**
- **Escapar output** en templates
- **Validación** de URLs en links/imágenes

**Aceptable**: ✅ SÍ (con sanitización robusta)

---

### RIESGO: SQL Injection

**Severidad**: CRÍTICO
**Probabilidad**: BAJA (si se usan prepared statements)

**Descripción**:
Inputs no sanitizados permiten inyección SQL.

**Impacto**:
- Lectura de datos sensibles
- Modificación de datos
- Eliminación de datos
- Bypass de autenticación

**Mitigación**:
- **NUNCA concatenar SQL**
- **SIEMPRE usar prepared statements**
- **Validación de inputs**
- **Escapar outputs**

**Aceptable**: ✅ SÍ (con prepared statements siempre)

---

### RIESGO: File Upload malicioso

**Severidad**: ALTO
**Probabilidad**: MEDIA

**Descripción**:
Upload de PHP disfrazado de imagen, SVG con JavaScript, archivos demasiado grandes.

**Impacto**:
- Ejecución de código arbitrario
- Acceso al servidor
- DoS por espacio en disco

**Mitigación**:
- **Validación de MIME real** (no extensión)
- **Solo permitir**: jpg, png, webp, avif
- **NO permitir**: php, svg (sin validación), exe
- **Renombrar archivos** subidos
- **Límite de tamaño** (5MB)
- **Proteger `/uploads/` con `.htaccess** para no ejecutar PHP
- **Validación de dimensiones** de imagen

**Aceptable**: ✅ SÍ (con validación estricta)

---

## 3. RIESGOS DE PERFORMANCE

### RIESGO: Imágenes sin optimizar

**Severidad**: MEDIO
**Probabilidad**: ALTA (si no se implementa procesamiento)

**Descripción**:
Usuarios suben imágenes de 5MB+ sin comprimir.

**Impacto**:
- Lighthouse score bajo
- Experiencia lenta
- Ancho de banda desperdiciado
- Hosting storage lleno

**Mitigación**:
- **Procesamiento automático** al subir
- **Generación de variantes** (1200w, 768w, 480w)
- **Conversión a WebP/AVIF**
- **Compresión** automática
- **Lazy loading**
- **srcset** en templates
- **Advertencia** en UI si archivo es muy grande

**Aceptable**: ✅ SÍ (con procesamiento automático)

---

### RIESGO: CSS/JS sin minificar

**Severidad**: BAJO
**Probabilidad**: ALTA (en desarrollo)

**Descripción**:
Assets sin comprimir aumentan peso de páginas.

**Impacto**:
- Lighthouse score menor
- Carga ligeramente más lenta

**Mitigación**:
- **Minificar** CSS/JS antes de producción
- **Combinar** archivos cuando posible
- **Gzip/Brotli** en servidor
- **Cache headers** adecuados

**Aceptable**: ✅ SÍ (minificar antes de launch)

---

## 4. RIESGOS DE SEO

### RIESGO: Pérdida de posicionamiento en migración

**Severidad**: ALTO
**Probabilidad**: MEDIA

**Descripción**:
Cambio de URLs, redirects mal configurados, o contenido modificado causa drop en rankings.

**Impacto**:
- Pérdida de tráfico orgánico
- Pérdida de ingresos
- Tiempo de recuperación: 1-3 meses

**Mitigación**:
- **Preservar URLs exactas** de posts
- **Redirects 301** para URLs que cambian
- **Sitemap actualizado**
- **Search Console** configurado
- **Canonical tags** correctos
- **Metadata SEO** preservada
- **Schema.org** implementado
- **Testing en staging**
- **Monitoreo post-migración**

**Aceptable**: ✅ SÍ (con estrategia de migración cuidadosa)

---

### RIESGO: Contenido duplicado

**Severidad**: MEDIO
**Probabilidad**: BAJA

**Descripción**:
Múltiples URLs apuntan al mismo contenido (con/sin trailing slash, http/https, www/non-www).

**Impacto**:
- Penalización de Google
- Rankings diluidos

**Mitigación**:
- **Canonical tags**
- **Redirects** a versión canónica
- **Sitemap** solo con URLs canónicas
- **Consistencia** en links internos

**Aceptable**: ✅ SÍ (con canonicals y redirects)

---

## 5. RIESGOS DE HOSTING

### RIESGO: cPanel/Hosting no soporta requisitos

**Severidad**: ALTO
**Probabilidad**: BAJA

**Descripción**:
Hosting no tiene PHP 8+, SQLite, mod_rewrite, o permisos adecuados.

**Impacto**:
- Proyecto no funciona
- Necesidad de cambiar hosting
- Delay en lanzamiento

**Mitigación**:
- **Verificar requisitos** con hosting antes de desarrollar:
  - PHP 8.0+
  - SQLite3 extension
  - PDO extension
  - mod_rewrite
  - .htaccess permitido
  - Permisos de escritura en directorios
  - HTTPS disponible
- **Alternativa**: VPS si shared hosting no cumple

**Aceptable**: ✅ SÍ (verificar antes de iniciar)

---

### RIESGO: Backup del hosting inadecuado

**Severidad**: MEDIO
**Probabilidad**: MEDIA

**Descripción**:
Hosting no hace backups automáticos o los backups no son confiables.

**Impacto**:
- Pérdida de datos en caso de fallo de servidor
- Imposibilidad de recuperación

**Mitigación**:
- **Sistema de backups propio** (ya diseñado)
- **Backups automáticos** locales
- **Descargar backups** periódicamente
- **Storage externo** (Google Drive, Dropbox)
- **Verificar** que backups del hosting funcionan

**Aceptable**: ✅ SÍ (con backups propios)

---

## 6. RIESGOS DE DESARROLLO

### RIESGO: Complejidad del generador estático

**Severidad**: MEDIO
**Probabilidad**: MEDIA

**Descripción**:
Sistema de generación tiene bugs, lógica compleja, o es difícil de mantener.

**Impacto**:
- Publicaciones fallan
- Difícil depurar
- Difícil agregar features

**Mitigación**:
- **Código modular** y bien documentado
- **Testing exhaustivo**
- **Logging detallado**
- **Validaciones en cada paso**
- **Operaciones atómicas**
- **Documentación clara** (como GENERATOR.md)

**Aceptable**: ✅ SÍ (con código limpio y testing)

---

### RIESGO: Falta de versionado de código

**Severidad**: MEDIO
**Probabilidad**: BAJA (si se usa Git)

**Descripción**:
Cambios sin control de versiones causan pérdida de código o imposibilidad de revertir.

**Impacto**:
- Pérdida de trabajo
- Bugs irrecuperables
- Imposibilidad de colaboración

**Mitigación**:
- **Git** desde el inicio
- **Commits frecuentes**
- **Branches** para features
- **Remote backup** (GitHub, GitLab)
- **.gitignore** para SQLite y uploads

**Aceptable**: ✅ SÍ (usar Git)

---

### RIESGO: Falta de documentación

**Severidad**: MEDIO
**Probabilidad**: ALTA (sin esfuerzo consciente)

**Descripción**:
Código sin documentar es difícil de mantener a futuro.

**Impacto**:
- Tiempo perdido entendiendo código
- Errores al modificar
- Imposibilidad de delegar

**Mitigación**:
- **Documentación arquitectónica** (✅ ya creada)
- **Comentarios en código complejo**
- **README** en cada módulo
- **Ejemplos de uso**

**Aceptable**: ✅ SÍ (documentación en progreso)

---

## 7. RIESGOS DE USUARIO

### RIESGO: Usuario admin compromete su password

**Severidad**: ALTO
**Probabilidad**: BAJA

**Descripción**:
Phishing, keylogger, o password débil.

**Impacto**:
- Acceso no autorizado
- Modificación de contenido
- Posible inyección de malware

**Mitigación**:
- **Educación** del usuario
- **Password fuerte** obligatorio
- **2FA** (futura implementación)
- **Logging** de actividad
- **Alertas** de login desde IPs nuevas
- **Cambio periódico** de password

**Aceptable**: ✅ SÍ (con educación y logging)

---

### RIESGO: Usuario elimina contenido importante por error

**Severidad**: MEDIO
**Probabilidad**: MEDIA

**Descripción**:
Click accidental en "Eliminar", o malentendido.

**Impacto**:
- Pérdida de contenido
- Tiempo perdido recreando

**Mitigación**:
- **Confirmación** antes de eliminar
- **Papelera** (soft delete)
- **Backups automáticos**
- **Versionado** de posts
- **Restauración fácil**

**Aceptable**: ✅ SÍ (con papelera y backups)

---

## 8. RIESGOS DE NEGOCIO

### RIESGO: Cliente no aprueba diseño/funcionalidad

**Severidad**: MEDIO
**Probabilidad**: BAJA (si hay comunicación)

**Descripción**:
Expectativas no alineadas, diseño no es lo esperado.

**Impacto**:
- Rehacer trabajo
- Delay en lanzamiento
- Frustración

**Mitigación**:
- **Trabajar por fases** (✅ ya definido)
- **Validación** al final de cada fase
- **Screenshots/demos** frecuentes
- **Staging** para revisión
- **Comunicación clara**

**Aceptable**: ✅ SÍ (con metodología por fases)

---

## RESUMEN DE RIESGOS CRÍTICOS

| Riesgo | Severidad | Mitigación OBLIGATORIA |
|--------|-----------|------------------------|
| SQLite público | CRÍTICO | Almacenar en `private/` o proteger con Apache |
| Admin sin auth | CRÍTICO | Implementar todas las medidas de seguridad |
| SQL Injection | CRÍTICO | SIEMPRE usar prepared statements |
| Publicación rota | ALTO | Operaciones atómicas + backups + validación |
| XSS | ALTO | Sanitización estricta de HTML |
| Upload malicioso | ALTO | Validación MIME real + protección Apache |
| SEO drop | ALTO | Estrategia de migración cuidadosa |

---

## CRITERIOS DE ACEPTACIÓN

Un riesgo es aceptable si:

1. ✅ Se han implementado todas las mitigaciones
2. ✅ El impacto residual es tolerable
3. ✅ Existe un plan de contingencia
4. ✅ Se monitorea activamente

---

## PLAN DE CONTINGENCIA GENERAL

En caso de fallo catastrófico:

1. **Activar modo mantenimiento**
2. **Restaurar último backup**
3. **Verificar integridad**
4. **Analizar causa raíz**
5. **Corregir problema**
6. **Testing exhaustivo**
7. **Relanzar**
8. **Post-mortem** documentado

---

## MONITOREO CONTINUO

Implementar alertas para:

- ❌ 404s inesperados
- ❌ 500 errors
- ❌ Login attempts fallidos masivos
- ❌ Disk space bajo
- ❌ Site down
- ❌ Drop súbito en tráfico
- ❌ Search Console errors

Herramientas:
- UptimeRobot
- Google Search Console
- Server logs
- Custom logging

---

## CONCLUSIÓN

**El proyecto es técnicamente viable** si:

1. ✅ Se implementan todas las mitigaciones de seguridad
2. ✅ Se sigue la arquitectura definida
3. ✅ Se valida exhaustivamente en staging
4. ✅ Se ejecuta plan de migración cuidadoso
5. ✅ Se monitorea post-lanzamiento

**Riesgos totalmente inaceptables**: NINGUNO (todos tienen mitigación viable)

**Riesgos que requieren atención especial**:
- Seguridad del admin
- Protección de SQLite
- Estrategia de migración SEO
- Validación de publicaciones
