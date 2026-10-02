// Slider con funcionalidad de deslizamiento manual para móviles
document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.cycle-slider-wrapper');
    const slider = document.querySelector('.cycle-slider');

    if (!slider || !sliderWrapper) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;

    // Agregar scroll suave en móvil
    sliderWrapper.style.overflowX = 'auto';
    sliderWrapper.style.scrollBehavior = 'smooth';
    sliderWrapper.style.WebkitOverflowScrolling = 'touch';
    sliderWrapper.style.scrollSnapType = 'x mandatory';

    // Agregar scroll snap a cada card
    const cards = document.querySelectorAll('.cycle-card');
    cards.forEach(card => {
        card.style.scrollSnapAlign = 'center';
    });

    // Solo en móviles (pantallas menores a 768px)
    if (window.innerWidth < 768) {
        // Pausar animación automática en móvil para mejor control manual
        slider.style.animationPlayState = 'paused';

        // Agregar indicadores de scroll (dots)
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        dotsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
            padding: 10px 0;
        `;

        // Crear dots solo para las primeras 4 cards (no los duplicados)
        for (let i = 0; i < 4; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot';
            dot.style.cssText = `
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: ${i === 0 ? '#B3001B' : '#D1D5DB'};
                transition: all 0.3s ease;
                cursor: pointer;
            `;
            dot.dataset.index = i;

            // Click en dot para navegar
            dot.addEventListener('click', () => {
                const cardWidth = cards[0].offsetWidth + 24; // width + gap
                sliderWrapper.scrollLeft = i * cardWidth;
            });

            dotsContainer.appendChild(dot);
        }

        sliderWrapper.parentElement.appendChild(dotsContainer);

        // Actualizar dots activo en scroll
        sliderWrapper.addEventListener('scroll', () => {
            const scrollPosition = sliderWrapper.scrollLeft;
            const cardWidth = cards[0].offsetWidth + 24;
            const activeIndex = Math.round(scrollPosition / cardWidth) % 4;

            document.querySelectorAll('.slider-dot').forEach((dot, index) => {
                dot.style.backgroundColor = index === activeIndex ? '#B3001B' : '#D1D5DB';
                dot.style.transform = index === activeIndex ? 'scale(1.2)' : 'scale(1)';
            });
        });
    }

    // Mouse/Touch events para desktop también
    sliderWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        sliderWrapper.classList.add('active');
        startX = e.pageX - sliderWrapper.offsetLeft;
        scrollLeft = sliderWrapper.scrollLeft;
        slider.style.animationPlayState = 'paused';
    });

    sliderWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        sliderWrapper.classList.remove('active');
        if (window.innerWidth >= 768) {
            slider.style.animationPlayState = 'running';
        }
    });

    sliderWrapper.addEventListener('mouseup', () => {
        isDown = false;
        sliderWrapper.classList.remove('active');
        if (window.innerWidth >= 768 && !isDragging) {
            slider.style.animationPlayState = 'running';
        }
        isDragging = false;
    });

    sliderWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        isDragging = true;
        const x = e.pageX - sliderWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        sliderWrapper.scrollLeft = scrollLeft - walk;
    });

    // Touch events
    let touchStartX = 0;
    let touchScrollLeft = 0;

    sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = sliderWrapper.scrollLeft;
        slider.style.animationPlayState = 'paused';
    }, { passive: true });

    sliderWrapper.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].pageX;
        const walk = (touchStartX - touchX);
        sliderWrapper.scrollLeft = touchScrollLeft + walk;
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', () => {
        if (window.innerWidth >= 768) {
            slider.style.animationPlayState = 'running';
        }
    }, { passive: true });
});
