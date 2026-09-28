/**
 * FAQ Accordion
 * Maneja la funcionalidad de acordeón para las preguntas frecuentes
 */

(function() {
    'use strict';

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const faqItems = document.querySelectorAll('.faq-item');

        if (!faqItems.length) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (!question || !answer) return;

            // Event listener para clic
            question.addEventListener('click', () => {
                toggleFaq(question, answer);
            });

            // Event listener para teclado (accesibilidad)
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFaq(question, answer);
                }
            });
        });
    }

    function toggleFaq(question, answer) {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';

        // Cerrar todas las demás preguntas (opcional - comentar si se quiere permitir múltiples abiertas)
        closeAllFaqs();

        if (!isExpanded) {
            // Abrir esta pregunta
            question.setAttribute('aria-expanded', 'true');
            answer.removeAttribute('hidden');
        } else {
            // Cerrar esta pregunta
            question.setAttribute('aria-expanded', 'false');
            answer.setAttribute('hidden', '');
        }
    }

    function closeAllFaqs() {
        const allQuestions = document.querySelectorAll('.faq-question');
        const allAnswers = document.querySelectorAll('.faq-answer');

        allQuestions.forEach(q => q.setAttribute('aria-expanded', 'false'));
        allAnswers.forEach(a => a.setAttribute('hidden', ''));
    }
})();
