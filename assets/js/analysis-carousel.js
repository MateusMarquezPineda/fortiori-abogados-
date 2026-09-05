/**
 * Analysis Carousel - UGPP Page
 * Carousel para los 5 pilares de defensa UGPP
 */

(function() {
    'use strict';

    // Configuración
    const CONFIG = {
        cardsToShow: {
            mobile: 1,
            tablet: 2,
            desktop: 3
        },
        autoplayDelay: 5000,
        enableAutoplay: false
    };

    // Elementos del DOM
    const carousel = {
        wrapper: document.querySelector('.analysis-carousel-wrapper'),
        grid: document.querySelector('.analysis-grid'),
        prevBtn: document.getElementById('analysis-prev'),
        nextBtn: document.getElementById('analysis-next'),
        indicatorsContainer: document.getElementById('analysis-indicators'),
        pillars: null
    };

    // Estado del carousel
    let state = {
        currentIndex: 0,
        totalCards: 0,
        cardsToShow: 3,
        maxIndex: 0,
        autoplayInterval: null
    };

    /**
     * Inicializa el carousel
     */
    function init() {
        if (!carousel.grid) return;

        carousel.pillars = carousel.grid.querySelectorAll('.analysis-pillar');
        state.totalCards = carousel.pillars.length;

        if (state.totalCards === 0) return;

        updateCardsToShow();
        createIndicators();
        attachEventListeners();
        updateCarousel();

        if (CONFIG.enableAutoplay) {
            startAutoplay();
        }
    }

    /**
     * Calcula cuántas cards mostrar según el ancho de pantalla
     */
    function updateCardsToShow() {
        const width = window.innerWidth;

        if (width < 768) {
            state.cardsToShow = CONFIG.cardsToShow.mobile;
        } else if (width < 1024) {
            state.cardsToShow = CONFIG.cardsToShow.tablet;
        } else {
            state.cardsToShow = CONFIG.cardsToShow.desktop;
        }

        state.maxIndex = Math.max(0, state.totalCards - state.cardsToShow);

        // Ajusta el índice actual si excede el máximo
        if (state.currentIndex > state.maxIndex) {
            state.currentIndex = state.maxIndex;
        }
    }

    /**
     * Crea los indicadores del carousel
     */
    function createIndicators() {
        if (!carousel.indicatorsContainer) return;

        carousel.indicatorsContainer.innerHTML = '';

        // En mobile/tablet, crear un indicador por cada card
        // En desktop, crear indicadores basados en grupos de 3
        const numIndicators = window.innerWidth >= 1024
            ? Math.ceil(state.totalCards / state.cardsToShow)
            : state.totalCards;

        for (let i = 0; i < numIndicators; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('aria-label', `Ir a slide ${i + 1}`);
            indicator.addEventListener('click', () => goToSlide(i));
            carousel.indicatorsContainer.appendChild(indicator);
        }

        updateIndicators();
    }

    /**
     * Actualiza el estado visual de los indicadores
     */
    function updateIndicators() {
        if (!carousel.indicatorsContainer) return;

        const indicators = carousel.indicatorsContainer.querySelectorAll('.carousel-indicator');
        const activeIndex = window.innerWidth >= 1024
            ? Math.floor(state.currentIndex / state.cardsToShow)
            : state.currentIndex;

        indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    /**
     * Actualiza la posición del carousel
     */
    function updateCarousel() {
        if (!carousel.grid) return;

        // En desktop, mover por porcentaje basado en 3 cards visibles
        // En mobile (<768px), no aplicar transform para evitar overflow horizontal
        if (window.innerWidth < 768) {
            carousel.grid.style.transform = 'none';
        } else {
            const cardWidth = window.innerWidth >= 1024 ? 33.333 : 100;
            const translateX = -(state.currentIndex * cardWidth);
            carousel.grid.style.transform = `translateX(${translateX}%)`;
        }

        updateButtons();
        updateIndicators();
    }

    /**
     * Actualiza el estado de los botones de navegación
     */
    function updateButtons() {
        if (!carousel.prevBtn || !carousel.nextBtn) return;

        // Deshabilitar botón anterior si estamos en el inicio
        if (state.currentIndex <= 0) {
            carousel.prevBtn.disabled = true;
        } else {
            carousel.prevBtn.disabled = false;
        }

        // Deshabilitar botón siguiente si estamos al final
        if (state.currentIndex >= state.maxIndex) {
            carousel.nextBtn.disabled = true;
        } else {
            carousel.nextBtn.disabled = false;
        }
    }

    /**
     * Navega al slide anterior
     */
    function prevSlide() {
        if (state.currentIndex > 0) {
            state.currentIndex--;
            updateCarousel();
            resetAutoplay();
        }
    }

    /**
     * Navega al slide siguiente
     */
    function nextSlide() {
        if (state.currentIndex < state.maxIndex) {
            state.currentIndex++;
            updateCarousel();
            resetAutoplay();
        }
    }

    /**
     * Va a un slide específico
     */
    function goToSlide(index) {
        const targetIndex = window.innerWidth >= 1024
            ? index * state.cardsToShow
            : index;

        if (targetIndex >= 0 && targetIndex <= state.maxIndex) {
            state.currentIndex = targetIndex;
            updateCarousel();
            resetAutoplay();
        }
    }

    /**
     * Inicia el autoplay
     */
    function startAutoplay() {
        if (state.autoplayInterval) return;

        state.autoplayInterval = setInterval(() => {
            if (state.currentIndex >= state.maxIndex) {
                state.currentIndex = 0;
            } else {
                state.currentIndex++;
            }
            updateCarousel();
        }, CONFIG.autoplayDelay);
    }

    /**
     * Detiene el autoplay
     */
    function stopAutoplay() {
        if (state.autoplayInterval) {
            clearInterval(state.autoplayInterval);
            state.autoplayInterval = null;
        }
    }

    /**
     * Reinicia el autoplay
     */
    function resetAutoplay() {
        if (CONFIG.enableAutoplay) {
            stopAutoplay();
            startAutoplay();
        }
    }

    /**
     * Maneja el cambio de tamaño de ventana
     */
    function handleResize() {
        updateCardsToShow();
        createIndicators();
        updateCarousel();
    }

    /**
     * Maneja los eventos de teclado para accesibilidad
     */
    function handleKeyboard(event) {
        if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    }

    /**
     * Adjunta los event listeners
     */
    function attachEventListeners() {
        if (carousel.prevBtn) {
            carousel.prevBtn.addEventListener('click', prevSlide);
        }

        if (carousel.nextBtn) {
            carousel.nextBtn.addEventListener('click', nextSlide);
        }

        // Responsive
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 250);
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);

        // Pausar autoplay en hover (si está habilitado)
        if (CONFIG.enableAutoplay && carousel.wrapper) {
            carousel.wrapper.addEventListener('mouseenter', stopAutoplay);
            carousel.wrapper.addEventListener('mouseleave', startAutoplay);
        }

        // Touch/swipe support (opcional)
        enableSwipe();
    }

    /**
     * Habilita soporte para gestos táctiles
     */
    function enableSwipe() {
        if (!carousel.grid) return;

        let touchStartX = 0;
        let touchEndX = 0;

        carousel.grid.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.grid.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next
                    nextSlide();
                } else {
                    // Swipe right - prev
                    prevSlide();
                }
            }
        }
    }

    /**
     * Limpia los recursos al desmontar
     */
    function destroy() {
        stopAutoplay();
        // Aquí se pueden agregar más limpiezas si es necesario
    }

    // Inicializa cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Limpia al salir de la página
    window.addEventListener('beforeunload', destroy);

})();
