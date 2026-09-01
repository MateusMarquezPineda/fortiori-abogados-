const fs = require('fs');

// Páginas a actualizar
const pages = [
    'index.html',
    'blog/index.html',
    'ugpp/index.html',
    'depuracion-de-deuda-real-y-presunta-de-colpensiones/index.html',
    'derecho-empresarial/index.html',
    'contacto/index.html',
    'como-responder-requerimiento-ugpp/index.html'
];

console.log('🔄 Eliminando enlace de Portafolio de todos los menús...\n');

pages.forEach(file => {
    console.log(`📝 Actualizando ${file}...`);

    let content = fs.readFileSync(file, 'utf8');

    // Eliminar del navbar desktop
    content = content.replace(
        /\s*<li class="navbar-item">\s*<a href="[^"]*portafolio\/" class="navbar-link">Portafolio<\/a>\s*<\/li>/g,
        ''
    );

    // Eliminar del mobile menu
    content = content.replace(
        /\s*<li class="mobile-menu-item">\s*<a href="[^"]*portafolio\/" class="mobile-menu-link[^"]*">Portafolio<\/a>\s*<\/li>/g,
        ''
    );

    // Eliminar del footer si existe
    content = content.replace(
        /\s*<li><a href="[^"]*portafolio\/" class="footer-link">Portafolio<\/a><\/li>/g,
        ''
    );

    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ ${file} actualizado`);
});

console.log('\n✨ ¡Enlaces de Portafolio eliminados de todos los menús!');
console.log('📌 La página sigue accesible en: http://localhost:8000/portafolio/');
