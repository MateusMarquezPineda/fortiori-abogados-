# SEGURIDAD

## PRINCIPIO FUNDAMENTAL

**La seguridad debe implementarse en múltiples capas.**

No confiar en una sola medida. Combinar:
- Validación server-side
- Sanitización
- Autenticación robusta
- Protección Apache
- Headers de seguridad
- Rate limiting
- Logging

---

## 1. AUTENTICACIÓN

### Hashing de Passwords

```php
// Al crear usuario o cambiar password
$password = 'UserPassword123!';

// Preferir Argon2id si está disponible
if (defined('PASSWORD_ARGON2ID')) {
    $hash = password_hash($password, PASSWORD_ARGON2ID, [
        'memory_cost' => 65536,  // 64 MB
        'time_cost' => 4,
        'threads' => 2
    ]);
} else {
    // Fallback a bcrypt
    $hash = password_hash($password, PASSWORD_BCRYPT, [
        'cost' => 12
    ]);
}

// Guardar en database
$stmt = $db->prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)");
$stmt->execute([$username, $hash]);
```

### Verificación de Passwords

```php
// Al hacer login
$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $db->prepare("SELECT id, password_hash FROM users WHERE username = ? AND is_active = 1");
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password_hash'])) {
    // Password correcto
    // Verificar si necesita rehash (actualización de algoritmo)
    if (password_needs_rehash($user['password_hash'], PASSWORD_ARGON2ID)) {
        $new_hash = password_hash($password, PASSWORD_ARGON2ID);
        $update = $db->prepare("UPDATE users SET password_hash = ? WHERE id = ?");
        $update->execute([$new_hash, $user['id']]);
    }

    // Crear sesión
    start_session($user['id']);
} else {
    // Password incorrecto
    log_failed_login($username);
}
```

### NUNCA:
- Guardar passwords en texto plano
- Usar MD5 o SHA1 para passwords
- Usar `password_hash()` sin opciones de costo
- Revelar si el username existe o no en el mensaje de error

---

## 2. SESIONES

### Configuración Segura

```php
// Antes de session_start()
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);      // Solo HTTPS
ini_set('session.cookie_samesite', 'Strict');
ini_set('session.use_strict_mode', 1);
ini_set('session.use_only_cookies', 1);

session_name('FORTIORI_SESSION');
session_start();
```

### Regeneración de ID

```php
// Después de login exitoso
session_regenerate_id(true);

// Periódicamente durante la sesión (cada 15 min)
if (!isset($_SESSION['last_regeneration'])) {
    $_SESSION['last_regeneration'] = time();
} elseif (time() - $_SESSION['last_regeneration'] > 900) {
    session_regenerate_id(true);
    $_SESSION['last_regeneration'] = time();
}
```

### Validación de Sesión

```php
function validate_session() {
    // Verificar que existe sesión
    if (!isset($_SESSION['user_id'])) {
        return false;
    }

    // Verificar IP (opcional, puede causar problemas con proxies)
    // if ($_SESSION['ip'] !== $_SERVER['REMOTE_ADDR']) {
    //     return false;
    // }

    // Verificar User Agent
    if ($_SESSION['user_agent'] !== $_SERVER['HTTP_USER_AGENT']) {
        return false;
    }

    // Verificar expiración
    if (time() > $_SESSION['expires_at']) {
        session_destroy();
        return false;
    }

    // Actualizar expiración (30 minutos de inactividad)
    $_SESSION['expires_at'] = time() + 1800;

    return true;
}
```

---

## 3. CSRF PROTECTION

### Generar Token

```php
function generate_csrf_token() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}
```

### Validar Token

```php
function validate_csrf_token($token) {
    if (!isset($_SESSION['csrf_token'])) {
        return false;
    }

    // Usar hash_equals para evitar timing attacks
    return hash_equals($_SESSION['csrf_token'], $token);
}
```

### Uso en Forms

```html
<form method="POST" action="/admin/api/post-save.php">
    <input type="hidden" name="csrf_token" value="<?= generate_csrf_token() ?>">
    <!-- resto del formulario -->
</form>
```

### Validación en API

```php
// En cada endpoint que modifica datos
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!validate_csrf_token($_POST['csrf_token'] ?? '')) {
        http_response_code(403);
        echo json_encode(['error' => 'CSRF token inválido']);
        exit;
    }
}
```

---

## 4. RATE LIMITING

### Login Attempts

```php
function check_login_attempts($username, $ip) {
    global $db;

    // Contar intentos fallidos en últimos 15 minutos
    $stmt = $db->prepare("
        SELECT COUNT(*) FROM login_attempts
        WHERE (username = ? OR ip_address = ?)
        AND success = 0
        AND attempted_at > datetime('now', '-15 minutes')
    ");
    $stmt->execute([$username, $ip]);
    $count = $stmt->fetchColumn();

    // Máximo 5 intentos
    if ($count >= 5) {
        return false;
    }

    return true;
}

function log_login_attempt($username, $ip, $success) {
    global $db;

    $stmt = $db->prepare("
        INSERT INTO login_attempts (username, ip_address, success)
        VALUES (?, ?, ?)
    ");
    $stmt->execute([$username, $ip, $success ? 1 : 0]);
}
```

### API Rate Limiting

```php
function check_api_rate_limit($user_id, $endpoint, $max_requests = 60, $window = 60) {
    // Implementación simple con archivos
    $cache_file = __DIR__ . "/../../../private/cache/ratelimit_{$user_id}_{$endpoint}.txt";

    if (file_exists($cache_file)) {
        $data = json_decode(file_get_contents($cache_file), true);

        if (time() - $data['start'] < $window) {
            if ($data['count'] >= $max_requests) {
                return false;
            }
            $data['count']++;
        } else {
            $data = ['start' => time(), 'count' => 1];
        }
    } else {
        $data = ['start' => time(), 'count' => 1];
    }

    file_put_contents($cache_file, json_encode($data));
    return true;
}
```

---

## 5. VALIDACIÓN Y SANITIZACIÓN

### Inputs

```php
function sanitize_input($input, $type = 'string') {
    switch ($type) {
        case 'string':
            return trim(strip_tags($input));

        case 'email':
            return filter_var(trim($input), FILTER_SANITIZE_EMAIL);

        case 'int':
            return filter_var($input, FILTER_SANITIZE_NUMBER_INT);

        case 'url':
            return filter_var(trim($input), FILTER_SANITIZE_URL);

        case 'slug':
            $slug = strtolower(trim($input));
            $slug = preg_replace('/[^a-z0-9-]/', '-', $slug);
            $slug = preg_replace('/-+/', '-', $slug);
            return trim($slug, '-');

        default:
            return trim($input);
    }
}
```

### HTML Content (Editor)

```php
function sanitize_html_content($html) {
    // Permitir solo tags seguros
    $allowed_tags = [
        'p', 'br', 'strong', 'em', 'u', 'h2', 'h3', 'h4',
        'ul', 'ol', 'li', 'a', 'blockquote', 'img', 'figure', 'figcaption'
    ];

    $allowed_attributes = [
        'a' => ['href', 'title', 'target', 'rel'],
        'img' => ['src', 'alt', 'width', 'height', 'loading'],
    ];

    // Usar HTMLPurifier si está disponible, sino:
    $html = strip_tags($html, '<' . implode('><', $allowed_tags) . '>');

    // Eliminar atributos peligrosos
    $html = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', '', $html);
    $html = preg_replace('/on\w+\s*=\s*"[^"]*"/i', '', $html);
    $html = preg_replace('/on\w+\s*=\s*\'[^\']*\'/i', '', $html);
    $html = preg_replace('/javascript:/i', '', $html);

    return $html;
}
```

### Validación de Imágenes

```php
function validate_uploaded_image($file) {
    // Verificar que es realmente una imagen
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']);

    $allowed_mimes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/avif',
    ];

    if (!in_array($mime, $allowed_mimes)) {
        throw new Exception('Tipo de archivo no permitido');
    }

    // Verificar tamaño
    $max_size = 5 * 1024 * 1024; // 5 MB
    if ($file['size'] > $max_size) {
        throw new Exception('Archivo demasiado grande');
    }

    // Verificar dimensiones
    $image_info = getimagesize($file['tmp_name']);
    if (!$image_info) {
        throw new Exception('Archivo no es una imagen válida');
    }

    return true;
}
```

---

## 6. SQL INJECTION PREVENTION

### SIEMPRE usar Prepared Statements

```php
// ✅ CORRECTO
$stmt = $db->prepare("SELECT * FROM posts WHERE slug = ?");
$stmt->execute([$slug]);

// ❌ INCORRECTO - VULNERABLE
$result = $db->query("SELECT * FROM posts WHERE slug = '$slug'");
```

### Validar Inputs antes de Query

```php
// Aunque uses prepared statements, valida
$post_id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
if ($post_id === false) {
    http_response_code(400);
    exit('ID inválido');
}

$stmt = $db->prepare("SELECT * FROM posts WHERE id = ?");
$stmt->execute([$post_id]);
```

---

## 7. XSS PREVENTION

### Output Escaping

```php
// En templates HTML
<?= htmlspecialchars($post['title'], ENT_QUOTES, 'UTF-8') ?>

// En atributos
<img src="<?= htmlspecialchars($image_url, ENT_QUOTES, 'UTF-8') ?>" alt="...">

// En JavaScript
<script>
var title = <?= json_encode($post['title'], JSON_HEX_TAG | JSON_HEX_AMP) ?>;
</script>
```

### Content Security Policy

```php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';");
```

---

## 8. DIRECTORY TRAVERSAL PREVENTION

```php
function validate_file_path($path) {
    // Obtener path real
    $real_path = realpath($path);

    // Verificar que existe
    if ($real_path === false) {
        return false;
    }

    // Verificar que está dentro del directorio permitido
    $allowed_dir = realpath(__DIR__ . '/../../uploads');

    if (strpos($real_path, $allowed_dir) !== 0) {
        return false;
    }

    return true;
}
```

---

## 9. HEADERS DE SEGURIDAD

```php
// En todas las páginas del admin
header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: geolocation=(), microphone=(), camera=()');
```

---

## 10. PROTECCIÓN APACHE

### Proteger SQLite

```apache
# En private/.htaccess o public_html/.htaccess
<FilesMatch "\.(sqlite|db|sql)$">
    Require all denied
</FilesMatch>
```

### Proteger archivos de configuración

```apache
<FilesMatch "^(config\.php|\.env)$">
    Require all denied
</FilesMatch>
```

### Deshabilitar listado de directorios

```apache
Options -Indexes
```

### Proteger uploads de ejecución PHP

```apache
# En public_html/uploads/.htaccess
<FilesMatch "\.php$">
    Require all denied
</FilesMatch>

# Solo permitir imágenes
<FilesMatch "\.(jpg|jpeg|png|gif|webp|avif)$">
    Require all granted
</FilesMatch>
```

---

## 11. HTTPS OBLIGATORIO

### Redirect HTTP → HTTPS

```apache
# En .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

### Cookie Secure

```php
// Solo enviar cookies por HTTPS
ini_set('session.cookie_secure', 1);
```

---

## 12. LOGGING

### Log de Seguridad

```php
function log_security_event($event_type, $details) {
    $log_file = __DIR__ . '/../../../private/logs/security.log';

    $entry = sprintf(
        "[%s] %s | IP: %s | User Agent: %s | Details: %s\n",
        date('Y-m-d H:i:s'),
        $event_type,
        $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        json_encode($details)
    );

    file_put_contents($log_file, $entry, FILE_APPEND | LOCK_EX);
}
```

### Eventos a Loguear

- Login exitoso
- Login fallido
- Intento de acceso no autorizado
- Cambio de password
- Creación de usuario
- Eliminación de contenido
- Modificación de configuración
- Errores de validación CSRF
- Rate limit excedido

---

## 13. BACKUP DE SEGURIDAD

### Antes de operaciones críticas

```php
function secure_operation($callback) {
    // 1. Backup
    $backup_path = backup_database();

    try {
        // 2. Ejecutar operación
        $result = $callback();

        // 3. Verificar resultado
        if ($result === false) {
            throw new Exception('Operación falló');
        }

        return $result;

    } catch (Exception $e) {
        // 4. Rollback si es necesario
        restore_database($backup_path);

        // 5. Log
        log_security_event('operation_failed', [
            'error' => $e->getMessage(),
            'backup' => $backup_path
        ]);

        throw $e;
    }
}
```

---

## 14. CHECKLIST DE SEGURIDAD

### Antes de producción:

- [ ] Cambiar password admin por defecto
- [ ] Habilitar HTTPS
- [ ] Configurar headers de seguridad
- [ ] Proteger SQLite con Apache
- [ ] Proteger directorio private/
- [ ] Proteger uploads/
- [ ] Deshabilitar display_errors en PHP
- [ ] Configurar error_log
- [ ] Implementar rate limiting
- [ ] Implementar CSRF protection
- [ ] Validar todos los inputs
- [ ] Sanitizar todos los outputs
- [ ] Configurar cookies seguras
- [ ] Implementar logging
- [ ] Probar intentos de SQL injection
- [ ] Probar intentos de XSS
- [ ] Probar directory traversal
- [ ] Revisar permisos de archivos (644/755)
- [ ] Ocultar versión de PHP
- [ ] Deshabilitar funciones peligrosas PHP
- [ ] Configurar upload_max_filesize
- [ ] Configurar post_max_size

---

## 15. PRINCIPIOS FUNDAMENTALES

1. **Nunca confiar en input del usuario**
2. **Validar en servidor, no solo en cliente**
3. **Sanitizar antes de procesar**
4. **Escapar antes de mostrar**
5. **Usar prepared statements siempre**
6. **Hash de passwords con algoritmos modernos**
7. **HTTPS obligatorio**
8. **Sesiones seguras**
9. **CSRF protection en todos los forms**
10. **Rate limiting en operaciones sensibles**
11. **Logging de eventos de seguridad**
12. **Backups antes de operaciones destructivas**
13. **Principio de mínimo privilegio**
14. **Defensa en profundidad (múltiples capas)**
15. **Actualizar dependencias regularmente**
