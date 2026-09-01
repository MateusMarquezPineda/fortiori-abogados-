#!/usr/bin/env python3
"""
Script para actualizar el menú móvil en todas las páginas HTML
"""

import os
import re

# Definir las páginas y sus enlaces activos
pages = {
    'ugpp/index.html': 'Fiscalización UGPP',
    'depuracion-de-deuda-real-y-presunta-de-colpensiones/index.html': 'Depuración Colpensiones',
    'derecho-empresarial/index.html': 'Derecho Empresarial',
    'contacto/index.html': 'Contacto',
    'como-responder-requerimiento-ugpp/index.html': 'Cómo Responder a Requerimiento UGPP',
}

# Template del botón toggle
toggle_button = '''                    <!-- Mobile Menu Toggle (NEW) -->
                    <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-menu-sidebar" aria-label="Abrir menú de navegación">
                        <span class="mobile-menu-toggle-bar"></span>
                        <span class="mobile-menu-toggle-bar"></span>
                        <span class="mobile-menu-toggle-bar"></span>
                    </button>'''

# Template del menú móvil
def get_mobile_menu(active_page):
    return f'''
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
                    <a href="../ugpp/" class="mobile-menu-link{' active' if active_page == 'Fiscalización UGPP' else ''}">Fiscalización UGPP</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../depuracion-de-deuda-real-y-presunta-de-colpensiones/" class="mobile-menu-link{' active' if active_page == 'Depuración Colpensiones' else ''}">Depuración Colpensiones</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../derecho-empresarial/" class="mobile-menu-link{' active' if active_page == 'Derecho Empresarial' else ''}">Derecho Empresarial</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../blog/" class="mobile-menu-link">Blog</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../contacto/" class="mobile-menu-link{' active' if active_page == 'Contacto' else ''}">Contacto</a>
                </li>
            </ul>
        </nav>
    </aside>'''

def update_html_file(filepath, active_page):
    """Actualiza un archivo HTML con el nuevo menú móvil"""
    print(f"📝 Actualizando {filepath}...")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Agregar CSS (si no existe ya)
    if 'mobile-menu-new.css' not in content:
        content = content.replace(
            '</head>',
            '    <link rel="stylesheet" href="../assets/css/mobile-menu-new.css">\n</head>'
        )

    # 2. Reemplazar botón toggle
    content = re.sub(
        r'<!-- Mobile Menu Toggle -->.*?</button>',
        toggle_button,
        content,
        flags=re.DOTALL
    )

    # 3. Reemplazar/agregar menú móvil (después de </header>)
    # Primero remover el viejo overlay si existe
    content = re.sub(
        r'<!-- Mobile Overlay -->.*?</div>\s*</header>',
        '</header>',
        content,
        flags=re.DOTALL
    )

    # Agregar el nuevo menú después de </header>
    if 'mobile-menu-sidebar' not in content:
        content = content.replace(
            '</header>',
            '</header>' + get_mobile_menu(active_page)
        )

    # 4. Agregar JavaScript (si no existe ya)
    if 'mobile-menu-new.js' not in content:
        content = re.sub(
            r'(<!-- Scripts -->.*?<script src="../assets/js/main.js"></script>)',
            r'\1\n    <script src="../assets/js/mobile-menu-new.js"></script>',
            content
        )

    # Guardar archivo actualizado
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✅ {filepath} actualizado correctamente")

def main():
    print("🔄 Actualizando menú móvil en todas las páginas...\n")

    for filepath, active_page in pages.items():
        if os.path.exists(filepath):
            update_html_file(filepath, active_page)
        else:
            print(f"⚠️  {filepath} no encontrado")

    print("\n✨ ¡Proceso completado!")

if __name__ == '__main__':
    main()
