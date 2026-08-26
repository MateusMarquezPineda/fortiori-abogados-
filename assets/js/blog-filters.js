/**
 * BLOG FILTERS & SEARCH
 * Fortiori Abogados - Blog Functionality
 */

(function() {
    'use strict';

    // DOM Elements
    const searchInput = document.getElementById('blog-search-input');
    const categoryFilters = document.querySelectorAll('.blog-category-filter');
    const blogGrid = document.getElementById('blog-grid');
    const noResults = document.getElementById('no-results');
    const resultsNumber = document.getElementById('results-number');
    const articles = document.querySelectorAll('.article-card');

    // State
    let currentCategory = 'all';
    let currentSearchTerm = '';

    /**
     * Initialize filters
     */
    function init() {
        if (!blogGrid) return; // Not on blog page

        // Category filter click events
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', handleCategoryClick);
        });

        // Search input event
        if (searchInput) {
            searchInput.addEventListener('input', debounce(handleSearch, 300));
        }
    }

    /**
     * Handle category filter click
     */
    function handleCategoryClick(e) {
        const button = e.currentTarget;
        const category = button.getAttribute('data-category');

        // Update active state
        categoryFilters.forEach(f => f.classList.remove('active'));
        button.classList.add('active');

        // Update current category
        currentCategory = category;

        // Filter articles
        filterArticles();
    }

    /**
     * Handle search input
     */
    function handleSearch(e) {
        currentSearchTerm = e.target.value.toLowerCase().trim();
        filterArticles();
    }

    /**
     * Filter articles based on category and search term
     */
    function filterArticles() {
        let visibleCount = 0;

        articles.forEach(article => {
            const articleCategory = article.getAttribute('data-category');
            const articleTitle = article.querySelector('h2 a').textContent.toLowerCase();
            const articleExcerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();

            // Check category match
            const categoryMatch = currentCategory === 'all' || articleCategory === currentCategory;

            // Check search match
            const searchMatch = currentSearchTerm === '' ||
                               articleTitle.includes(currentSearchTerm) ||
                               articleExcerpt.includes(currentSearchTerm);

            // Show/hide article
            if (categoryMatch && searchMatch) {
                article.style.display = '';
                visibleCount++;
            } else {
                article.style.display = 'none';
            }
        });

        // Update results count
        updateResultsCount(visibleCount);

        // Show/hide no results message
        if (visibleCount === 0) {
            blogGrid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            blogGrid.style.display = 'grid';
            noResults.style.display = 'none';
        }
    }

    /**
     * Update results count display
     */
    function updateResultsCount(count) {
        if (resultsNumber) {
            resultsNumber.textContent = count;
        }
    }

    /**
     * Reset all filters
     */
    window.resetFilters = function() {
        // Reset category
        currentCategory = 'all';
        categoryFilters.forEach(f => f.classList.remove('active'));
        categoryFilters[0].classList.add('active'); // Activate "Todos"

        // Reset search
        currentSearchTerm = '';
        if (searchInput) {
            searchInput.value = '';
        }

        // Re-filter
        filterArticles();
    };

    /**
     * Debounce helper
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

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
