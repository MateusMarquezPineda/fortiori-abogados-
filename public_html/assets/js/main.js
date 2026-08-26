/**
 * Main JavaScript - FORTIORI ABOGADOS S.A.S.
 * JavaScript Vanilla ES6+
 */

'use strict';

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('FORTIORI ABOGADOS - Site initialized');

    // Inicializar módulos
    initSkipLink();
    initSmoothScroll();
    initExternalLinks();
});

/**
 * Skip link para accesibilidad
 */
function initSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    if (!skipLink) return;

    skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            target.setAttribute('tabindex', '-1');
            target.focus();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/**
 * Smooth scroll para anchors internos
 */
function initSmoothScroll() {
    // Solo si el usuario no prefiere reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Ignorar # solo
            if (targetId === '#') return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Actualizar URL sin scroll
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }

                // Focus en el elemento (accesibilidad)
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });
}

/**
 * Abrir links externos en nueva pestaña
 */
function initExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    const currentHost = window.location.hostname;

    links.forEach(link => {
        const linkHost = new URL(link.href).hostname;

        // Si es externo
        if (linkHost !== currentHost) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');

            // Agregar indicador visual (opcional)
            const isExternalIndicated = link.querySelector('.external-icon');
            if (!isExternalIndicated) {
                // Puedes agregar un icono aquí si lo deseas
            }
        }
    });
}

/**
 * Debounce utility
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle utility
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Lazy loading de imágenes (fallback para navegadores antiguos)
 */
function initLazyLoading() {
    // Si el navegador soporta loading="lazy", no hacer nada
    if ('loading' in HTMLImageElement.prototype) {
        return;
    }

    // Fallback con IntersectionObserver
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Formatear fecha en español
 */
function formatDate(date, format = 'long') {
    const options = {
        short: { year: 'numeric', month: 'numeric', day: 'numeric' },
        long: { year: 'numeric', month: 'long', day: 'numeric' },
        full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    };

    return new Intl.DateTimeFormat('es-CO', options[format] || options.long)
        .format(new Date(date));
}

/**
 * Scroll to top
 */
function scrollToTop(smooth = true) {
    window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto'
    });
}

/**
 * Detectar si elemento está visible en viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Toggle class helper
 */
function toggleClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
        return false;
    } else {
        element.classList.add(className);
        return true;
    }
}

// Exportar utilidades para uso global
window.FortioriUtils = {
    debounce,
    throttle,
    formatDate,
    scrollToTop,
    isInViewport,
    toggleClass
};
