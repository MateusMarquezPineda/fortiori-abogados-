/**
 * Navigation - FORTIORI ABOGADOS S.A.S.
 * Manejo de navegación, menú mobile, quick chat
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initStickyHeader();
    initQuickChat();
    initDropdowns();
    initActiveLinks();
});

/**
 * Menú mobile (hamburger menu)
 */
function initMobileMenu() {
    const toggle = document.getElementById('navbar-toggle');
    const menu = document.getElementById('navbar-menu');
    const overlay = document.getElementById('navbar-overlay');
    const closeBtn = document.getElementById('navbar-close');

    console.log('Mobile Menu Elements:', { toggle, menu, overlay, closeBtn });

    if (!toggle || !menu || !overlay) {
        console.error('Mobile menu elements not found!');
        return;
    }

    // Abrir menú
    toggle.addEventListener('click', function(e) {
        console.log('Toggle clicked!');
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            console.log('Closing menu...');
            closeMenu();
        } else {
            console.log('Opening menu...');
            openMenu();
        }
    });

    // Cerrar con botón X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    // Cerrar con overlay
    overlay.addEventListener('click', closeMenu);

    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            closeMenu();
        }
    });

    function openMenu() {
        console.log('openMenu() called');
        toggle.setAttribute('aria-expanded', 'true');
        menu.classList.add('active');
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');

        console.log('Menu classes:', menu.className);
        console.log('Overlay classes:', overlay.className);

        // Body scroll lock
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
    }

    function closeMenu() {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');

        // Restore body scroll
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
    }

    // Cerrar al hacer click en link (mobile)
    const menuLinks = menu.querySelectorAll('.navbar-link:not(.navbar-dropdown-toggle)');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Cerrar al hacer click en dropdown link
    const dropdownLinks = menu.querySelectorAll('.navbar-dropdown-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/**
 * Sticky header con efecto scroll
 */
function initStickyHeader() {
    const header = document.getElementById('navbar');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', FortioriUtils.throttle(function() {
        const currentScroll = window.pageYOffset;

        // Agregar clase scrolled
        if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, 100));
}

/**
 * Quick Chat Widget
 */
function initQuickChat() {
    const trigger = document.getElementById('quick-chat-trigger');
    const panel = document.getElementById('quick-chat-panel');
    const close = document.getElementById('quick-chat-close');

    if (!trigger || !panel || !close) return;

    // Toggle panel
    trigger.addEventListener('click', function() {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            closeChat();
        } else {
            openChat();
        }
    });

    // Cerrar
    close.addEventListener('click', closeChat);

    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeChat();
        }
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', function(e) {
        const quickChat = document.getElementById('quick-chat');
        if (quickChat && !quickChat.contains(e.target)) {
            closeChat();
        }
    });

    function openChat() {
        trigger.setAttribute('aria-expanded', 'true');
        panel.classList.add('active');
        panel.setAttribute('aria-hidden', 'false');
    }

    function closeChat() {
        trigger.setAttribute('aria-expanded', 'false');
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
    }

    // Track clicks en opciones (analytics)
    const options = panel.querySelectorAll('.quick-chat-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            const optionText = this.querySelector('strong')?.textContent;
            console.log('Quick Chat Option Clicked:', optionText);

            // Aquí puedes agregar tracking de analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'quick_chat_option_click', {
                    'option_name': optionText
                });
            }
        });
    });
}

/**
 * Dropdowns en navegación
 */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.navbar-item-dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.navbar-dropdown-toggle');
        if (!toggle) return;

        // En mobile, hacer click para toggle
        if (window.innerWidth < 1024) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');

                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', !isExpanded);
            });
        }
    });
}

/**
 * Marcar link activo según página actual
 */
function initActiveLinks() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.navbar-link');

    links.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        // Exact match o match de directorio
        if (linkPath === currentPath ||
            (currentPath.startsWith(linkPath) && linkPath !== '/')) {
            link.classList.add('active');
        }
    });
}

/**
 * Scroll to top (helper disponible globalmente)
 */
window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
