# GENERADOR ESTÁTICO

## CONCEPTO FUNDAMENTAL

El **generador** es el componente que transforma el contenido almacenado en SQLite en archivos HTML estáticos que se sirven directamente a los visitantes.

```
SQLite (fuente de verdad)
    ↓
GENERADOR (templates PHP)
    ↓
HTML estático (público)
```

---

## UBICACIÓN

```
public_html/admin/includes/generator.php
```

Este archivo contiene la clase `StaticGenerator` con todos los métodos de generación.

---

## FLUJO DE PUBLICACIÓN DE ARTÍCULO

### 1. VALIDACIÓN PREVIA

```php
// Validar datos del artículo
- Título no vacío
- Slug único
- Contenido no vacío
- Autor válido
- Categoría válida
- Imágenes existen
- SEO metadata completa (advertir si falta)
```

### 2. CREAR BACKUPS

```php
// Backup SQLite
$backup_db_path = backup_database();

// Backup HTML anterior (si existe)
if (file_exists("/{slug}/index.html")) {
    $backup_html_path = backup_post_html($slug);
}
```

### 3. GENERAR HTML

```php
// Cargar datos completos del post desde SQLite
$post_data = get_post_full_data($post_id);

// Cargar template
$template = load_template('article.php');

// Generar HTML
$html = render_template($template, $post_data);
```

### 4. VALIDAR HTML GENERADO

```php
// Verificaciones básicas
- HTML no vacío
- Contiene DOCTYPE
- Contiene <title>
- Contiene H1
- Contiene <article>
- No contiene errores PHP
- Tamaño razonable
```

### 5. ESCRIBIR ARCHIVO (ATÓMICO)

```php
// NO sobrescribir directamente
// Usar operación atómica:

$temp_file = "/{slug}/index.html.tmp";
$final_file = "/{slug}/index.html";

// 1. Escribir temporal
file_put_contents($temp_file, $html);

// 2. Validar temporal
if (!validate_html_file($temp_file)) {
    unlink($temp_file);
    throw new Exception("HTML generado inválido");
}

// 3. Mover atómicamente (rename es atómico en Unix)
rename($temp_file, $final_file);
```

**IMPORTANTE**: Si el proceso falla en cualquier punto, el archivo anterior permanece intacto.

### 6. REGENERAR ÍNDICES

```php
// Regenerar índice del blog
generate_blog_index();

// Regenerar sitemap.xml
generate_sitemap();

// Regenerar feed.xml
generate_feed();

// Regenerar search-index.json
generate_search_index();
```

### 7. REGISTRAR ACTIVIDAD

```php
log_activity([
    'user_id' => $user_id,
    'action' => 'post_published',
    'entity_type' => 'post',
    'entity_id' => $post_id,
    'description' => "Publicado: {$post_title}",
]);
```

### 8. REGISTRAR BACKUP

```php
register_backup([
    'backup_type' => 'database',
    'file_path' => $backup_db_path,
    'related_entity_type' => 'post',
    'related_entity_id' => $post_id,
]);
```

---

## TEMPLATES

### Ubicación

```
public_html/templates/
```

### Template: article.php

Genera el HTML completo de un artículo individual.

**Variables disponibles**:

```php
$post = [
    'id' => 123,
    'title' => 'Título del artículo',
    'slug' => 'titulo-del-articulo',
    'content' => '<p>Contenido HTML...</p>',
    'excerpt' => 'Resumen...',

    'author' => [
        'id' => 1,
        'display_name' => 'Juan Pérez',
    ],

    'category' => 'UGPP',

    'featured_image' => '/uploads/2026/08/imagen-1200.webp',
    'featured_image_alt' => 'Descripción de la imagen',

    'seo_title' => 'Título SEO optimizado',
    'meta_description' => 'Descripción meta...',
    'canonical_url' => 'https://fortioriabogados.com/titulo-del-articulo/',
    'og_image' => '/uploads/2026/08/imagen-og.jpg',

    'legal_status' => 'vigente',

    'published_at' => '2026-08-25 14:30:00',
    'updated_at' => '2026-08-25 14:30:00',

    'related_posts' => [
        [
            'title' => 'Artículo relacionado 1',
            'slug' => 'articulo-relacionado-1',
            'excerpt' => 'Resumen...',
            'category' => 'Colpensiones',
        ],
        // ...
    ],
];

$site = [
    'name' => 'FORTIORI ABOGADOS S.A.S.',
    'domain' => 'https://fortioriabogados.com',
    'phone' => '(601) 341 8274',
    'mobile' => '+57 314 476 0999',
    'email' => 'contactenos@fortioriabogados.com',
    // ... resto de datos corporativos
];
```

**Estructura HTML esperada**:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <?php include 'partials/head.php'; ?>

    <title><?= $post['seo_title'] ?: $post['title'] ?></title>
    <meta name="description" content="<?= $post['meta_description'] ?>">
    <link rel="canonical" href="<?= $post['canonical_url'] ?>">

    <!-- Open Graph -->
    <meta property="og:title" content="<?= $post['seo_title'] ?: $post['title'] ?>">
    <meta property="og:description" content="<?= $post['meta_description'] ?>">
    <meta property="og:image" content="<?= $site['domain'] . $post['og_image'] ?>">
    <meta property="og:url" content="<?= $post['canonical_url'] ?>">
    <meta property="og:type" content="article">

    <!-- Schema.org -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "<?= $post['title'] ?>",
        "description": "<?= $post['excerpt'] ?>",
        "image": "<?= $site['domain'] . $post['og_image'] ?>",
        "datePublished": "<?= date('c', strtotime($post['published_at'])) ?>",
        "dateModified": "<?= date('c', strtotime($post['updated_at'])) ?>",
        "author": {
            "@type": "Person",
            "name": "<?= $post['author']['display_name'] ?>"
        },
        "publisher": {
            "@type": "LegalService",
            "name": "<?= $site['name'] ?>",
            "logo": {
                "@type": "ImageObject",
                "url": "<?= $site['domain'] ?>/assets/images/logo.svg"
            }
        }
    }
    </script>
</head>
<body>
    <?php include 'partials/header.php'; ?>

    <main>
        <?php include 'partials/breadcrumb.php'; ?>

        <article>
            <header>
                <span class="category"><?= $post['category'] ?></span>
                <h1><?= $post['title'] ?></h1>

                <div class="meta">
                    <time datetime="<?= date('c', strtotime($post['published_at'])) ?>">
                        <?= format_date($post['published_at']) ?>
                    </time>
                    <span class="author">Por <?= $post['author']['display_name'] ?></span>
                </div>
            </header>

            <?php if ($post['featured_image']): ?>
            <figure class="featured-image">
                <img src="<?= $post['featured_image'] ?>"
                     alt="<?= $post['featured_image_alt'] ?>"
                     width="1200"
                     height="630"
                     loading="eager"
                     fetchpriority="high">
            </figure>
            <?php endif; ?>

            <div class="content">
                <?= $post['content'] ?>
            </div>

            <?php if ($post['legal_status'] === 'requiere_revision' || $post['legal_status'] === 'historico'): ?>
            <aside class="legal-notice">
                <p>Este contenido fue publicado originalmente el <?= format_date($post['published_at']) ?> y puede estar sujeto a cambios normativos posteriores. Recomendamos verificar la vigencia de la información antes de tomar decisiones jurídicas.</p>
            </aside>
            <?php endif; ?>

            <?php include 'partials/disclaimer.php'; ?>
        </article>

        <?php if (!empty($post['related_posts'])): ?>
        <?php include 'partials/related-posts.php'; ?>
        <?php endif; ?>

        <!-- CTA contextual -->
        <section class="cta-section">
            <h2>¿Necesita asesoría jurídica especializada?</h2>
            <p>Reciba su primera consulta completamente gratis.</p>
            <a href="/contacto/" class="btn-primary">SOLICITAR ASESORÍA</a>
            <a href="https://wa.me/573144760999" class="btn-secondary">HABLAR POR WHATSAPP</a>
        </section>
    </main>

    <?php include 'partials/footer.php'; ?>
</body>
</html>
```

### Template: blog-index.php

Genera `/blog/index.html` con el listado de artículos.

**Variables disponibles**:

```php
$posts = [
    [
        'title' => 'Título artículo 1',
        'slug' => 'titulo-articulo-1',
        'excerpt' => 'Resumen...',
        'category' => 'UGPP',
        'featured_image' => '/uploads/...',
        'published_at' => '2026-08-25',
    ],
    // ...
];

$categories = ['UGPP', 'Colpensiones', 'Derecho Laboral', ...];
```

### Template: sitemap.php

Genera `/sitemap.xml`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Páginas estáticas -->
    <url>
        <loc>https://fortioriabogados.com/</loc>
        <lastmod><?= date('Y-m-d') ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>

    <!-- Artículos dinámicos -->
    <?php foreach ($posts as $post): ?>
    <url>
        <loc><?= $site['domain'] . '/' . $post['slug'] . '/' ?></loc>
        <lastmod><?= date('Y-m-d', strtotime($post['updated_at'])) ?></lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <?php endforeach; ?>
</urlset>
```

### Template: feed.php

Genera `/feed.xml` (RSS 2.0).

### Template: search-index.php

Genera `/search-index.json`.

```json
[
    {
        "title": "Título del artículo",
        "url": "/titulo-del-articulo/",
        "category": "UGPP",
        "excerpt": "Resumen...",
        "date": "2026-08-25"
    }
]
```

---

## CLASE GENERATOR (PSEUDOCÓDIGO)

```php
<?php

class StaticGenerator {

    private $db;
    private $site_config;

    public function __construct($db, $site_config) {
        $this->db = $db;
        $this->site_config = $site_config;
    }

    /**
     * Publicar un artículo
     */
    public function publish_post($post_id) {
        // 1. Validar
        $this->validate_post($post_id);

        // 2. Backups
        $backup_db = $this->backup_database();
        $backup_html = $this->backup_post_html($post_id);

        // 3. Generar
        $html = $this->generate_post_html($post_id);

        // 4. Validar HTML
        $this->validate_generated_html($html);

        // 5. Escribir atómicamente
        $this->write_post_atomic($post_id, $html);

        // 6. Regenerar índices
        $this->regenerate_blog_index();
        $this->regenerate_sitemap();
        $this->regenerate_feed();
        $this->regenerate_search_index();

        // 7. Log
        $this->log_activity('post_published', $post_id);

        // 8. Registrar backups
        $this->register_backup($backup_db, 'database', $post_id);

        return true;
    }

    /**
     * Generar HTML de artículo
     */
    private function generate_post_html($post_id) {
        // Cargar datos completos
        $post = $this->get_post_data($post_id);

        // Cargar template
        ob_start();
        extract(['post' => $post, 'site' => $this->site_config]);
        include __DIR__ . '/../../templates/article.php';
        $html = ob_get_clean();

        return $html;
    }

    /**
     * Escribir archivo de forma atómica
     */
    private function write_post_atomic($post_id, $html) {
        $post = $this->get_post_data($post_id);
        $slug = $post['slug'];

        $dir = __DIR__ . "/../../{$slug}";
        $temp_file = "{$dir}/index.html.tmp";
        $final_file = "{$dir}/index.html";

        // Crear directorio si no existe
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        // Escribir temporal
        file_put_contents($temp_file, $html);

        // Validar
        if (!$this->validate_html_file($temp_file)) {
            unlink($temp_file);
            throw new Exception("HTML generado inválido");
        }

        // Mover atómicamente
        rename($temp_file, $final_file);
    }

    /**
     * Regenerar índice del blog
     */
    public function regenerate_blog_index() {
        $posts = $this->get_published_posts();
        $categories = $this->get_categories();

        ob_start();
        extract([
            'posts' => $posts,
            'categories' => $categories,
            'site' => $this->site_config
        ]);
        include __DIR__ . '/../../templates/blog-index.php';
        $html = ob_get_clean();

        file_put_contents(__DIR__ . '/../../blog/index.html', $html);
    }

    /**
     * Regenerar sitemap
     */
    public function regenerate_sitemap() {
        $posts = $this->get_published_posts();

        ob_start();
        extract(['posts' => $posts, 'site' => $this->site_config]);
        include __DIR__ . '/../../templates/sitemap.php';
        $xml = ob_get_clean();

        file_put_contents(__DIR__ . '/../../sitemap.xml', $xml);
    }

    /**
     * Regenerar feed RSS
     */
    public function regenerate_feed() {
        $posts = $this->get_published_posts(20); // Últimos 20

        ob_start();
        extract(['posts' => $posts, 'site' => $this->site_config]);
        include __DIR__ . '/../../templates/feed.php';
        $xml = ob_get_clean();

        file_put_contents(__DIR__ . '/../../feed.xml', $xml);
    }

    /**
     * Regenerar índice de búsqueda
     */
    public function regenerate_search_index() {
        $posts = $this->get_published_posts();

        $index = [];
        foreach ($posts as $post) {
            $index[] = [
                'title' => $post['title'],
                'url' => '/' . $post['slug'] . '/',
                'category' => $post['category'],
                'excerpt' => $post['excerpt'],
                'date' => date('Y-m-d', strtotime($post['published_at'])),
            ];
        }

        file_put_contents(
            __DIR__ . '/../../search-index.json',
            json_encode($index, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)
        );
    }
}
```

---

## OPERACIONES CRÍTICAS

### NUNCA:
- Sobrescribir directamente sin validar
- Dejar archivos temporales
- Permitir HTML incompleto
- Generar sin backups
- Ignorar errores de validación

### SIEMPRE:
- Validar antes de escribir
- Usar operaciones atómicas
- Crear backups automáticos
- Regenerar índices
- Loguear actividad
- Manejar errores gracefully

---

## ESTRATEGIA DE ROLLBACK

Si la publicación falla:

1. **No eliminar el archivo anterior**
2. **Restaurar desde backup si es necesario**
3. **Loguear el error**
4. **Notificar al usuario**
5. **Mantener el estado en SQLite como "draft" o "error"**

---

## PERFORMANCE

- Templates PHP son rápidos
- Generación se ejecuta solo al publicar
- No se regenera en cada visita
- Cacheable indefinidamente
- Sin overhead de base de datos para visitantes

---

## EXTENSIBILIDAD

Futuras features pueden agregar:

- `generate_category_pages()` - Páginas por categoría
- `generate_author_pages()` - Páginas por autor
- `generate_amp_version()` - Versiones AMP
- `generate_json_api()` - API JSON estática
- `generate_pdf_version()` - PDFs de artículos
