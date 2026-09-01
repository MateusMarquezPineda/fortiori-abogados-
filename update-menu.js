const fs = require('fs');
const path = require('path');

// Páginas a actualizar
const pages = [
    { file: 'ugpp/index.html', active: 'Fiscalización UGPP' },
    { file: 'depuracion-de-deuda-real-y-presunta-de-colpensiones/index.html', active: 'Depuración Colpensiones' },
    { file: 'derecho-empresarial/index.html', active: 'Derecho Empresarial' },
    { file: 'contacto/index.html', active: 'Contacto' },
    { file: 'como-responder-requerimiento-ugpp/index.html', active: 'Cómo Responder a Requerimiento UGPP' }
];

const toggleButton = `                    <!-- Mobile Menu Toggle (NEW) -->
                    <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-menu-sidebar" aria-label="Abrir menú de navegación">
                        <span class="mobile-menu-toggle-bar"></span>
                        <span class="mobile-menu-toggle-bar"></span>
                        <span class="mobile-menu-toggle-bar"></span>
                    </button>`;

function getMobileMenu(activePage) {
    return `
    <!-- MOBILE MENU OFF-CANVAS (NEW SYSTEM) -->
    <div class="mobile-menu-backdrop" id="mobile-menu-backdrop" aria-hidden="true"></div>
    <aside class="mobile-menu-sidebar" id="mobile-menu-sidebar" aria-hidden="true" aria-label="Menú de navegación móvil">
        <div class="mobile-menu-header">
            <a href="../" class="mobile-menu-logo" aria-label="FORTIORI ABOGADOS - Ir al inicio">
                <img src="../assets/images/logo-fortiori.svg" alt="FORTIORI ABOGADOS">
            </a>
            <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Cerrar menú">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
        <nav class="mobile-menu-nav">
            <ul class="mobile-menu-list">
                <li class="mobile-menu-item">
                    <a href="../" class="mobile-menu-link">Inicio</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../ugpp/" class="mobile-menu-link${activePage === 'Fiscalización UGPP' ? ' active' : ''}">Fiscalización UGPP</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../depuracion-de-deuda-real-y-presunta-de-colpensiones/" class="mobile-menu-link${activePage === 'Depuración Colpensiones' ? ' active' : ''}">Depuración Colpensiones</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../derecho-empresarial/" class="mobile-menu-link${activePage === 'Derecho Empresarial' ? ' active' : ''}">Derecho Empresarial</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../blog/" class="mobile-menu-link">Blog</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../contacto/" class="mobile-menu-link${activePage === 'Contacto' ? ' active' : ''}">Contacto</a>
                </li>
            </ul>
        </nav>
    </aside>`;
}

pages.forEach(({ file, active }) => {
    console.log(`📝 Actualizando ${file}...`);

    let content = fs.readFileSync(file, 'utf8');

    // 1. Agregar CSS
    if (!content.includes('mobile-menu-new.css')) {
        content = content.replace('</head>', '    <link rel="stylesheet" href="../assets/css/mobile-menu-new.css">\n</head>');
    }

    // 2. Reemplazar botón toggle
    content = content.replace(
        /<!-- Mobile Menu Toggle -->[\s\S]*?<button class="navbar-toggle"[\s\S]*?<\/button>/,
        toggleButton
    );

    // 3. Reemplazar menú móvil
    content = content.replace(
        /<!-- Mobile Overlay -->[\s\S]*?<div class="navbar-overlay"[\s\S]*?<\/div>\s*<\/header>/,
        '</header>' + getMobileMenu(active)
    );

    // 4. Agregar JavaScript
    if (!content.includes('mobile-menu-new.js')) {
        content = content.replace(
            /(<!-- Scripts -->[\s\S]*?<script src="\.\.\/assets\/js\/main\.js"><\/script>)/,
            '$1\n    <script src="../assets/js/mobile-menu-new.js"></script>'
        );
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ ${file} actualizado`);
});

console.log('\n✨ ¡Todas las páginas actualizadas!');
