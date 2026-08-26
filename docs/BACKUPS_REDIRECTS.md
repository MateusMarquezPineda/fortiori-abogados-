# BACKUPS Y REDIRECTS

## PARTE 1: SISTEMA DE BACKUPS

### PRINCIPIO

**Crear backup automático antes de cualquier operación destructiva o irreversible.**

Tipos de operaciones que requieren backup:
- Publicar artículo
- Actualizar artículo publicado
- Eliminar artículo
- Cambiar slug
- Modificar configuración crítica
- Actualizar base de datos

---

### TIPOS DE BACKUP

#### 1. Database Backup (SQLite)

```php
function backup_database() {
    $db_path = __DIR__ . '/../../../private/database/fortiori.sqlite';
    $backup_dir = __DIR__ . '/../../../private/backups/db/';

    if (!is_dir($backup_dir)) {
        mkdir($backup_dir, 0755, true);
    }

    $timestamp = date('Y-m-d-His');
    $backup_file = $backup_dir . "fortiori-{$timestamp}.sqlite";

    // Copiar archivo SQLite
    if (!copy($db_path, $backup_file)) {
        throw new Exception('No se pudo crear backup de base de datos');
    }

    // Registrar backup
    register_backup([
        'backup_type' => 'database',
        'file_path' => $backup_file,
        'file_size' => filesize($backup_file),
    ]);

    return $backup_file;
}
```

#### 2. Post HTML Backup

```php
function backup_post_html($slug) {
    $html_path = __DIR__ . "/../../{$slug}/index.html";
    $backup_dir = __DIR__ . '/../../../private/backups/posts/';

    if (!is_dir($backup_dir)) {
        mkdir($backup_dir, 0755, true);
    }

    // Solo hacer backup si existe
    if (!file_exists($html_path)) {
        return null;
    }

    $timestamp = date('Y-m-d-His');
    $backup_file = $backup_dir . "{$slug}-{$timestamp}.html";

    if (!copy($html_path, $backup_file)) {
        throw new Exception('No se pudo crear backup del artículo');
    }

    // Registrar backup
    register_backup([
        'backup_type' => 'post_html',
        'file_path' => $backup_file,
        'file_size' => filesize($backup_file),
        'related_entity_type' => 'post',
        'related_entity_id' => get_post_id_by_slug($slug),
    ]);

    return $backup_file;
}
```

#### 3. Media Backup

```php
function backup_media_file($media_id) {
    $media = get_media_by_id($media_id);
    $original_path = __DIR__ . '/../../' . $media['file_path'];
    $backup_dir = __DIR__ . '/../../../private/backups/media/';

    if (!is_dir($backup_dir)) {
        mkdir($backup_dir, 0755, true);
    }

    $timestamp = date('Y-m-d-His');
    $filename = pathinfo($media['filename'], PATHINFO_FILENAME);
    $extension = pathinfo($media['filename'], PATHINFO_EXTENSION);
    $backup_file = $backup_dir . "{$filename}-{$timestamp}.{$extension}";

    if (!copy($original_path, $backup_file)) {
        throw new Exception('No se pudo crear backup del archivo');
    }

    register_backup([
        'backup_type' => 'media',
        'file_path' => $backup_file,
        'file_size' => filesize($backup_file),
        'related_entity_type' => 'media',
        'related_entity_id' => $media_id,
    ]);

    return $backup_file;
}
```

---

### REGISTRO DE BACKUPS

```php
function register_backup($data) {
    global $db;

    $stmt = $db->prepare("
        INSERT INTO backups (
            backup_type,
            file_path,
            file_size,
            related_entity_type,
            related_entity_id,
            created_by,
            notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $data['backup_type'],
        $data['file_path'],
        $data['file_size'] ?? null,
        $data['related_entity_type'] ?? null,
        $data['related_entity_id'] ?? null,
        $_SESSION['user_id'] ?? null,
        $data['notes'] ?? null,
    ]);

    return $db->lastInsertId();
}
```

---

### LIMPIEZA AUTOMÁTICA DE BACKUPS

```php
function cleanup_old_backups($retention_days = 30) {
    global $db;

    // Obtener backups antiguos
    $stmt = $db->prepare("
        SELECT id, file_path
        FROM backups
        WHERE created_at < datetime('now', '-{$retention_days} days')
    ");
    $stmt->execute();
    $old_backups = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($old_backups as $backup) {
        // Eliminar archivo físico
        if (file_exists($backup['file_path'])) {
            unlink($backup['file_path']);
        }

        // Eliminar registro
        $delete = $db->prepare("DELETE FROM backups WHERE id = ?");
        $delete->execute([$backup['id']]);
    }

    return count($old_backups);
}
```

---

### RESTAURACIÓN

```php
function restore_database_from_backup($backup_id) {
    global $db;

    // Obtener info del backup
    $stmt = $db->prepare("SELECT file_path FROM backups WHERE id = ? AND backup_type = 'database'");
    $stmt->execute([$backup_id]);
    $backup = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$backup) {
        throw new Exception('Backup no encontrado');
    }

    if (!file_exists($backup['file_path'])) {
        throw new Exception('Archivo de backup no existe');
    }

    // Hacer backup del estado actual antes de restaurar
    $current_backup = backup_database();

    // Cerrar conexión actual
    $db = null;

    // Restaurar
    $db_path = __DIR__ . '/../../../private/database/fortiori.sqlite';
    if (!copy($backup['file_path'], $db_path)) {
        throw new Exception('No se pudo restaurar backup');
    }

    // Reconectar
    $db = new PDO("sqlite:{$db_path}");

    log_activity([
        'action' => 'database_restored',
        'description' => "Base de datos restaurada desde backup ID: {$backup_id}",
    ]);

    return true;
}
```

---

### BACKUP MANUAL (ADMIN UI)

Permitir al administrador:
- Crear backup manual
- Descargar backups
- Restaurar desde backup
- Ver listado de backups
- Eliminar backups antiguos

---

### FRECUENCIA

#### Automáticos
- Antes de publicar: ✅ Siempre
- Antes de actualizar: ✅ Siempre
- Antes de eliminar: ✅ Siempre
- Antes de cambiar slug: ✅ Siempre

#### Programados
- Backup diario completo: Opcional (cron)
- Limpieza semanal: Recomendado

#### Retención
- Backups recientes: 7 días
- Backups semanales: 30 días
- Backups mensuales: Configurable

---

## PARTE 2: SISTEMA DE REDIRECTS

### PRINCIPIO

**Gestionar redirects 301 para preservar SEO cuando cambian URLs.**

Casos de uso:
- Cambio de slug
- Migración desde WordPress
- Corrección de URLs
- Consolidación de contenido

---

### ALMACENAMIENTO

Dos opciones:

#### Opción 1: SQLite (tabla `redirects`)

```sql
SELECT from_url, to_url, status_code
FROM redirects
WHERE is_active = 1
```

#### Opción 2: JSON

```json
// private/config/redirects.json
[
    {
        "from": "/antigua-url/",
        "to": "/nueva-url/",
        "code": 301
    },
    {
        "from": "/otra-url-antigua/",
        "to": "/otra-url-nueva/",
        "code": 301
    }
]
```

**Recomendación**: Usar SQLite para aprovechar logging y estadísticas.

---

### GENERACIÓN DE REGLAS APACHE

```php
function generate_htaccess_redirects() {
    global $db;

    // Obtener redirects activos
    $stmt = $db->query("
        SELECT from_url, to_url, status_code
        FROM redirects
        WHERE is_active = 1
        ORDER BY from_url
    ");
    $redirects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Generar reglas
    $rules = "# Redirects generados automáticamente\n";
    $rules .= "# No editar manualmente - gestionar desde /admin/redirects.php\n\n";

    foreach ($redirects as $redirect) {
        $from = ltrim($redirect['from_url'], '/');
        $to = $redirect['to_url'];
        $code = $redirect['status_code'];

        // Si to_url es relativa, mantener; si es absoluta, usar tal cual
        if (strpos($to, 'http') !== 0) {
            $to = '/' . ltrim($to, '/');
        }

        $rules .= "Redirect {$code} /{$from} {$to}\n";
    }

    return $rules;
}
```

---

### INTEGRACIÓN EN .HTACCESS

```apache
# .htaccess principal

RewriteEngine On

# HTTPS redirect
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# www → non-www
RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# === REDIRECTS DINÁMICOS ===
# Incluir archivo generado
Include /path/to/private/config/redirects.conf
# === FIN REDIRECTS ===

# Trailing slash
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1/ [R=301,L]

# Custom 404
ErrorDocument 404 /404.html
```

---

### CREAR REDIRECT AUTOMÁTICAMENTE AL CAMBIAR SLUG

```php
function update_post_slug($post_id, $new_slug) {
    global $db;

    // Obtener slug actual
    $stmt = $db->prepare("SELECT slug, status FROM posts WHERE id = ?");
    $stmt->execute([$post_id]);
    $post = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$post) {
        throw new Exception('Artículo no encontrado');
    }

    $old_slug = $post['slug'];

    // Si el artículo está publicado, crear redirect
    if ($post['status'] === 'published' && $old_slug !== $new_slug) {
        create_redirect([
            'from_url' => "/{$old_slug}/",
            'to_url' => "/{$new_slug}/",
            'status_code' => 301,
            'notes' => "Cambio de slug: {$old_slug} → {$new_slug}",
        ]);
    }

    // Actualizar slug
    $update = $db->prepare("UPDATE posts SET slug = ? WHERE id = ?");
    $update->execute([$new_slug, $post_id]);

    // Regenerar reglas
    regenerate_redirects_conf();

    return true;
}
```

---

### CREAR REDIRECT MANUALMENTE

```php
function create_redirect($data) {
    global $db;

    // Normalizar URLs
    $from_url = '/' . trim($data['from_url'], '/') . '/';
    $to_url = '/' . trim($data['to_url'], '/') . '/';

    // Validar que no exista ya
    $stmt = $db->prepare("SELECT id FROM redirects WHERE from_url = ?");
    $stmt->execute([$from_url]);
    if ($stmt->fetch()) {
        throw new Exception('Ya existe un redirect para esa URL');
    }

    // Validar que from ≠ to
    if ($from_url === $to_url) {
        throw new Exception('La URL origen y destino no pueden ser iguales');
    }

    // Crear redirect
    $stmt = $db->prepare("
        INSERT INTO redirects (from_url, to_url, status_code, created_by, notes)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $from_url,
        $to_url,
        $data['status_code'] ?? 301,
        $_SESSION['user_id'],
        $data['notes'] ?? null,
    ]);

    // Regenerar archivo .conf
    regenerate_redirects_conf();

    log_activity([
        'action' => 'redirect_created',
        'description' => "Redirect creado: {$from_url} → {$to_url}",
    ]);

    return $db->lastInsertId();
}
```

---

### REGENERAR ARCHIVO DE CONFIGURACIÓN

```php
function regenerate_redirects_conf() {
    $rules = generate_htaccess_redirects();

    $conf_file = __DIR__ . '/../../../private/config/redirects.conf';

    if (file_put_contents($conf_file, $rules) === false) {
        throw new Exception('No se pudo escribir archivo de redirects');
    }

    return true;
}
```

---

### ESTADÍSTICAS (OPCIONAL)

```php
function track_redirect_hit($from_url) {
    global $db;

    $stmt = $db->prepare("
        UPDATE redirects
        SET hits = hits + 1,
            last_hit_at = CURRENT_TIMESTAMP
        WHERE from_url = ?
    ");

    $stmt->execute([$from_url]);
}
```

**Implementación**: Agregar PHP en .htaccess antes del redirect (complicado) o usar Google Analytics para tracking.

---

### VALIDACIÓN DE REDIRECTS

```php
function validate_redirects() {
    global $db;

    $stmt = $db->query("SELECT id, from_url, to_url FROM redirects WHERE is_active = 1");
    $redirects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $issues = [];

    foreach ($redirects as $redirect) {
        // Verificar loops
        if ($redirect['from_url'] === $redirect['to_url']) {
            $issues[] = "Redirect #{$redirect['id']}: Loop detectado";
        }

        // Verificar cadenas (A → B → C)
        $chain = check_redirect_chain($redirect['from_url']);
        if (count($chain) > 3) {
            $issues[] = "Redirect #{$redirect['id']}: Cadena muy larga (" . count($chain) . " saltos)";
        }

        // Verificar que to_url existe (si es interna)
        if (strpos($redirect['to_url'], '/') === 0) {
            if (!url_exists($redirect['to_url'])) {
                $issues[] = "Redirect #{$redirect['id']}: URL destino no existe ({$redirect['to_url']})";
            }
        }
    }

    return $issues;
}
```

---

### MIGRACIÓN WORDPRESS

Durante la migración, crear redirects para todas las URLs que cambian:

```php
function create_wordpress_migration_redirects($mapping) {
    // $mapping = ['/old-wp-url/' => '/new-url/', ...]

    foreach ($mapping as $old => $new) {
        create_redirect([
            'from_url' => $old,
            'to_url' => $new,
            'status_code' => 301,
            'notes' => 'Migración WordPress',
        ]);
    }

    regenerate_redirects_conf();
}
```

---

### ADMIN UI

Crear interfaz en `/admin/redirects.php` para:

1. **Listar redirects**
   - Tabla con: From, To, Code, Hits, Última vez, Acciones

2. **Crear redirect**
   - Form: From URL, To URL, Status Code, Notas

3. **Editar redirect**
   - Modificar To URL y Status Code

4. **Eliminar redirect**
   - Mover a inactivo o eliminar

5. **Validar redirects**
   - Botón "Validar todos" que ejecuta `validate_redirects()`

6. **Importar desde CSV**
   - Para migraciones masivas

---

### CHECKLIST REDIRECTS

- [ ] Crear tabla redirects en SQLite
- [ ] Implementar generación de reglas Apache
- [ ] Crear redirect automáticamente al cambiar slug
- [ ] UI para gestionar redirects manualmente
- [ ] Validación de loops
- [ ] Validación de cadenas
- [ ] Regeneración automática de .conf
- [ ] Logging de creación/edición
- [ ] Importación masiva (CSV)
- [ ] Estadísticas de uso (opcional)

---

## RESUMEN

### Backups
- **Automáticos** antes de operaciones destructivas
- **Múltiples tipos**: Database, Post HTML, Media
- **Retención configurable**: 30 días por defecto
- **Restauración** desde UI admin
- **Limpieza automática** de backups antiguos

### Redirects
- **Gestión centralizada** en SQLite
- **Generación automática** de reglas Apache
- **Creación automática** al cambiar slugs
- **Validación** de loops y cadenas
- **UI admin** para gestión manual
- **Importación masiva** para migraciones
