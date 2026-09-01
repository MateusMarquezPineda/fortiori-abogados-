const fs = require('fs');

// Páginas a actualizar
const pages = [
    'index.html',
    'blog/index.html',
    'ugpp/index.html',
    'depuracion-de-deuda-real-y-presunta-de-colpensiones/index.html',
    'derecho-empresarial/index.html',
    'contacto/index.html',
    'como-responder-requerimiento-ugpp/index.html',
    'portafolio/index.html',
    'politicas-de-privacidad/index.html'
];

console.log('🍪 Agregando aviso de cookies a todas las páginas...\n');

pages.forEach(file => {
    console.log(`📝 Actualizando ${file}...`);

    let content = fs.readFileSync(file, 'utf8');

    // Determinar la ruta relativa correcta según la profundidad del archivo
    const depth = (file.match(/\//g) || []).length;
    const prefix = depth === 0 ? '' : '../';

    // Verificar si ya tiene el CSS de cookies
    if (!content.includes('cookie-banner.css')) {
        // Agregar CSS antes del cierre de </head>
        content = content.replace(
            '</head>',
            `    <link rel="stylesheet" href="${prefix}assets/css/cookie-banner.css">\n</head>`
        );
        console.log(`  ✅ CSS de cookies agregado`);
    } else {
        console.log(`  ⏭️  CSS de cookies ya existe`);
    }

    // Verificar si ya tiene el JS de cookies
    if (!content.includes('cookie-banner.js')) {
        // Agregar JS antes del cierre de </body>
        content = content.replace(
            '</body>',
            `    <script src="${prefix}assets/js/cookie-banner.js"></script>\n</body>`
        );
        console.log(`  ✅ JavaScript de cookies agregado`);
    } else {
        console.log(`  ⏭️  JavaScript de cookies ya existe`);
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ ${file} actualizado\n`);
});

console.log('✨ ¡Aviso de cookies agregado a todas las páginas!');
console.log('📌 El banner aparecerá automáticamente en la primera visita');
console.log('🔒 Se guardará la preferencia del usuario por 1 año');
