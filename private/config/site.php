<?php
/**
 * Configuración del sitio - FORTIORI ABOGADOS S.A.S.
 *
 * Fuente única de verdad para datos corporativos.
 * Usar este archivo en lugar de repetir valores manualmente.
 */

return [
    // Información corporativa
    'company' => [
        'name' => 'FORTIORI ABOGADOS S.A.S.',
        'legal_name' => 'FORTIORI ABOGADOS S.A.S.',
        'nit' => '901.013.525-1',
    ],

    // Dominio
    'domain' => 'https://fortioriabogados.com',

    // Contacto
    'contact' => [
        'phone' => '(601) 341 8274',
        'mobile' => '+57 314 476 0999',
        'whatsapp' => '+573144760999',
        'whatsapp_url' => 'https://wa.me/573144760999',
        'email' => 'contactenos@fortioriabogados.com',
    ],

    // Direcciones
    'addresses' => [
        'main' => 'Carrera 6 # 10-42 Oficina 512, Bogotá, Colombia.',
        'correspondence' => 'Calle 24C # 84-85 T9-326, Bogotá, Colombia.',
    ],

    // Redes sociales
    'social' => [
        'facebook' => 'https://www.facebook.com/fortioriabogados/',
        'instagram' => 'https://www.instagram.com/fortioriabogados/',
    ],

    // Colores corporativos
    'colors' => [
        'brand_red' => '#B3001B',
        'brand_black' => '#111111',
        'brand_surface' => '#1E1E1E',
        'brand_surface_secondary' => '#2D2D2D',
        'brand_white' => '#FFFFFF',
        'brand_whatsapp' => '#25D366',
    ],

    // Áreas de práctica
    'practice_areas' => [
        [
            'name' => 'Fiscalización UGPP',
            'slug' => 'ugpp',
            'url' => '/ugpp/',
        ],
        [
            'name' => 'Depuración Colpensiones',
            'slug' => 'depuracion-colpensiones',
            'url' => '/depuracion-de-deuda-real-y-presunta-de-colpensiones/',
        ],
        [
            'name' => 'La Empresa y el Empresario',
            'slug' => 'empresa',
            'url' => '/la-empresa-y-el-empresario/',
        ],
        [
            'name' => 'Derecho Laboral y Seguridad Social',
            'slug' => 'derecho-laboral',
            'url' => '/derecho-laboral-y-seguridad-social/',
        ],
    ],

    // Categorías del blog
    'blog_categories' => [
        'UGPP',
        'Colpensiones',
        'Derecho Laboral',
        'Seguridad Social',
        'Derecho Empresarial',
        'Actualidad Jurídica',
    ],

    // SEO defaults
    'seo' => [
        'default_title' => 'FORTIORI ABOGADOS S.A.S. - Expertos en UGPP, Colpensiones y Derecho Empresarial',
        'default_description' => 'Firma de abogados especializada en fiscalización UGPP, depuración de deudas con Colpensiones, derecho empresarial y derecho laboral. Primera asesoría gratis.',
        'default_og_image' => '/assets/images/og-default.jpg',
    ],

    // Configuración del sitio
    'settings' => [
        'timezone' => 'America/Bogota',
        'locale' => 'es_CO',
        'language' => 'es',
        'posts_per_page' => 12,
    ],

    // Límites de uploads
    'uploads' => [
        'max_file_size' => 5 * 1024 * 1024, // 5 MB
        'allowed_mimes' => [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/avif',
        ],
        'allowed_extensions' => ['jpg', 'jpeg', 'png', 'webp', 'avif'],
    ],

    // Configuración de backups
    'backups' => [
        'auto_backup' => true,
        'retention_days' => 30,
    ],

    // Paths (relativos a public_html)
    'paths' => [
        'uploads' => '/uploads/',
        'assets' => '/assets/',
        'templates' => '/templates/',
    ],
];
