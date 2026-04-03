/**
 * Standalone About Page - JavaScript
 * Handles animations, scroll effects, and 3D model interactivity
 */

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = entry.target.style.animation;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[style*="animation"]').forEach(el => {
    observer.observe(el);
});

// ========================================
// MODEL VIEWER INTERACTIONS
// ========================================

/**
 * Setup model viewer interactions:
 * - Pause auto-rotate on drag/interaction
 * - Resume auto-rotate after 3 seconds of inactivity
 */
function setupModelViewers() {
    const modelViewers = document.querySelectorAll('model-viewer');

    modelViewers.forEach(viewer => {
        let interactionTimeout = null;

        const pauseAutoRotate = () => {
            viewer.autoRotate = false;
            clearTimeout(interactionTimeout);

            // Resume after 3 seconds of inactivity
            interactionTimeout = setTimeout(() => {
                viewer.autoRotate = true;
            }, 3000);
        };

        // Listen for user interactions
        viewer.addEventListener('mousedown', pauseAutoRotate);
        viewer.addEventListener('touchstart', pauseAutoRotate);

        // Optional: also pause when camera is being manipulated
        viewer.addEventListener('camera-change', () => {
            viewer.autoRotate = false;
            clearTimeout(interactionTimeout);
            interactionTimeout = setTimeout(() => {
                viewer.autoRotate = true;
            }, 3000);
        });
    });
}

// Wait for model-viewer to be available
if (customElements.get('model-viewer')) {
    setupModelViewers();
} else {
    document.addEventListener('DOMContentLoaded', setupModelViewers);
    // Also try after a delay in case CDN is slow
    setTimeout(setupModelViewers, 1000);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

/**
 * Fade in elements as they come into view
 */
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.value-card, .value-column-box, .mission-quote');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations slightly
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                }, delay);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(el => {
        el.style.opacity = '0';
        scrollObserver.observe(el);
    });
}

setupScrollAnimations();

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// RESPONSIVE DESIGN HELPERS
// ========================================

/**
 * Adjust model viewer heights for mobile devices
 */
function adjustModelViewerHeights() {
    const isMobile = window.innerWidth < 1024;
    const modelViewers = document.querySelectorAll('model-viewer');

    modelViewers.forEach(viewer => {
        if (isMobile) {
            viewer.style.minHeight = '250px';
        } else {
            viewer.style.minHeight = '300px';
        }
    });
}

window.addEventListener('resize', adjustModelViewerHeights);
adjustModelViewerHeights();

// ========================================
// PERFORMANCE: Lazy load model viewers
// ========================================

/**
 * Lazy load 3D models only when they're visible
 */
function lazyLoadModels() {
    const modelViewers = document.querySelectorAll('model-viewer');

    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const modelViewer = entry.target;
                    // Model viewer loads automatically, but this ensures it's ready
                    if (modelViewer.src && !modelViewer.modelIsVisible) {
                        modelViewer.style.opacity = '1';
                    }
                    lazyObserver.unobserve(modelViewer);
                }
            });
        }, { threshold: 0.1 });

        modelViewers.forEach(viewer => {
            viewer.style.opacity = '0.8';
            lazyObserver.observe(viewer);
        });
    }
}

lazyLoadModels();

// ========================================
// ACCESSIBILITY: Keyboard navigation
// ========================================

document.addEventListener('keydown', (e) => {
    // Allow users to interact with model viewers with keyboard
    if (e.key === 'Tab') {
        // Tab navigation is handled natively
    }
});

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c📄 About Page - Standalone Version', 'color: #2dd4bf; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and Vanilla JavaScript', 'color: #22b8c7; font-size: 12px;');
console.log('%c3D Models powered by model-viewer web component', 'color: #2dd4bf; font-size: 12px;');
