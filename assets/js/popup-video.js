/**
 * Video Popup Controller - FORTIORI ABOGADOS S.A.S.
 * Maneja el popup de video de YouTube
 */

(function() {
    'use strict';

    // Configuración
    const CONFIG = {
        videoUrl: 'https://www.youtube.com/embed/2l_NPtW7LAM?autoplay=1&start=14',
        delay: 15000, // 15 segundos
        cookieName: 'fortiori_video_shown',
        cookieExpireDays: 1 // Mostrar solo una vez al día
    };

    // Verificar si ya se mostró el popup hoy
    function hasSeenPopup() {
        const cookies = document.cookie.split(';');
        return cookies.some(cookie => cookie.trim().startsWith(CONFIG.cookieName + '='));
    }

    // Guardar cookie de que ya vio el popup
    function setPopupCookie() {
        const expires = new Date();
        expires.setTime(expires.getTime() + (CONFIG.cookieExpireDays * 24 * 60 * 60 * 1000));
        document.cookie = `${CONFIG.cookieName}=true; expires=${expires.toUTCString()}; path=/`;
    }

    // Crear HTML del popup
    function createPopupHTML() {
        return `
            <div class="video-popup-overlay" id="videoPopup">
                <div class="video-popup-container">
                    <button class="video-popup-close" id="closeVideoPopup" aria-label="Cerrar video">
                        ×
                    </button>
                    <div class="video-popup-header">
                        <h3 class="video-popup-title">Conoce Más Sobre FORTIORI ABOGADOS</h3>
                        <p class="video-popup-subtitle">Tu Defensa Legal Especializada</p>
                    </div>
                    <div class="video-popup-content">
                        <iframe
                            class="video-popup-iframe"
                            src="${CONFIG.videoUrl}"
                            title="Video FORTIORI ABOGADOS"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="video-popup-footer">
                        <p>¿Necesitas asesoría? <a href="/contacto/" style="color: var(--brand-red); text-decoration: underline;">Contáctanos ahora</a></p>
                    </div>
                </div>
            </div>
        `;
    }

    // Mostrar popup
    function showPopup() {
        // Verificar si ya se mostró
        if (hasSeenPopup()) {
            return;
        }

        // Insertar HTML del popup
        const popupHTML = createPopupHTML();
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        // Referencias a elementos
        const overlay = document.getElementById('videoPopup');
        const closeBtn = document.getElementById('closeVideoPopup');

        // Mostrar popup con animación
        setTimeout(() => {
            overlay.classList.add('active');
        }, 100);

        // Función para cerrar popup
        function closePopup() {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
            }, 300);
            setPopupCookie();
        }

        // Event listeners
        closeBtn.addEventListener('click', closePopup);

        // Cerrar al hacer clic fuera del contenedor
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePopup();
            }
        });

        // Cerrar con tecla ESC
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closePopup();
                document.removeEventListener('keydown', escHandler);
            }
        });

        // Prevenir scroll del body cuando el popup está abierto
        document.body.style.overflow = 'hidden';
        overlay.addEventListener('click', () => {
            document.body.style.overflow = '';
        }, { once: true });
    }

    // Inicializar
    function init() {
        // Esperar el tiempo configurado antes de mostrar el popup
        setTimeout(showPopup, CONFIG.delay);
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
