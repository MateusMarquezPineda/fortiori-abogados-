/**
 * MOBILE MENU OFF-CANVAS - FORTIORI ABOGADOS
 * Sistema de menú lateral para móviles - JavaScript Vanilla
 *
 * ESTRATEGIA ANTI-BUGS:
 * - Solo agregar/remover clases .is-open
 * - NO usar preventDefault() en enlaces
 * - NO bloquear navegación
 * - Gestión limpia de eventos
 */

'use strict';

(function() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }

    function initMobileMenu() {
        // Elementos del DOM
        const toggleBtn = document.getElementById('mobile-menu-toggle');
        const closeBtn = document.getElementById('mobile-menu-close');
        const backdrop = document.getElementById('mobile-menu-backdrop');
        const sidebar = document.getElementById('mobile-menu-sidebar');
        const menuLinks = document.querySelectorAll('.mobile-menu-link');

        // Validar que existan los elementos
        if (!toggleBtn || !closeBtn || !backdrop || !sidebar) {
            console.warn('Mobile Menu: Elementos no encontrados en el DOM');
            return;
        }

        console.log('✓ Mobile Menu inicializado correctamente');

        /**
         * Abrir menú
         */
        function openMenu() {
            sidebar.classList.add('is-open');
            backdrop.classList.add('is-open');
            document.body.classList.add('mobile-menu-open');
            toggleBtn.setAttribute('aria-expanded', 'true');
            sidebar.setAttribute('aria-hidden', 'false');

            // Focus en el botón de cerrar (accesibilidad)
            setTimeout(() => {
                closeBtn.focus();
            }, 300);
        }

        /**
         * Cerrar menú
         */
        function closeMenu() {
            sidebar.classList.remove('is-open');
            backdrop.classList.remove('is-open');
            document.body.classList.remove('mobile-menu-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            sidebar.setAttribute('aria-hidden', 'true');
        }

        /**
         * Toggle menú (abrir/cerrar)
         */
        function toggleMenu() {
            const isOpen = sidebar.classList.contains('is-open');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        // Event Listeners
        toggleBtn.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', closeMenu);
        backdrop.addEventListener('click', closeMenu);

        // Cerrar con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
                closeMenu();
            }
        });

        /**
         * CRÍTICO: NO prevenir navegación en los enlaces
         * Los enlaces deben funcionar normalmente
         * Solo cerrar el menú cuando se hace click
         */
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Solo cerrar el menú, NO prevenir navegación
                closeMenu();
            });
        });

        // Cerrar menú al cambiar orientación (mobile)
        window.addEventListener('orientationchange', function() {
            if (sidebar.classList.contains('is-open')) {
                closeMenu();
            }
        });

        // Cerrar menú si se redimensiona a desktop
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                if (window.innerWidth >= 1024 && sidebar.classList.contains('is-open')) {
                    closeMenu();
                }
            }, 150);
        });
    }

})();
