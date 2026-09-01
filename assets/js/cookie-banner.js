/**
 * Cookie Banner Script
 * Maneja el banner de aviso de cookies
 */

(function() {
    'use strict';

    // Cookie utility functions
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Initialize cookie banner
    function initCookieBanner() {
        var cookieConsent = getCookie('cookie_consent');

        // Si el usuario ya aceptó o rechazó, no mostrar el banner
        if (cookieConsent) {
            return;
        }

        // Crear el banner
        var banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Aviso de cookies');
        banner.innerHTML = `
            <div class="cookie-banner-container">
                <div class="cookie-banner-content">
                    <p class="cookie-banner-text">
                        🍪 Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias.
                        Si continúa navegando, consideramos que acepta su uso.
                        Puede obtener más información en nuestra <a href="/politicas-de-privacidad/">Política de Privacidad</a>.
                    </p>
                </div>
                <div class="cookie-banner-actions">
                    <button class="cookie-banner-btn cookie-banner-btn-accept" id="cookie-accept" aria-label="Aceptar cookies">
                        Aceptar
                    </button>
                    <button class="cookie-banner-btn cookie-banner-btn-decline" id="cookie-decline" aria-label="Rechazar cookies">
                        Rechazar
                    </button>
                </div>
            </div>
        `;

        // Agregar banner al body
        document.body.appendChild(banner);

        // Mostrar banner con animación
        setTimeout(function() {
            banner.classList.add('show');
        }, 500);

        // Event listeners
        var acceptBtn = document.getElementById('cookie-accept');
        var declineBtn = document.getElementById('cookie-decline');

        acceptBtn.addEventListener('click', function() {
            setCookie('cookie_consent', 'accepted', 365);
            closeBanner(banner);
        });

        declineBtn.addEventListener('click', function() {
            setCookie('cookie_consent', 'declined', 365);
            closeBanner(banner);
        });
    }

    function closeBanner(banner) {
        banner.classList.remove('show');
        setTimeout(function() {
            banner.remove();
        }, 300);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieBanner);
    } else {
        initCookieBanner();
    }
})();
