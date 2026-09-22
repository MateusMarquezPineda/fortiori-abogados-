/**
 * SITUATION SLIDER - UGPP PAGE
 * Slider para las etapas del proceso UGPP
 */

'use strict';

(function() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSituationSlider);
    } else {
        initSituationSlider();
    }

    function initSituationSlider() {
        const slider = document.querySelector('.situation-slider');
        if (!slider) return;

        const track = slider.querySelector('.situation-slider-track');
        const slides = slider.querySelectorAll('.situation-slide');
        const prevBtn = slider.querySelector('.situation-slider-prev');
        const nextBtn = slider.querySelector('.situation-slider-next');
        const dotsContainer = slider.querySelector('.situation-slider-dots');

        if (!track || !slides.length || !prevBtn || !nextBtn || !dotsContainer) {
            console.warn('Situation Slider: Missing elements');
            return;
        }

        let currentIndex = 0;
        const totalSlides = slides.length;

        // Crear dots
        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.classList.add('situation-slider-dot');
                dot.setAttribute('aria-label', `Ir a etapa ${i + 1}`);
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        // Ir a un slide específico
        function goToSlide(index) {
            currentIndex = index;
            const offset = -100 * currentIndex;
            track.style.transform = `translateX(${offset}%)`;
            updateControls();
        }

        // Actualizar controles (botones y dots)
        function updateControls() {
            // Actualizar dots
            const dots = dotsContainer.querySelectorAll('.situation-slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Actualizar botones
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalSlides - 1;
        }

        // Slide anterior
        function prevSlide() {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        }

        // Slide siguiente
        function nextSlide() {
            if (currentIndex < totalSlides - 1) {
                goToSlide(currentIndex + 1);
            }
        }

        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // Soporte para teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Soporte para touch/swipe en móvil
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - prev slide
                    prevSlide();
                }
            }
        }

        // Auto-avanzar (opcional, comentado por ahora)
        // let autoPlayInterval;
        // function startAutoPlay() {
        //     autoPlayInterval = setInterval(() => {
        //         if (currentIndex < totalSlides - 1) {
        //             nextSlide();
        //         } else {
        //             goToSlide(0);
        //         }
        //     }, 5000);
        // }

        // function stopAutoPlay() {
        //     clearInterval(autoPlayInterval);
        // }

        // slider.addEventListener('mouseenter', stopAutoPlay);
        // slider.addEventListener('mouseleave', startAutoPlay);

        // Inicializar
        createDots();
        updateControls();
        // startAutoPlay(); // Descomentar si quieres auto-play

        console.log('✓ Situation Slider initialized with', totalSlides, 'slides');
    }
})();
