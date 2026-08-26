# MODELO DE DATOS SQLITE

## PRINCIPIO

SQLite es la **fuente única de verdad** para:
- Artículos del blog
- Usuarios del admin
- Media library
- Configuración
- Historial de versiones
- Logs de actividad

El público NO consulta SQLite. Solo lee HTML generado.

---

## SCHEMA SQL

```sql
-- ============================================================================
-- TABLA: users
-- ============================================================================
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'editor',  -- 'admin' | 'editor'
    display_name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_active BOOLEAN DEFAULT 1,

    CHECK (role IN ('admin', 'editor')),
    CHECK (is_active IN (0, 1))
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================================================
-- TABLA: posts
-- ============================================================================
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,

    -- Metadata
    author_id INTEGER NOT NULL,
    category VARCHAR(100),
    featured_image VARCHAR(255),
    featured_image_alt VARCHAR(255),

    -- SEO
    seo_title VARCHAR(70),
    meta_description VARCHAR(160),
    canonical_url VARCHAR(255),
    og_image VARCHAR(255),

    -- Estado
    status VARCHAR(20) NOT NULL DEFAULT 'draft',  -- 'draft' | 'review' | 'scheduled' | 'published' | 'archived' | 'trash'
    legal_status VARCHAR(20) DEFAULT 'vigente',    -- 'vigente' | 'requiere_revision' | 'historico'

    -- Fechas
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    published_at DATETIME,
    scheduled_at DATETIME,

    -- Control
    views INTEGER DEFAULT 0,
    is_indexable BOOLEAN DEFAULT 1,

    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE RESTRICT,
    CHECK (status IN ('draft', 'review', 'scheduled', 'published', 'archived', 'trash')),
    CHECK (legal_status IN ('vigente', 'requiere_revision', 'historico')),
    CHECK (is_indexable IN (0, 1))
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_published_at ON posts(published_at);
CREATE INDEX idx_posts_created_at ON posts(created_at);

-- ============================================================================
-- TABLA: post_versions
-- Historial de versiones de artículos
-- ============================================================================
CREATE TABLE post_versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    version_number INTEGER NOT NULL,

    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,

    -- Metadata snapshot
    category VARCHAR(100),
    seo_title VARCHAR(70),
    meta_description VARCHAR(160),

    -- Control
    created_by INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    changes_summary TEXT,

    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,
    UNIQUE(post_id, version_number)
);

CREATE INDEX idx_post_versions_post ON post_versions(post_id);
CREATE INDEX idx_post_versions_created ON post_versions(created_at);

-- ============================================================================
-- TABLA: media
-- ============================================================================
CREATE TABLE media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL UNIQUE,
    file_size INTEGER NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    width INTEGER,
    height INTEGER,

    -- Metadata
    alt_text VARCHAR(255),
    title VARCHAR(255),
    caption TEXT,

    -- Relaciones
    uploaded_by INTEGER NOT NULL,
    used_in_posts TEXT,  -- JSON array de post IDs

    -- Control
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE RESTRICT
);

CREATE INDEX idx_media_filename ON media(filename);
CREATE INDEX idx_media_mime ON media(mime_type);
CREATE INDEX idx_media_uploaded_by ON media(uploaded_by);
CREATE INDEX idx_media_created_at ON media(created_at);

-- ============================================================================
-- TABLA: media_variants
-- Variantes de imágenes (responsive)
-- ============================================================================
CREATE TABLE media_variants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    media_id INTEGER NOT NULL,
    variant_name VARCHAR(50) NOT NULL,  -- '1200w', '768w', '480w', 'thumbnail'
    file_path VARCHAR(255) NOT NULL UNIQUE,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    file_size INTEGER NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
    UNIQUE(media_id, variant_name)
);

CREATE INDEX idx_media_variants_media ON media_variants(media_id);

-- ============================================================================
-- TABLA: related_posts
-- Relaciones entre artículos
-- ============================================================================
CREATE TABLE related_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    related_post_id INTEGER NOT NULL,
    order_position INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (related_post_id) REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE(post_id, related_post_id)
);

CREATE INDEX idx_related_posts_post ON related_posts(post_id);
CREATE INDEX idx_related_posts_related ON related_posts(related_post_id);

-- ============================================================================
-- TABLA: redirects
-- Gestión de redirects 301
-- ============================================================================
CREATE TABLE redirects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_url VARCHAR(255) NOT NULL UNIQUE,
    to_url VARCHAR(255) NOT NULL,
    status_code INTEGER DEFAULT 301,

    created_by INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    hits INTEGER DEFAULT 0,
    last_hit_at DATETIME,
    is_active BOOLEAN DEFAULT 1,
    notes TEXT,

    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,
    CHECK (status_code IN (301, 302, 307, 308)),
    CHECK (is_active IN (0, 1))
);

CREATE INDEX idx_redirects_from ON redirects(from_url);
CREATE INDEX idx_redirects_active ON redirects(is_active);

-- ============================================================================
-- TABLA: activity_log
-- Log de actividad del administrador
-- ============================================================================
CREATE TABLE activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action VARCHAR(100) NOT NULL,  -- 'post_created', 'post_published', 'post_deleted', etc.
    entity_type VARCHAR(50),        -- 'post', 'media', 'user', 'setting'
    entity_id INTEGER,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_activity_user ON activity_log(user_id);
CREATE INDEX idx_activity_action ON activity_log(action);
CREATE INDEX idx_activity_entity ON activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_created ON activity_log(created_at);

-- ============================================================================
-- TABLA: sessions
-- Gestión de sesiones
-- ============================================================================
CREATE TABLE sessions (
    id VARCHAR(128) PRIMARY KEY,
    user_id INTEGER NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

-- ============================================================================
-- TABLA: login_attempts
-- Rate limiting y seguridad
-- ============================================================================
CREATE TABLE login_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50),
    ip_address VARCHAR(45) NOT NULL,
    success BOOLEAN NOT NULL,
    attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CHECK (success IN (0, 1))
);

CREATE INDEX idx_login_attempts_ip ON login_attempts(ip_address);
CREATE INDEX idx_login_attempts_username ON login_attempts(username);
CREATE INDEX idx_login_attempts_attempted ON login_attempts(attempted_at);

-- ============================================================================
-- TABLA: settings
-- Configuración general del sitio
-- ============================================================================
CREATE TABLE settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type VARCHAR(20) DEFAULT 'string',  -- 'string', 'integer', 'boolean', 'json'

    updated_by INTEGER,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    CHECK (setting_type IN ('string', 'integer', 'boolean', 'json'))
);

CREATE INDEX idx_settings_key ON settings(setting_key);

-- ============================================================================
-- TABLA: backups
-- Registro de backups
-- ============================================================================
CREATE TABLE backups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    backup_type VARCHAR(50) NOT NULL,  -- 'database', 'post_html', 'full'
    file_path VARCHAR(255) NOT NULL,
    file_size INTEGER,

    related_entity_type VARCHAR(50),
    related_entity_id INTEGER,

    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,

    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    CHECK (backup_type IN ('database', 'post_html', 'media', 'full'))
);

CREATE INDEX idx_backups_type ON backups(backup_type);
CREATE INDEX idx_backups_created ON backups(created_at);
CREATE INDEX idx_backups_entity ON backups(related_entity_type, related_entity_id);

-- ============================================================================
-- DATOS INICIALES
-- ============================================================================

-- Usuario administrador por defecto (password: cambiar_en_produccion)
-- Hash corresponde a 'TempPassword2026!!' - DEBE cambiarse tras instalación
INSERT INTO users (username, email, password_hash, role, display_name)
VALUES (
    'admin',
    'contactenos@fortioriabogados.com',
    '$2y$10$example_hash_must_be_generated_on_setup',
    'admin',
    'Administrador Fortiori'
);

-- Categorías predefinidas (almacenadas en settings)
INSERT INTO settings (setting_key, setting_value, setting_type) VALUES
('categories', '["UGPP","Colpensiones","Derecho Laboral","Seguridad Social","Derecho Empresarial","Actualidad Jurídica"]', 'json'),
('site_name', 'FORTIORI ABOGADOS S.A.S.', 'string'),
('posts_per_page', '12', 'integer'),
('auto_backup', '1', 'boolean'),
('backup_retention_days', '30', 'integer');

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Actualizar updated_at en posts
CREATE TRIGGER update_posts_timestamp
AFTER UPDATE ON posts
BEGIN
    UPDATE posts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Actualizar updated_at en users
CREATE TRIGGER update_users_timestamp
AFTER UPDATE ON users
BEGIN
    UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Actualizar updated_at en media
CREATE TRIGGER update_media_timestamp
AFTER UPDATE ON media
BEGIN
    UPDATE media SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Limpiar sesiones expiradas automáticamente
CREATE TRIGGER cleanup_expired_sessions
AFTER INSERT ON sessions
BEGIN
    DELETE FROM sessions WHERE expires_at < CURRENT_TIMESTAMP;
END;

-- Limpiar intentos de login antiguos (> 24 horas)
CREATE TRIGGER cleanup_old_login_attempts
AFTER INSERT ON login_attempts
BEGIN
    DELETE FROM login_attempts
    WHERE attempted_at < datetime('now', '-1 day');
END;
```

---

## NOTAS IMPORTANTES

### Seguridad
- Passwords siempre hasheados con `password_hash()` PHP (Argon2id preferido, bcrypt fallback)
- No almacenar credenciales SMTP
- IP addresses solo cuando sea necesario para seguridad
- Sessions con expiración automática

### Performance
- Índices en columnas frecuentemente consultadas
- Triggers para limpieza automática
- Cascadas bien definidas

### Integridad
- Foreign keys con restricciones apropiadas
- Checks en enums
- UNIQUE donde corresponde
- NOT NULL en campos críticos

### Versionado
- `post_versions` mantiene historial completo
- `changes_summary` para documentar cambios
- Relación cascade para limpieza automática

### Backups
- Registro de todos los backups en tabla
- Path, tamaño, tipo
- Relación con entidad original

### Extensibilidad
- Diseñado para futuras features
- Estructura normalizada
- Fácil agregar campos sin romper lógica
