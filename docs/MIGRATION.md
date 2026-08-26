# MIGRACIÓN DESDE WORDPRESS

## PRINCIPIO FUNDAMENTAL

**No borrar WordPress hasta completar y validar totalmente la migración.**

Trabajar en staging primero, validar exhaustivamente, y solo después migrar a producción.

---

## FASE PRE-MIGRACIÓN

### 1. AUDITORÍA COMPLETA DE WORDPRESS

#### A. Inventario de contenido

```
- Total de páginas estáticas
- Total de posts del blog
- Total de categorías
- Total de tags
- Total de usuarios/autores
- Total de imágenes en media library
- Total de PDFs u otros archivos
- Total de comentarios (si aplica)
```

#### B. Inventario de URLs

Crear listado completo:

```csv
URL,Type,Status,Title
/,page,published,Home
/ugpp/,page,published,UGPP
/blog/,archive,published,Blog
/nueva-jornada-laboral-en-colombia/,post,published,Nueva jornada laboral
...
```

**Herramientas**:
- Screaming Frog SEO Spider
- Export manual desde WordPress
- Sitemap.xml actual
- Google Search Console

#### C. Inventario de Media

```csv
ID,Filename,URL,Used_In_Posts,Alt_Text
123,imagen-1.jpg,/wp-content/uploads/2024/01/imagen-1.jpg,"[45,67,89]",Descripción
...
```

#### D. Metadata SEO

Si usan Yoast SEO o similar:

```csv
Post_ID,SEO_Title,Meta_Description,Canonical,Focus_Keyword
123,Título optimizado,Descripción meta...,https://...,keyword
...
```

#### E. Redirects existentes

Verificar si hay redirects configurados en:
- Plugins (Redirection, etc.)
- .htaccess
- Configuración del servidor

---

### 2. BACKUPS COMPLETOS

```
✅ Backup de archivos WordPress completos
✅ Backup de base de datos MySQL/MariaDB
✅ Backup de .htaccess
✅ Backup de wp-content/uploads/
✅ Export XML de WordPress (Tools → Export)
✅ Screenshots de páginas importantes
✅ Export de Google Analytics (últimos 12 meses)
✅ Export de Search Console (URLs, keywords)
```

Guardar todo en:

```
private/migrations/wordpress-backup-[fecha]/
```

---

### 3. ANÁLISIS DE TRÁFICO ACTUAL

Documentar:

```
- Páginas más visitadas
- Posts más visitados
- URLs con más backlinks
- Keywords que generan tráfico
- Fuentes de tráfico principales
```

Estas URLs son **críticas** y no pueden romperse.

---

## FASE DE DESARROLLO

### 4. INSTALACIÓN EN STAGING

Crear subdominio:

```
staging.fortioriabogados.com
```

Configurar:

```apache
# Bloquear indexación
Header set X-Robots-Tag "noindex, nofollow"
```

```html
<meta name="robots" content="noindex,nofollow">
```

Opcionalmente proteger con HTTP Auth.

---

### 5. MIGRACIÓN DE CONTENIDO

#### A. Migrar páginas estáticas manualmente

**NO automatizar** estas páginas críticas:

```
/
/ugpp/
/depuracion-de-deuda-real-y-presunta-de-colpensiones/
/la-empresa-y-el-empresario/
/derecho-laboral-y-seguridad-social/
/contacto/
/politicas-de-privacidad/
/terminos-y-condiciones/
```

Reconstruir desde cero con el nuevo diseño, mejorando:
- Estructura HTML semántica
- SEO on-page
- Performance
- Accesibilidad
- Jerarquía visual
- CTAs

Preservar:
- URLs exactas
- Títulos SEO
- Meta descriptions
- Contenido principal
- Schema.org existente (si es válido)

---

#### B. Migrar posts del blog (SCRIPT PHP)

Crear:

```
private/migrations/import-wordpress.php
```

**Pseudocódigo**:

```php
<?php

// 1. Cargar WordPress Export XML
$xml = simplexml_load_file('wordpress-export.xml');

// 2. Conectar a SQLite nuevo
$db = new PDO('sqlite:../database/fortiori.sqlite');

// 3. Obtener namespace de WordPress
$namespaces = $xml->getNamespaces(true);

// 4. Iterar posts
foreach ($xml->channel->item as $item) {
    // Filtrar solo posts (no páginas)
    $post_type = $item->children($namespaces['wp'])->post_type;
    if ($post_type != 'post') continue;

    // Filtrar solo publicados
    $status = $item->children($namespaces['wp'])->status;
    if ($status != 'publish') continue;

    // Extraer datos
    $title = (string) $item->title;
    $content = (string) $item->children($namespaces['content'])->encoded;
    $excerpt = (string) $item->children($namespaces['excerpt'])->encoded;
    $post_name = (string) $item->children($namespaces['wp'])->post_name;  // slug
    $pub_date = (string) $item->pubDate;

    // Categoría
    $category = null;
    foreach ($item->category as $cat) {
        if ((string) $cat['domain'] === 'category') {
            $category = (string) $cat;
            break;
        }
    }

    // Metadata SEO (si existe plugin Yoast, RankMath, etc.)
    // Buscar en <wp:postmeta>
    $seo_title = null;
    $meta_description = null;

    foreach ($item->children($namespaces['wp'])->postmeta as $meta) {
        $key = (string) $meta->meta_key;
        $value = (string) $meta->meta_value;

        if ($key === '_yoast_wpseo_title') {
            $seo_title = $value;
        }
        if ($key === '_yoast_wpseo_metadesc') {
            $meta_description = $value;
        }
        // Etc...
    }

    // Featured image
    // WordPress export incluye attachment ID en postmeta _thumbnail_id
    // Necesitarás mapear ese ID a la nueva URL

    // Limpiar contenido
    $content = clean_wordpress_content($content);

    // Insertar en SQLite
    $stmt = $db->prepare("
        INSERT INTO posts (
            title,
            slug,
            content,
            excerpt,
            category,
            seo_title,
            meta_description,
            published_at,
            status,
            author_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published', 1)
    ");

    $stmt->execute([
        $title,
        $post_name,
        $content,
        $excerpt,
        $category,
        $seo_title,
        $meta_description,
        date('Y-m-d H:i:s', strtotime($pub_date)),
    ]);

    $post_id = $db->lastInsertId();

    // Generar HTML estático
    $generator = new StaticGenerator($db, $site_config);
    $generator->publish_post($post_id);

    echo "Migrado: {$title} → /{$post_name}/\n";
}

// 5. Regenerar índices
$generator->regenerate_blog_index();
$generator->regenerate_sitemap();
$generator->regenerate_feed();
$generator->regenerate_search_index();

echo "Migración completada\n";
```

**Función de limpieza**:

```php
function clean_wordpress_content($content) {
    // Eliminar shortcodes de WordPress
    $content = preg_replace('/\[.*?\]/', '', $content);

    // Eliminar clases CSS de WordPress/Elementor
    $content = preg_replace('/class="[^"]*"/', '', $content);

    // Limpiar divs innecesarios
    $content = preg_replace('/<div[^>]*>/', '', $content);
    $content = preg_replace('/<\/div>/', '', $content);

    // Reemplazar imágenes de WordPress
    // <img src="/wp-content/uploads/2024/01/imagen.jpg">
    // →
    // <img src="/uploads/2024/01/imagen.jpg">
    $content = str_replace('/wp-content/uploads/', '/uploads/', $content);

    // Eliminar HTML innecesario
    $content = strip_tags($content, '<p><br><strong><em><u><h2><h3><h4><ul><ol><li><a><blockquote><img><figure><figcaption>');

    return $content;
}
```

---

#### C. Migrar Media Library

```php
function migrate_media_library() {
    global $db;

    $wp_uploads = '/path/to/wordpress/wp-content/uploads/';
    $new_uploads = __DIR__ . '/../../public_html/uploads/';

    // Leer estructura de WP uploads (organizado por año/mes)
    $files = glob_recursive($wp_uploads . '*.{jpg,jpeg,png,gif,webp,pdf}', GLOB_BRACE);

    foreach ($files as $file) {
        // Extraer ruta relativa
        $relative_path = str_replace($wp_uploads, '', $file);

        // Crear estructura en nuevo sistema
        $new_path = $new_uploads . $relative_path;
        $new_dir = dirname($new_path);

        if (!is_dir($new_dir)) {
            mkdir($new_dir, 0755, true);
        }

        // Copiar archivo
        copy($file, $new_path);

        // Registrar en tabla media
        $file_info = pathinfo($file);

        $stmt = $db->prepare("
            INSERT INTO media (
                filename,
                original_filename,
                file_path,
                file_size,
                mime_type,
                uploaded_by
            ) VALUES (?, ?, ?, ?, ?, 1)
        ");

        $stmt->execute([
            $file_info['basename'],
            $file_info['basename'],
            '/uploads/' . $relative_path,
            filesize($file),
            mime_content_type($file),
        ]);

        echo "Copiado: {$relative_path}\n";
    }
}
```

---

### 6. MAPEO DE URLs

Crear archivo:

```csv
# url-mapping.csv
WordPress_URL,New_URL,Status
/blog/nueva-jornada-laboral/,/nueva-jornada-laboral/,301
/category/ugpp/,/blog/?category=UGPP,301
/author/admin/,/blog/,301
/page/2/,/blog/,301
```

**Importante**:

URLs de posts que **NO cambian**:

```
/nueva-jornada-laboral-en-colombia/
/cuanto-tiempo-tiene-una-empresa-para-pagar-la-liquidacion/
...
```

Estas NO necesitan redirect porque conservan la URL exacta.

---

### 7. GENERAR REDIRECTS

```php
function create_migration_redirects($csv_file) {
    global $db;

    $handle = fopen($csv_file, 'r');
    $header = fgetcsv($handle); // Skip header

    while (($row = fgetcsv($handle)) !== false) {
        [$wp_url, $new_url, $status] = $row;

        // Crear redirect
        $stmt = $db->prepare("
            INSERT INTO redirects (from_url, to_url, status_code, notes)
            VALUES (?, ?, ?, 'Migración WordPress')
        ");

        $stmt->execute([
            $wp_url,
            $new_url,
            (int) $status,
        ]);

        echo "Redirect: {$wp_url} → {$new_url}\n";
    }

    fclose($handle);

    // Regenerar .htaccess
    regenerate_redirects_conf();
}
```

---

## FASE DE VALIDACIÓN (STAGING)

### 8. CHECKLIST DE VALIDACIÓN

```
CONTENIDO:
[ ] Todas las páginas estáticas existen
[ ] Todos los posts migrados
[ ] Imágenes se visualizan correctamente
[ ] Links internos funcionan
[ ] Categorías asignadas correctamente
[ ] Extractos preservados

URLS:
[ ] Todas las URLs críticas funcionan
[ ] URLs de posts preservadas exactamente
[ ] Redirects funcionan (301)
[ ] No hay loops de redirects
[ ] No hay cadenas largas de redirects

SEO:
[ ] Titles preservados o mejorados
[ ] Meta descriptions preservadas
[ ] Canonicals correctos
[ ] Sitemap.xml generado
[ ] Robots.txt configurado
[ ] Schema.org implementado
[ ] Open Graph tags

FUNCIONALIDAD:
[ ] Formulario de contacto funciona
[ ] Botón WhatsApp funciona
[ ] Búsqueda funciona
[ ] Filtros de blog funcionan
[ ] Navegación móvil funciona
[ ] Links de redes sociales correctos

PERFORMANCE:
[ ] Lighthouse > 90 en todas las páginas
[ ] Imágenes optimizadas
[ ] CSS/JS minificados
[ ] HTTPS funciona
[ ] Compresión habilitada

ADMIN:
[ ] Login funciona
[ ] Crear post funciona
[ ] Editar post funciona
[ ] Subir imagen funciona
[ ] Publicar genera HTML
[ ] Backups funcionan
[ ] Logs funcionan

SEGURIDAD:
[ ] SQLite no accesible públicamente
[ ] /admin/ protegido
[ ] CSRF implementado
[ ] Rate limiting activo
[ ] Headers de seguridad
[ ] Upload validado

ACCESIBILIDAD:
[ ] Navegación por teclado
[ ] Screen reader friendly
[ ] Contraste adecuado
[ ] Labels en forms
[ ] Skip links
[ ] ARIA cuando necesario
```

---

### 9. TESTING COMPARATIVO

Comparar staging vs WordPress actual:

```
- Total de URLs indexables
- Tiempo de carga promedio
- Lighthouse scores
- URLs rotas (404)
- Redirects innecesarios
```

Herramientas:
- Screaming Frog
- Google Lighthouse
- GTmetrix
- WebPageTest

---

## FASE DE GO-LIVE

### 10. PREPARACIÓN FINAL

```
1. Backup final de WordPress
2. Backup final de base de datos WP
3. Backup completo del hosting
4. Verificar acceso a DNS
5. Verificar acceso a cPanel/hosting
6. Confirmar horario de menor tráfico
7. Preparar rollback plan
```

---

### 11. EJECUCIÓN DE MIGRACIÓN

**DÍA D - HORA H**

#### Opción A: Migración directa (downtime mínimo)

```
1. Poner WordPress en modo mantenimiento
2. Crear backup final
3. Subir nuevo sitio a /public_html_new/
4. Renombrar /public_html/ → /public_html_old/
5. Renombrar /public_html_new/ → /public_html/
6. Verificar que funciona
7. Si hay problemas: revertir
8. Si funciona: monitorear
```

#### Opción B: Migración con subdirectorio temporal

```
1. Subir nuevo sitio a /fortiori_new/
2. Configurar servidor para servir desde ahí
3. Probar exhaustivamente
4. Hacer swap
```

#### Opción C: DNS change (staging → producción)

```
1. Subir sitio nuevo a nuevo servidor/IP
2. Probar con IP directa
3. Cambiar DNS A record
4. Esperar propagación (24-48h)
5. Monitorear ambos servidores
```

**Recomendación**: Opción A si tienen acceso a cPanel y pueden revertir rápido.

---

### 12. VERIFICACIÓN POST-MIGRACIÓN

Inmediatamente después:

```
[ ] Sitio carga
[ ] Home funciona
[ ] UGPP funciona
[ ] Colpensiones funciona
[ ] Blog funciona
[ ] Posts individuales funcionan
[ ] Formulario funciona
[ ] WhatsApp funciona
[ ] Admin funciona
[ ] HTTPS funciona
[ ] Sitemap accesible
[ ] Robots.txt correcto
```

---

### 13. MONITOREO (PRIMERAS 48H)

```
- Google Search Console: Errores de rastreo
- Google Analytics: Tráfico
- Server logs: Errores 404/500
- Formulario de contacto: Envíos
- Posicionamiento de keywords críticas
```

Herramientas:
- Google Search Console
- Google Analytics
- UptimeRobot (monitoring)
- Logs del servidor

---

### 14. ACCIONES POST-MIGRACIÓN

```
1. Informar a Google del cambio (Search Console)
2. Actualizar sitemap en Search Console
3. Probar Fetch as Google
4. Solicitar reindexación de páginas críticas
5. Actualizar Google My Business (si aplica)
6. Actualizar redes sociales con nueva URL (si cambió)
7. Notificar a sitios con backlinks importantes (si URLs cambiaron)
```

---

### 15. MANTENIMIENTO DE WORDPRESS

**NO BORRAR INMEDIATAMENTE**

Mantener WordPress accesible internamente durante 30 días:

```
- Mover a /wordpress_backup/
- Bloquear acceso público
- Permitir acceso solo por IP específica
- Después de 30 días sin problemas: eliminar
```

---

## ROLLBACK PLAN

Si algo sale mal:

### Rollback inmediato (< 1 hora)

```
1. Renombrar /public_html/ → /public_html_new_failed/
2. Renombrar /public_html_old/ → /public_html/
3. Verificar que WordPress funciona
4. Analizar qué falló
5. Corregir en staging
6. Reintentar otro día
```

### Rollback después de horas/días

```
1. Restaurar backup de archivos
2. Restaurar backup de base de datos WP
3. Verificar funcionamiento
4. Analizar causas
```

---

## TIMELINE SUGERIDO

```
SEMANA 1-2: Desarrollo en local
SEMANA 3: Deployment a staging
SEMANA 4: Testing y correcciones
SEMANA 5: Testing final y preparación
SEMANA 6: GO-LIVE
SEMANA 7-8: Monitoreo y ajustes
```

**GO-LIVE ideal**: Viernes noche o sábado temprano (menor tráfico, fin de semana para resolver problemas)

---

## URLs CRÍTICAS A PRESERVAR

Según especificación:

```
/ugpp/
/depuracion-de-deuda-real-y-presunta-de-colpensiones/
/la-empresa-y-el-empresario/
/derecho-laboral-y-seguridad-social/
/nueva-jornada-laboral-en-colombia/
/cuanto-tiempo-tiene-una-empresa-para-pagar-la-liquidacion/
/como-despedir-a-un-trabajador-por-justa-causa/
/proceso-de-insolvencia-de-una-persona-natural-no-comerciante/
/derechos-que-tienen-las-mujeres-en-estado-de-embarazo-que-trabajan-por-prestacion-de-servicios/
/beneficios-tributarios-en-procesos-contenciosos-administrativos-que-se-adelantan-en-contra-de-la-ugpp/
/disminuya-su-deuda-ante-la-ugpp-conozca-el-nuevo-esquema-de-presuncion-de-costos-para-los-trabajadores-independientes/
/etapas-y-recursos-del-proceso-de-fiscalizacion-y-o-determinacion-de-obligaciones/
/que-es-la-ugpp-y-cuales-son-sus-funciones/
/que-es-el-proceso-de-fiscalizacion-ugpp/
```

**ESTAS URLs NO DEBEN CAMBIAR**

---

## RIESGOS Y MITIGACIÓN

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Pérdida de posicionamiento | Media | Alto | Preservar URLs exactas, redirects 301 |
| Downtime prolongado | Baja | Alto | Preparación exhaustiva, rollback plan |
| Imágenes rotas | Media | Medio | Script de migración, testing visual |
| Formulario no funciona | Baja | Alto | Testing exhaustivo pre-launch |
| Problemas de hosting | Baja | Alto | Coordinar con proveedor |
| DNS no propaga | Baja | Medio | TTL bajo previo, timing adecuado |
| Redirects en loop | Media | Medio | Validación automática |
| SEO drop temporal | Alta | Medio | Normal, monitorear y esperar |

---

## ÉXITO DE LA MIGRACIÓN

Indicadores:

```
✅ Tráfico orgánico estable (±10% es normal)
✅ 0 URLs críticas retornan 404
✅ Lighthouse > 90 en todas las páginas
✅ Keywords principales mantienen posiciones (±2-3 posiciones tolerables)
✅ Formulario recibe consultas
✅ Search Console sin errores críticos
✅ Admin funciona perfectamente
✅ Client
e satisfecho
```

**Nota**: Es normal un pequeño drop temporal en tráfico durante 2-4 semanas mientras Google re-rastrea el sitio.
