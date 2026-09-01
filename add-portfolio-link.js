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

console.log('🔄 Agregando enlace de Portafolio a todos los menús...\n');

pages.forEach(file => {
    console.log(`📝 Actualizando ${file}...`);

    let content = fs.readFileSync(file, 'utf8');

    // Determinar si es index.html (raíz) o subpáginas
    const isRoot = file === 'index.html';
    const prefix = isRoot ? '' : '../';

    // 1. Agregar en navbar desktop (después de Derecho Empresarial, antes de Blog)
    const navbarPattern = /(<li class="navbar-item">\s*<a href="[^"]*derecho-empresarial\/" class="navbar-link">Derecho Empresarial<\/a>\s*<\/li>)\s*(<li class="navbar-item">\s*<a href="[^"]*blog\/")/;

    if (!content.includes('portafolio/')) {
        content = content.replace(
            navbarPattern,
            `$1
                        <li class="navbar-item">
                            <a href="${prefix}portafolio/" class="navbar-link">Portafolio</a>
                        </li>
                        $2`
        );

        // 2. Agregar en mobile menu (después de Derecho Empresarial, antes de Blog)
        const mobilePattern = /(<li class="mobile-menu-item">\s*<a href="[^"]*derecho-empresarial\/" class="mobile-menu-link[^"]*">Derecho Empresarial<\/a>\s*<\/li>)\s*(<li class="mobile-menu-item">\s*<a href="[^"]*blog\/")/;

        content = content.replace(
            mobilePattern,
            `$1
                <li class="mobile-menu-item">
                    <a href="${prefix}portafolio/" class="mobile-menu-link">Portafolio</a>
                </li>
                $2`
        );

        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ ${file} actualizado`);
    } else {
        console.log(`⏭️  ${file} ya tiene enlace de portafolio`);
    }
});

console.log('\n✨ ¡Proceso completado!');
console.log('📌 Revisa la página de portafolio en: http://localhost:8000/portafolio/');
